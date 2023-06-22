import React from 'react'
import './logOut.css'

export default function LogOut() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
				<button className="btnLogOut" onClick={handleLogout}>
					deconnecter
				</button>
	);
}
