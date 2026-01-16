import React, { useState, useEffect } from 'react';
import Header from "./Header";
import SettingsPanel from "./SettingsPanel";

export const Navbar = ({ darkMode, setDarkMode, data, isAuthRoute }) => {
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (isUserLoggedIn === "true") {
      setShowLogoutButton(true);
    } else {
      setShowLogoutButton(false);
    }
  }, []);

  // Handle backdrop click to close settings panel
  const handleBackdropClick = (event) => {
    setShowSettings(false);
  };

  return (
    <>
      <Header
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        darkMode={darkMode}
        showLogoutButton={showLogoutButton}
        data={data}
      />

      {/* Settings Panel - Popup */}
      {showSettings && (
        <>
          {/* Settings Panel */}
          <div
            className="fixed md:top-24 top-16 md:right-12 right-8 z-1000"
          >
            <SettingsPanel
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              data={data}
              onClose={() => setShowSettings(false)}
              isAuthRoute={isAuthRoute}
              showLogoutButton={showLogoutButton}
            />
          </div>
        </>
      )}
    </>
  );
};