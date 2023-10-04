import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import * as apiChat from '../api/chats';
import * as apiUser from '../api/auth';
import db from '../db/firestore';

export const useChatsStore = create(
  (set, get) => ({
    joined: [],
    available: [],
    activeChats: {},
    updateCount: 1,
    messagesChats: {},
    messageSubs: {},

    fetchChats: async () => {
      const chats = await apiChat.fetchChats()
      chats.forEach((chat) => chat.joinedUsers = chat.joinedUsers.map((user) => user.id))
      const { user } = useAuthStore.getState(state => state.user)
      const sortedChats = chats.reduce((acc, chat) => {
        chat.joinedUsers.includes(user.uid)
          ? acc.joined.push(chat)
          : acc.available.push(chat);
        return acc;
      }, { joined: [], available: [] });
      // console.log('sortedChats :>> ', sortedChats);
      set((state) => ({ ...state, joined: sortedChats.joined || state.joined, available: sortedChats.available || state.available }))
    },
    createChats: async (formData) => {
      const { user } = useAuthStore.getState()
      const newChat = { ...formData };
      newChat.admin = db.doc(`profiles/${user.uid}`);
      const chatId = await apiChat.createChats(newChat);
      await apiChat.joinChat(user.uid, chatId)
      return chatId
    },
    restartChats: () => {
      const messageSubs = get().messageSubs;
      if (messageSubs) {
        Object.keys(messageSubs).forEach(key => {
          messageSubs[key]();
        });
      }
      set((state) => ({ ...state, joined: [], available: [], activeChats: {}, updateCount: 1, messagesChats: {}, messageSubs: {} }))
    },
    joinChat: async (chat) => {
      const { user } = useAuthStore.getState()
      const done = await apiChat.joinChat(user.uid, chat.id)
      if (done) set((state) => ({
        ...state,
        joined: [...state.joined, chat],
        available: state.available.filter(available => available.id !== chat.id)
      }))
    },
    subscribeToChat: (chatId) => apiChat.subscribeToChat(chatId, async (chat) => {
      const joinedUsers = await Promise.all(chat.joinedUsers.map(async userRef => {
        const userSnapshot = await userRef.get()
        return userSnapshot.data()
      }))
      chat.joinedUsers = joinedUsers;
      set((state) => {
        state.activeChats[chat.id] = chat
        return {
          ...state,
        }
      })
    }),
    subscribeToProfile: (uid, chatId) => apiChat.subscribeToProfile(uid, (user) => {
      set((state) => {
        const activeChat = state.activeChats
        const joinedUsers = state.activeChats[chatId]?.joinedUsers
        if (!joinedUsers) return state
        const index = joinedUsers.findIndex(ju => ju.uid === user.uid);
        if (index < 0) return state;
        if (joinedUsers[index].state === user.state) return state;

        joinedUsers[index].state = user.state;
        activeChat[chatId].joinedUsers = joinedUsers

        return {
          ...state,
          activeChats: activeChat,
          updateCount: state.updateCount + 1
        }
      })
    }),
    sendChatMessage: (message, chatId) => {
      const newMessage = { ...message }
      const { user } = useAuthStore.getState()
      const userRef = db.doc(`profiles/${user.uid}`)
      newMessage.author = userRef
      return apiChat
        .sendChatMessage(newMessage, chatId)
    },
    subscribeToChatMessages: (chatId) => apiChat.subscribeToChatMessages(chatId, async (messages) => {
      messages = messages.map(message => {
        if (message.type === 'added') return { id: message.doc.id, ...message.doc.data() }

      })
      const messagesWithAuthor = [];
      const cache = {};
      for await (let message of messages) {
        if (cache[message.author.id]) {
          message.author = cache[message.author.id]
        } else {
          const userSnapshot = await message.author.get();
          cache[userSnapshot.id] = userSnapshot.data();
          message.author = userSnapshot.data()
        }

        messagesWithAuthor.push(message)
      }
      set((state) => {
        const messageChats = state.messagesChats;
        const prevMessages = messageChats[chatId] || []
        messageChats[chatId] = [...prevMessages, ...messagesWithAuthor]
        return {
          ...state,
          messagesChats: messageChats,
          updateCount: state.updateCount + 1
        }
      })
    }),
    registerMessageSubscription: (chatId, messageSub) => {
      set((state) => {
        const subsList = state.messageSubs;
        subsList[chatId] = messageSub
        return {
          ...state,
          messageSubs: subsList,
        }
      })
    }


  }))
export const useAuthStore = create((set, get) => ({
  user: null,
  isChecking: false,
  loginError: null,
  registerError: null,


  registerUser: async (email, password, username, avatar) => {
    set((state) => ({ ...state, registerError: null }))
    await apiUser.register(email, password, username, avatar).catch(error => {
      set((state) => ({ ...state, registerError: error }))
    })
  },
  AuthStateListener: async () => {
    set((state) => ({ ...state, user: null, isChecking: true }))
    return apiUser.onAuthStateChanges(async (authUser) => {
      if (authUser) {
        const userProfile = await apiUser.getUserProfile(authUser.uid)
        set((state) => ({ ...state, user: userProfile, isChecking: false }))
      } else {
        set((state) => ({ ...state, user: null, isChecking: false }))
      }
    })
  },
  logoutUser: async () => {
    set((state) => ({ ...state, isChecking: true }))
    await apiUser.logout()
    useChatsStore.getState().restartChats()
  },
  loginUser: async (email, password) => {
    set((state) => ({ ...state, isChecking: true, loginError: null }))
    await apiUser.login(email, password).catch(error => {
      if (error?.message?.includes('"code":')) error.message = JSON.parse(error.message)?.error?.message
      set((state) => ({ ...state, isChecking: false, loginError: error }))
    })
  }
}))