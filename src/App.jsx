import React, { useState, useEffect } from 'react';
import authserv from './appwrite/auth';
import { useDispatch } from 'react-redux';
import './App.css';
import { login, logout } from './store/authslice';
import { Footer, Header } from './Components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authserv.getcurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="relative min-h-screen flex flex-col bg-cyan-400 w-full">
      <Header className="top-0"/>
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer className="bottom-0"/>
    </div>
  ) : null;
}

export default App;
