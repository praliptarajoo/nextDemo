import React, { useState, useEffect } from 'react';
import { NavLink } from '.';
import { userService } from 'services';
import SnakeLadderSettingsDialog from '../components/snakeLadder/SnakeLadderSettingsDialog'; 

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  // Function to open the settings modal
  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  // Function to close the settings modal
  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  // Handle form submission from the settings dialog
  const handleSettingsSubmit = (numPlayers, level) => {
    // You can perform any necessary actions with numPlayers and level here
    console.log('Number of Players:', numPlayers);
    console.log('Level:', level);
    closeSettingsModal(); // Close the modal after submitting
  };

  // Only show nav when logged in
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <div className="navbar-nav">
        <NavLink href="/" exact className="nav-item nav-link">
          Home
        </NavLink>
        <NavLink href="/users" className="nav-item nav-link">
          Users
        </NavLink>
        <li className="nav-item">
          <button
            className="btn btn-link nav-link"
            onClick={openSettingsModal}
          >
            Snake&Ladder
          </button>
          <SnakeLadderSettingsDialog
            isOpen={isSettingsModalOpen}
            onSubmit={handleSettingsSubmit}
            onClose={closeSettingsModal}
          />
        </li>
        <button onClick={userService.logout} className="btn btn-link nav-item nav-link">
          Logout
        </button>
      </div>
    </nav>
  );
}
