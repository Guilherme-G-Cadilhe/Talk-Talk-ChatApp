import React, { useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { UserListChat, TitleChat, MessagesListChat, LoadingView, MessageInput } from '../../components/export.components';
import { withBaseLayout } from '../../layouts/Base.component';
import { useChatsStore } from '../../../js/store';


function ChatView() {
  const { id } = useParams();
  useChatsStore((state) => state.updateCount); //Necessary for the update User
  const usersWatcher = useRef({})
  const subscribeToChat = useChatsStore((state) => state.subscribeToChat);
  const subscribeToProfile = useChatsStore((state) => state.subscribeToProfile);
  const activeChat = useChatsStore((state) => state.activeChats[id]);
  const joinedUsers = activeChat?.joinedUsers

  useEffect(() => {
    const unsubFromChat = subscribeToChat(id)
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

  if (!activeChat?.id) return <LoadingView message='Loading Chat...' />

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <UserListChat users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <TitleChat title={`Channel: ${activeChat?.name || ''}`} />
        <MessagesListChat />
        <MessageInput />
      </div>
    </div>

  )
}

export default withBaseLayout(ChatView, { canGoBack: true });