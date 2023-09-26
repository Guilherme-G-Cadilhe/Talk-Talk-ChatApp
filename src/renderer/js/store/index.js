import { create } from 'zustand';
import * as apiChat from '../api/chats';
import * as apiUser from '../api/auth';
import db from '../db/firestore';

export const useChatsStore = create((set, get) => ({
  joined: [],
  available: [],
  activeChats: {},

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
  restartChats: () => set((state) => ({ ...state, joined: [], available: [], activeChats: {} })),
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
  subscribeToProfile: (uid) => apiChat.subscribeToProfile(uid, (user) => {
    console.log('user :>> ', user);
  }),

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