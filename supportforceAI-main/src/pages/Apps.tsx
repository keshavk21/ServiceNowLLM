import React, { useState } from 'react';
import { Info, Filter, ArrowLeft } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const platforms = [
  { id: 'servicenow', name: 'ServiceNow', active: true },
  { id: 'jira', name: 'Jira', active: true },
  { id: 'zendesk', name: 'Zendesk', active: false },
  { id: 'freshdesk', name: 'Freshdesk', active: false }
];

interface PlatformFormData {
  instanceUrl: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ticketVolumeData: ChartData<'line'> = {
  labels: days,
  datasets: [
    {
      label: 'Total Incidents',
      data: [45, 52, 38, 65, 48, 25, 32],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4,
    },
    {
      label: 'Resolved',
      data: [40, 45, 35, 55, 45, 22, 30],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      tension: 0.4,
    },
  ],
};

const resolutionTimeData: ChartData<'line'> = {
  labels: days,
  datasets: [
    {
      label: 'Resolution Time',
      data: [5, 7, 3, 10, 4, 2, 2],
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgba(249, 115, 22, 0.5)',
      tension: 0.4,
    },
  ],
};

const ticketStatusData: ChartData<'bar'> = {
  labels: days,
  datasets: [
    {
      label: 'Resolved',
      data: [38, 42, 35, 55, 42, 22, 28],
      backgroundColor: 'rgb(34, 197, 94)',
    },
    {
      label: 'Pending',
      data: [7, 10, 3, 10, 6, 3, 4],
      backgroundColor: 'rgb(249, 115, 22)',
    },
  ],
};

const categoryDistributionData: ChartData<'bar'> = {
  labels: ['Network', 'Software', 'Hardware', 'Security', 'Access'],
  datasets: [
    {
      label: 'Tickets',
      data: [32, 28, 24, 16, 8],
      backgroundColor: 'rgb(59, 130, 246)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

export const Apps: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('servicenow');
  const [view, setView] = useState<'connect' | 'analytics'>('connect');
  const [formData, setFormData] = useState<PlatformFormData>({
    instanceUrl: '',
    clientId: '',
    clientSecret: '',
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('analytics');
  };

  const handleBack = () => {
    setView('connect');
  };

  if (view === 'analytics') {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Platform Analytics</h1>
              <p className="text-gray-500">ServiceNow Integration Overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Refresh
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Ticket Volume Over Time</h3>
            <div className="h-64">
              <Line data={ticketVolumeData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Category Distribution</h3>
            <div className="h-64">
              <Bar 
                data={categoryDistributionData} 
                options={{
                  ...chartOptions,
                  indexAxis: 'y' as const,
                }} 
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Resolution Time Analysis</h3>
            <div className="h-64">
              <Line data={resolutionTimeData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Ticket Status Distribution</h3>
            <div className="h-64">
              <Bar data={ticketStatusData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Connect Platform</h1>
      <p className="text-gray-600 mb-8">Select a platform to connect to SupportForce</p>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex gap-4 border-b border-gray-200 pb-4 mb-6">
          {platforms.map(platform => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedPlatform === platform.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {platform.name}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Connect to {platforms.find(p => p.id === selectedPlatform)?.name}</h2>
            <p className="text-gray-600 mb-4">Enter your credentials to establish connection</p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              Make sure you have admin access to {platforms.find(p => p.id === selectedPlatform)?.name} to complete the integration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="instanceUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Instance URL
              </label>
              <input
                type="url"
                id="instanceUrl"
                name="instanceUrl"
                value={formData.instanceUrl}
                onChange={handleChange}
                placeholder={`https://your-instance.${selectedPlatform}.com`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                Client ID
              </label>
              <input
                type="text"
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                placeholder="Enter your client ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700 mb-1">
                Client Secret
              </label>
              <input
                type="password"
                id="clientSecret"
                name="clientSecret"
                value={formData.clientSecret}
                onChange={handleChange}
                placeholder="Enter your client secret"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={`${selectedPlatform} admin username`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Connect
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Test Connection
              </button>
            </div>
          </form>

          <div className="border-t border-gray-200 pt-6 mt-8">
            <h3 className="font-medium mb-4">Before you connect:</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">1</span>
                Get your credentials ready
                <span className="text-gray-500">You'll need admin access to {platforms.find(p => p.id === selectedPlatform)?.name}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">2</span>
                Configure your instance
                <span className="text-gray-500">Ensure your instance is properly configured</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">3</span>
                Check permissions
                <span className="text-gray-500">Verify you have the required permissions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};