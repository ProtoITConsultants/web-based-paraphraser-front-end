import React, { useState, useEffect } from 'react'
import Header from "./Header"
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
          {/* Backdrop (no body color change) */}
          <div className="" onClick={() => setShowSettings(false)} />
          {/* Settings Panel */}
          <div className="absolute top-16 right-16 z-50">
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
