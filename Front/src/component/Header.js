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
        <div className="link">
          <Link to="/profil" className='link_profil'>
            <AccountCircleIcon className='link_profil_icon'/>
            <p className='link_profil_text'>Profil</p>
          </Link>

          <Link to="/login" className='link_logout'>
            <ExitToAppIcon className='link_logout_icon' />
            <p className='link_logout_text'>Logout</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;