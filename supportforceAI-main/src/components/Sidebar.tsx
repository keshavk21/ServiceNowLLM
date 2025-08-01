import React from 'react';
import { NavLink } from 'react-router-dom';
import { Apple as Apps, BarChart2, MessageSquare, Book, Settings, Users, Activity, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { MenuItem } from '../types';

const menuItems: MenuItem[] = [
  { name: 'Apps', icon: 'Apps', path: '/apps', isAdmin: true },
  { name: 'Dashboard', icon: 'BarChart2', path: '/dashboard' },
  { name: 'Responses', icon: 'MessageSquare', path: '/responses' },
  { name: 'Knowledge Base', icon: 'Book', path: '/knowledge-base' },
  { name: 'Settings', icon: 'Settings', path: '/settings', isAdmin: true },
  { name: 'Team', icon: 'Users', path: '/team' },
  { name: 'Audit Logs', icon: 'Activity', path: '/audit-logs', isAdmin: true },
  { name: 'Access Control', icon: 'Lock', path: '/access-control', isAdmin: true },
];

const iconComponents: { [key: string]: React.ElementType } = {
  Apps,
  BarChart2,
  MessageSquare,
  Book,
  Settings,
  Users,
  Activity,
  Lock,
};

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Logo />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = iconComponents[item.icon];
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                      isActive ? 'bg-gray-100' : ''
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {item.isAdmin && (
                    <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};