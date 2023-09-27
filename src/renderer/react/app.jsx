import React, { useEffect } from 'react'
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate
} from 'react-router-dom';
import { Home, WelcomeView, SettingsView, ChatView, ChatCreate } from './views/export.views';
import { LoadingView, Navbar } from './components/export.components';
import { useAuthStore } from '../js/store';
import { onlineNotificatorMiddleware, useOnlineStatusStore } from '../js/store/app';

const VerifyUser = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user)
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

const App = () => {
  const user = useAuthStore((state) => state.user);
  const authListener = useAuthStore((state) => state.AuthStateListener);
  const isChecking = useAuthStore((state) => state.isChecking)
  const addWindowEventListener = useOnlineStatusStore((state) => state.addWindowEventListener)
  const removeWindowEventListener = useOnlineStatusStore((state) => state.removeWindowEventListener)
  const isOnline = useOnlineStatusStore((state) => state.isOnline)
  const checkUserConnection = useOnlineStatusStore((state) => state.checkUserConnection)

  useEffect(() => {
    const handleOnlineStatus = () => useOnlineStatusStore.setState((state) => ({ ...state, isOnline: navigator.onLine }));
    const unsubFromAuth = authListener()
    addWindowEventListener('online', handleOnlineStatus)
    addWindowEventListener('offline', handleOnlineStatus)

    return () => {
      removeWindowEventListener('online', handleOnlineStatus);
      removeWindowEventListener('offline', handleOnlineStatus);
      unsubFromAuth()
    };

  }, [])

  useEffect(() => {
    const unsubOnline = useOnlineStatusStore.subscribe((state) => state.isOnline, onlineNotificatorMiddleware)
    return () => unsubOnline()
  }, [])

  useEffect(() => {
    let unsubFromUserConnection = null;
    if (user?.uid) {
      unsubFromUserConnection = checkUserConnection(user?.uid)
    }
    return () => {
      unsubFromUserConnection && unsubFromUserConnection()
    };

  }, [user])


  if (!isOnline) {
    return <LoadingView message={"You are Offline, please connect again..."} />
  }
  if (isChecking) {
    return <LoadingView message={"Just one moment..."} />
  }

  return (
    <Router>
      <div className='content-wrapper'>
        <Routes>
          <Route path="/" element={<WelcomeView />} />
          <Route element={<VerifyUser />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat/create" element={<ChatCreate />} />
            <Route path="/chat/:id" element={<ChatView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Route>


        </Routes>
      </div>
    </Router>
  )
}

export default App;