import Logo from '../component/Logo';
import './Header.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Header() {
  const [userLogout, setUserLogout] = useState({});
  const logout = () => {
    window.location.reload();
  }
  useEffect(() => {
    setUserLogout(JSON.parse(localStorage.getItem('user')));
  }, []);

  // authentification user 
  return (
    <header className="header">
      <div className="toolbar">
        <div className="logo_home">
          <Link to="/home"><Logo /></Link>
        </div>
        <div className="flex-items-header">
          <Link to="/profil"><AccountCircleIcon /></Link>
          <span className='logout'>Logout</span>
          <Link to="/sign-in"><ExitToAppIcon className='icon-logout' /></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;