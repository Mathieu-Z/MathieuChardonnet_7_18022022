import React from 'react';
import Logo from '../component/Logo';
import './Header.scss';

export default function Header() {
  return(
    <header>
      <nav className='nav'>
        <div className='nav--logo'>
          <a href=''><Logo /></a>
        </div>
        <div className='nav--lien'>
          <a href=''>Profil</a>
        </div>
        <div className='nav--lien'>
          <a href=''>Déconnexion</a>
        </div>
      </nav>
    </header>
  )
}