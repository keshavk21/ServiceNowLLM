import React, { useState } from 'react';
import { Search, Check, Plus } from 'lucide-react';

interface Role {
  name: string;
  description: string;
  users: number;
  permissions: string[];
}

const roles: Role[] = [
  {
    name: 'Admin',
    description: 'Full access to all features',
    users: 5,
    permissions: [
      'Full system access',
      'Security settings',
      'User management',
      'Billing access'
    ]
  },
  {
    name: 'Editor',
    description: 'Can edit and manage content',
    users: 12,
    permissions: [
      'Content management',
      'View analytics',
      'Publishing access'
    ]
  },
  {
    name: 'Viewer',
    description: 'Can view and comment',
    users: 28,
    permissions: [
      'View content',
      'Basic access',
      'Add comments'
    ]
  }
];

export const AccessControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'security'>('roles');
  const [searchQuery, setSearchQuery] = useState('');

  const renderRolesAndPermissions = () => (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search roles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.name} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">{role.name}</h3>
                <p className="text-gray-500">{role.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{role.users} users</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Edit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {role.permissions.map((permission, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{permission}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Session Management</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Timeout
            </label>
            <p className="text-sm text-gray-500 mb-2">Automatically log out inactive users</p>
            <select className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Concurrent Sessions
            </label>
            <p className="text-sm text-gray-500 mb-2">Maximum active sessions per user</p>
            <select className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>1 session</option>
              <option>2 sessions</option>
              <option>3 sessions</option>
              <option>Unlimited</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Password Policy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Password Length
            </label>
            <p className="text-sm text-gray-500 mb-2">Required number of characters</p>
            <select className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>8 characters</option>
              <option>10 characters</option>
              <option>12 characters</option>
              <option>16 characters</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Expiration
            </label>
            <p className="text-sm text-gray-500 mb-2">Force password reset after period</p>
            <select className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
              <option>Never</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">IP Restrictions</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allowed IP Ranges
          </label>
          <textarea
            rows={4}
            placeholder="Enter IP ranges (one per line)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <p className="mt-2 text-sm text-gray-500">Enter IP ranges in CIDR notation (e.g., 192.168.1.0/24)</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Access Control</h1>
          <p className="text-gray-500">Manage roles and permissions for your workspace</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Role
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'roles'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Roles & Permissions
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Security Settings
          </button>
        </nav>
      </div>

      {activeTab === 'roles' ? renderRolesAndPermissions() : renderSecuritySettings()}
    </div>
  );
};