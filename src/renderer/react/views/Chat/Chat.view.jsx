import React, { useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { UserListChat, TitleChat, MessagesListChat, LoadingView, MessageInput } from '../../components/export.components';
import { withBaseLayout } from '../../layouts/Base.component';
import { useChatsStore } from '../../../js/store';


function ChatView() {
  const { id } = useParams();
  useChatsStore((state) => state.updateCount); //Necessary for the update User
  const usersWatcher = useRef({})
  const messageList = useRef()

  const subscribeToChat = useChatsStore((state) => state.subscribeToChat);
  const subscribeToProfile = useChatsStore((state) => state.subscribeToProfile);
  const subscribeToChatMessages = useChatsStore((state) => state.subscribeToChatMessages);
  const registerMessageSubscription = useChatsStore((state) => state.registerMessageSubscription);

  const activeChat = useChatsStore((state) => state.activeChats[id]);
  const sendChatMessage = useChatsStore((state) => state.sendChatMessage);
  const messagesChats = useChatsStore((state) => state.messagesChats[id]);
  const messageSubs = useChatsStore((state) => state.messageSubs[id]);
  const joinedUsers = activeChat?.joinedUsers

  useEffect(() => {
    const unsubFromChat = subscribeToChat(id)


    if (!messageSubs) {
      const unsubFromMessages = subscribeToChatMessages(id)
      registerMessageSubscription(id, unsubFromMessages)
    }

    return () => {
      unsubFromChat()
      unsubFromJoinedUsers()
    }
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers)
  }, [activeChat]);

  const subscribeToJoinedUsers = useCallback((JoinedUser) => {
    JoinedUser.forEach(user => {
      if (!usersWatcher.current[user.uid]) usersWatcher.current[user.uid] = subscribeToProfile(user.uid, id)
    });
  }, [subscribeToProfile, id])

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(usersWatcher.current).forEach(id => usersWatcher.current[id]())
  }, [usersWatcher.current])

  const sendMessage = useCallback((message) => {
    sendChatMessage(message, id)
      // scroll to bottom
      .then(() => messageList.current.scrollIntoView(false, { behavior: 'smooth' }));
  }, [id])

  if (!activeChat?.id) return <LoadingView message='Loading Chat...' />

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <UserListChat users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <TitleChat title={`Channel: ${activeChat?.name || ''}`} />
        <MessagesListChat
          innerRef={messageList}
          messages={messagesChats} />
        <MessageInput onSubmit={sendMessage} />
      </div>
    </div>

  )
}

export default withBaseLayout(ChatView, { canGoBack: true });