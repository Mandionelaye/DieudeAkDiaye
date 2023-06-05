import React from 'react'
import './logOut.css'

export default function LogOut() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main-container">
			<nav className="navbar">
				<button className="btnLogOut" onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
}
