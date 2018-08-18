import React from 'react';

const Navigation = ({onRouteChange}) => {
	return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		<p 
		onClick={() => onRouteChange('signin')} 
		className='fs link dim black underline pa3 pointer' 
		style={{color: 'white', textDecoration: 'none', fontSize: '25px'}}> Sign Out </p>
		</nav>
		);
}

export default Navigation;