import React, { useState } from 'react';
import { Search, FileText, Layout, Shield, Tag, Book, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  code: string;
  title: string;
  tags: string[];
  helpfulPercentage: number;
  views: number;
  aiUses: number;
  date: string;
  status: 'Published' | 'Draft';
}

const articles: Article[] = [
  {
    id: 'vpn-guide',
    code: 'KB001',
    title: 'Enterprise VPN Setup Guide',
    tags: ['vpn', 'network', 'remote-access'],
    helpfulPercentage: 92,
    views: 1245,
    aiUses: 156,
    date: '2024-02-20',
    status: 'Published'
  },
  {
    id: 'mfa-setup',
    code: 'KB002',
    title: 'Multi-Factor Authentication Setup',
    tags: ['security', 'mfa', 'authentication'],
    helpfulPercentage: 95,
    views: 890,
    aiUses: 234,
    date: '2024-02-18',
    status: 'Published'
  },
  {
    id: 'license-management',
    code: 'KB003',
    title: 'Software License Management',
    tags: ['licensing', 'software', 'compliance'],
    helpfulPercentage: 88,
    views: 567,
    aiUses: 89,
    date: '2024-02-15',
    status: 'Draft'
  }
];

const categories = [
  { name: 'All Articles', icon: Layout },
  { name: 'Network & Infrastructure', icon: Layout },
  { name: 'Security', icon: Shield },
  { name: 'Software', icon: FileText },
  { name: 'Hardware', icon: Layout }
];

const popularTags = ['security', 'network', 'software'];

export const KnowledgeBase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Articles');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Knowledge Base</h1>
          <p className="text-gray-500">Manage and organize support documentation</p>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
          <span className="text-lg">+</span> New Article
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Articles</p>
              <p className="text-2xl font-semibold">248</p>
            </div>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">AI Usage</p>
              <p className="text-2xl font-semibold">1.2k</p>
            </div>
            <Layout className="w-5 h-5 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-semibold">4.8</p>
            </div>
            <Book className="w-5 h-5 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Contributors</p>
              <p className="text-2xl font-semibold">32</p>
            </div>
            <Shield className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-medium mb-3">Categories</h2>
            <div className="space-y-1">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                      selectedCategory === category.name
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-medium mb-3">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {articles.map(article => (
            <Link
              key={article.id}
              to={`/knowledge-base/article/${article.id}`}
              className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">{article.title}</h3>
                    <span className="text-sm text-gray-500">{article.code}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      article.status === 'Published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Helpful</p>
                  <p className="font-medium">{article.helpfulPercentage}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Views</p>
                  <p className="font-medium">{article.views}</p>
                </div>
                <div>
                  <p className="text-gray-600">AI Uses</p>
                  <p className="font-medium">{article.aiUses}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="font-medium">{article.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};