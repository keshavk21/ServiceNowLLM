import React, { useState } from 'react';
import { Box, Settings, Copy, Trash2, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  category: string;
  platform: string;
  status: 'Active' | 'Draft';
  used: number;
  successRate: number;
}

interface AISettings {
  responseDelay: number;
  confidenceThreshold: number;
  maxTokens: number;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Password Reset',
    category: 'Account Access',
    platform: 'All Platforms',
    status: 'Active',
    used: 245,
    successRate: 92
  },
  {
    id: '2',
    name: 'Network Connection Issues',
    category: 'Technical',
    platform: 'servicenow',
    status: 'Active',
    used: 189,
    successRate: 88
  },
  {
    id: '3',
    name: 'Software Installation',
    category: 'Software',
    platform: 'jira',
    status: 'Draft',
    used: 0,
    successRate: 0
  }
];

export const Responses: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'templates' | 'settings'>('templates');
  const [settings, setSettings] = useState<AISettings>({
    responseDelay: 2,
    confidenceThreshold: 0.85,
    maxTokens: 500
  });

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    // Handle saving settings
    console.log('Saving settings:', settings);
  };

  const handleNewTemplate = () => {
    navigate('/responses/templates');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">AI Responses</h1>
        {activeTab === 'templates' && (
          <button
            onClick={handleNewTemplate}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">+</span> New Template
          </button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Platforms</option>
          <option>ServiceNow</option>
          <option>Jira</option>
        </select>

        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Categories</option>
          <option>Account Access</option>
          <option>Technical</option>
          <option>Software</option>
        </select>

        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="flex gap-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 ${
            activeTab === 'templates' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
          }`}
        >
          <Box className="w-4 h-4" />
          Templates
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 ${
            activeTab === 'settings' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
          }`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {activeTab === 'templates' ? (
        <div className="space-y-4">
          {templates.map(template => (
            <div key={template.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Box className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-medium">{template.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category:</p>
                  <p className="font-medium">{template.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Platform:</p>
                  <p className="font-medium">{template.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <div className="flex items-center gap-2">
                    {template.status === 'Active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="w-1.5 h-1.5 mr-1.5 bg-green-400 rounded-full"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Draft
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Used:</p>
                  <p className="font-medium">{template.used} times</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Success Rate:</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${template.successRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{template.successRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">AI Response Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="responseDelay" className="block text-sm font-medium text-gray-700 mb-1">
                Response Delay (seconds)
              </label>
              <input
                type="number"
                id="responseDelay"
                name="responseDelay"
                value={settings.responseDelay}
                onChange={handleSettingsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="1"
              />
            </div>

            <div>
              <label htmlFor="confidenceThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                Confidence Threshold
              </label>
              <input
                type="number"
                id="confidenceThreshold"
                name="confidenceThreshold"
                value={settings.confidenceThreshold}
                onChange={handleSettingsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="1"
                step="0.01"
              />
            </div>

            <div>
              <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700 mb-1">
                Max Tokens
              </label>
              <input
                type="number"
                id="maxTokens"
                name="maxTokens"
                value={settings.maxTokens}
                onChange={handleSettingsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                step="1"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};