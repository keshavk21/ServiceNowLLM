import React, { useState } from 'react';
import { Search, Mail, Pencil, Trash2, Shield, Edit, UserCircle } from 'lucide-react';

interface TeamMember {
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Pending';
  lastActive: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 hours ago'
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Editor',
    status: 'Active',
    lastActive: '1 day ago'
  },
  {
    name: 'Emma Rodriguez',
    email: 'emma.r@company.com',
    role: 'Viewer',
    status: 'Pending',
    lastActive: 'Never'
  }
];

export const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case 'Editor':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'Viewer':
        return <UserCircle className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Team Members</h1>
          <p className="text-gray-500">Manage your team members and their access levels</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Invite Members
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Role</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Last Active</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-0">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(member.role)}
                    <span>{member.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {member.lastActive}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-5 h-5" />
          <span>2 invitations pending. Invitations expire after 7 days.</span>
        </div>
      </div>
    </div>
  );
};