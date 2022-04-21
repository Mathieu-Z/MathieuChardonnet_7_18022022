import React from 'react';
import logo from '../Logos/icon-left-font-monochrome-black.png';
import './Logo.scss'

export default function Logo() {
  return (
		<div className='logo'>
			<img src={logo} alt='Logo Groupomania' className='logo-img' />
		</div>
	)
}