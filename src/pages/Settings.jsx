import { useOutletContext } from "react-router-dom";
import { SubHeader } from "../components/common/SubHeader";
import { Tabs } from "@mantine/core";
import { Profile } from "../components/settings/Profile";
import { Password } from "../components/settings/Password";
import ProfileIcon from "../assets/icons/profileicon";
import PasswordIcon from "../assets/icons/passwordicon";
import { use, useState } from "react";
export const Settings = () => {
  const { darkMode, setDarkMode } = useOutletContext();
   const [activeTab, setActiveTab] = useState("Profile");


  return (
    <div
      className={darkMode ? "bg-[#101214] text-white" : "bg-white text-black"}
    >
      <SubHeader darkMode={darkMode} title="Settings" />
      <div className="settings-tabs py-6 px-4 md:p-0">
        <Tabs value={activeTab} onChange={setActiveTab} orientation="vertical">
          <Tabs.List className="md:min-h-[calc(100dvh-266px)] border-r border-[#E7E7E7] dark:border-[#222222]  md:py-4 md:px-6">
            <Tabs.Tab value="Profile">
              <div
                className={`flex gap-2 items-center py-2 px-3 ${
                  darkMode
                    ? activeTab === "Profile"
                      ? "text-white border-white border-b md:border-0"
                      : "text-[#A1A1A1]"
                    : activeTab === "Profile"
                    ? "text-[#272727] border-b border-[#272727] md:border-0"
                    : "text-[#A1A1A1]"
                }`}
              >
                <ProfileIcon />
                <h4 className="text-[18px]/[100%]">Profile</h4>
              </div>
            </Tabs.Tab>
            <hr className="hidden md:block border-[#E7E7E7] my-4" />
            <Tabs.Tab value="Password">
              <div
                className={`flex gap-2 items-center py-2 px-3 hover:bg-transparent ${
                  darkMode
                    ? activeTab === "Password"
                      ? "text-white border-white border-b  md:border-0"
                      : "text-[#A1A1A1]"
                    : activeTab === "Password"
                    ? "text-[#272727] border-b border-[#272727] md:border-0"
                    : "text-[#A1A1A1]"
                }`}
              >
                <PasswordIcon />
                <h4 className="text-[18px]/[100%]">Password</h4>
              </div>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Profile">
            <Profile />
          </Tabs.Panel>
          <Tabs.Panel value="Password">
            <Password />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};
