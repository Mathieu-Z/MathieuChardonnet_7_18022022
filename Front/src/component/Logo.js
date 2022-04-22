import React from 'react';
import logo from '../Logos/icon-left-font-monochrome-white.svg';
import './Logo.scss'

export default function Logo() {
  return (
		<div className='logo'>
			<img src={logo} alt='Logo Groupomania' className='logo-img' />
		</div>
	)
}