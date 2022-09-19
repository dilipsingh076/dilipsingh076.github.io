import React, { useState, useRef, useContext } from 'react';
import { ThemeContext } from '../../ContextProvider/ThemeContext';
import styles from './Navbar.module.css';
import { images } from "../../constants"

// import logo from "../../assets/logo.png"





const barStyle = {
	bar1: {
		position: 'absolute',
		width: '15px',
		transform: 'rotate(45deg)',
	},
	bar2: {
		position: 'absolute',
		left: '-2px',
	},
	bar3: {
		position: 'absolute',
		width: '15px',
		transform: 'rotate(-45deg)',
	},
};

const circle = {
	background: 'linear-gradient(40deg, #8983F7, #1c2931 70%)',
};
const cresent = {
	transform: 'scale(1)',
};
const Navbar = () => {

	const [preScrollPos, setPreScrollPos] = useState(
		window.pageYOffset,
	);

	const [toggle, settoggle] = useState(false)


	const navRef = useRef();

	const { newTheme, mode, handleMode, open, handleMenu } =
		useContext(ThemeContext);

	window.onscroll = () => {
		let currentScrollPos = window.pageYOffset;
		if (preScrollPos > currentScrollPos) {
			navRef.current.style.top = '0';
		} else {
			navRef.current.style.top = '-80px';
		}
		setPreScrollPos(currentScrollPos);
	};

	return (
		<nav ref={navRef} className={styles.navContainer} style={{ background: `${newTheme.background}`, boxShadow: `3px 3px 10px ${newTheme.line}`, }}>
			{/* navbar div start */}

			<div className={styles.navbar}>

				{/* logo div start */}

				<a href='https://app.netlify.com/teams/dilipsinghf/overview'>
					<div className={styles.logo}>
						<img src={images.logo} alt='Logo' />
					</div>
				</a>

				{/* logo div end */}

				{/* navlink div start */}

				<div style={{ color: `${newTheme.title}` }} className={styles.links}>
					<a href='#home'>Home</a>
					<a href='#about'>About</a>
					<a href='#techStacks'>Proficiencies</a>
					<a href='#projects'>Projects</a>

					<a href='#contact'>Contact</a>
				</div>

				{/* navlink div end  */}



               {/* dark mode toggle start  */}
				{ <button
					aria-label={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
					title={
						mode === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'
					}
					style={{ color: `${newTheme.title}` }}
					className={styles.modeButton}
					onClick={handleMode}
				>
					<div
						className={styles.circle}
						style={mode === 'light' ? circle : {}}
					>
						<div
							style={mode === 'light' ? cresent : {}}
							className={styles.crescent}
						></div>
					</div>
				</button> }

				{/* dark mode toggle end */}

				<div onClick={handleMenu} className={styles.bars}>
					<div style={open ? { background: `${newTheme.title}` } : barStyle.bar1}></div>
					<div
						style={
							open
								? { background: `${newTheme.title}` }
								: barStyle.bar2
						}
					></div>
					<div
						style={
							open
								? { background: `${newTheme.title}` }
								: barStyle.bar3
						}
					></div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
