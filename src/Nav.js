import React, { useEffect, useState } from 'react';

import navavtar from './nav-avtar.png';
import './Nav.css';

function Nav() {
	const [ show, handleshow ] = useState(false);
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				handleshow(true);
			} else handleshow(false);
		});
		return () => {
			window.removeEventListener('scroll');
		};
	}, []);

	return (
		<div className={`nav ${show && 'nav__black'}`}>
			<img
				className="nav__logo"
				src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
				alt="netflix-logo"
			/>
			<img className="nav__avtar" src={navavtar} alt="netflix-avtar" />
		</div>
	);
}

export default Nav;
