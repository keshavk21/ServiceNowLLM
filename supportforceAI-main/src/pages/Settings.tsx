import React, { useState } from 'react';
import { Cog, Shield, Bell, Globe2, Sun, Moon } from 'lucide-react';

type SettingsTab = 'general' | 'security' | 'notifications' | 'integrations';

interface ActiveSession {
  device: string;
  platform: string;
  lastActive: string;
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: 'My Workspace',
    url: 'my-workspace'
  });
  const [language, setLanguage] = useState('English (US)');
  const [timezone, setTimezone] = useState('Pacific Time (PT)');

  const activeSessions: ActiveSession[] = [
    {
      device: 'Chrome',
      platform: 'Windows',
      lastActive: '2 minutes ago'
    },
    {
      device: 'Mobile App',
      platform: 'iPhone',
      lastActive: '1 hour ago'
    }
  ];

  const handleWorkspaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkspaceInfo(prev => ({ ...prev, [name]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">General Settings</h2>
              <p className="text-gray-500">Manage your workspace preferences</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Workspace Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={workspaceInfo.name}
                      onChange={handleWorkspaceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                      Workspace URL
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">
                        supportforce.com/
                      </span>
                      <input
                        type="text"
                        id="url"
                        name="url"
                        value={workspaceInfo.url}
                        onChange={handleWorkspaceChange}
                        className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone
                    </label>
                    <select
                      id="timezone"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Appearance</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <p className="text-sm text-gray-500 mb-3">Customize how the app looks</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Sun className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Moon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Security Settings</h2>
              <p className="text-gray-500">Manage your security preferences</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Enable 2FA
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                <div className="space-y-4">
                  {activeSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-medium">{session.device} on {session.platform}</p>
                        <p className="text-sm text-gray-500">Last active: {session.lastActive}</p>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Logout
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <div className="w-64">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === 'general' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Cog className="w-5 h-5" />
              General
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shield className="w-5 h-5" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                activeTab === 'integrations' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe2 className="w-5 h-5" />
              Integrations
            </button>
          </nav>
        </div>

        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};