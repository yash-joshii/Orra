
import PersonalInfo from "@/components/settingComponent/PersonalInfo";
import SecuritySettings from "@/components/settingComponent/SecuritySettings";
import { useState } from "react";



const SettingPage = () => {
    const [activeTab, setActiveTab] = useState("personal");
 return (
    <div className="max-w-6xl mx-auto p-8">
      
      <h1 className="text-3xl font-bold">
        Account Settings
      </h1>

     
      <p className="text-gray-500 mt-2">
        Manage your account preferences and settings.
      </p>

     
      <div className="flex gap-8 mt-8">

       
        <div className="w-64  rounded-lg p-4">

          <ul className="space-y-2">

            <li>
              <button
                onClick={() => setActiveTab("personal")}
                className={`w-full text-left p-3 rounded-lg ${
                  activeTab === "personal"
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Personal Information
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-left p-3 rounded-lg ${
                  activeTab === "security"
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Security & Logins
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full text-left p-3 rounded-lg ${
                  activeTab === "payments"
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Payments & Payouts
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full text-left p-3 rounded-lg ${
                  activeTab === "notifications"
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100"
                }`}
              >
                Notifications
              </button>
            </li>

          </ul>
        </div>

       
        <div className="flex-1 rounded-lg p-6">

          {activeTab === "personal" && (
            <PersonalInfo />
        )}

          {activeTab === "security" && (
            <SecuritySettings />
        )}

          {activeTab === "payments" && (
            <h2 className="text-2xl font-semibold">
              Payments & Payouts
            </h2>
          )}

          {activeTab === "notifications" && (
            <h2 className="text-2xl font-semibold">
              Notifications
            </h2>
          )}

        </div>

      </div>
    </div>
  );
}

export default SettingPage