import React from 'react';
import { FileText, Zap, BarChart, Shield } from 'lucide-react';
import { AdminControl, Platform, SystemStatus } from '../types';

const adminControls: AdminControl[] = [
  {
    title: 'Access Management',
    description: '5 admins, 25 users',
    action: 'Manage'
  },
  {
    title: 'API Keys',
    description: '3 active keys',
    action: 'View'
  },
  {
    title: 'Security Settings',
    description: 'Last updated 24 ago',
    action: 'Configure'
  }
];

const platforms: Platform[] = [
  { name: 'ServiceNow', status: 'connected' },
  { name: 'Jira', status: 'connected' }
];

const systemStatuses: SystemStatus[] = [
  { name: 'AI Response', status: 'active' },
  { name: 'Knowledge Base', status: 'synced' }
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Documentation Library</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="w-5 h-5" />
            <span>Centralized documentation repository</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Auto-Sync</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Zap className="w-5 h-5" />
            <span>Automated knowledge synchronization</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Content Analytics</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <BarChart className="w-5 h-5" />
            <span>Knowledge base performance metrics</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4">Security</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span>Access control and permissions</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Admin Controls</h2>
        <div className="grid gap-4">
          {adminControls.map((control) => (
            <div key={control.title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{control.title}</h3>
                <p className="text-gray-600">{control.description}</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                {control.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Connected Platforms</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className={`p-4 flex items-center justify-between ${
                  index !== platforms.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <span>{platform.name}</span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Connected
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">System Status</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {systemStatuses.map((status, index) => (
              <div
                key={status.name}
                className={`p-4 flex items-center justify-between ${
                  index !== systemStatuses.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <span>{status.name}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    status.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : status.status === 'synced'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};