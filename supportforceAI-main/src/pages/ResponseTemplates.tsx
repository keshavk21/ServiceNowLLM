import React, { useState } from 'react';
import { AlertTriangle, Shield, Layers, Clock, Filter, ChevronRight } from 'lucide-react';

interface Template {
  id: string;
  code: string;
  name: string;
  description: string;
  priority: 'P1' | 'P2' | 'P3';
  slaTarget: string;
  platforms: number;
  conditions: number;
}

interface ResponseStep {
  id: number;
  description: string;
}

interface Condition {
  name: string;
  operator: string;
  value: string;
}

interface Action {
  type: string;
  property: string;
  value: string;
}

const templates: Template[] = [
  {
    id: '1',
    code: 'INC001',
    name: 'Critical System Outage',
    description: 'Response template for critical system outages',
    priority: 'P1',
    slaTarget: '1 hour',
    platforms: 2,
    conditions: 2
  },
  {
    id: '2',
    code: 'ACC001',
    name: 'Privileged Access Request',
    description: 'Handling elevated access requests',
    priority: 'P2',
    slaTarget: '4 hours',
    platforms: 1,
    conditions: 2
  },
  {
    id: '3',
    code: 'SVC001',
    name: 'Software Deployment',
    description: 'Enterprise software deployment process',
    priority: 'P3',
    slaTarget: '24 hours',
    platforms: 3,
    conditions: 2
  }
];

const responseSteps: ResponseStep[] = [
  { id: 1, description: 'Immediate acknowledgment' },
  { id: 2, description: 'Impact assessment' },
  { id: 3, description: 'Technical team engagement' },
  { id: 4, description: 'Status updates every 15 minutes' },
  { id: 5, description: 'Resolution path communication' }
];

const conditions: Condition[] = [
  { name: 'impact', operator: 'equals', value: 'high' },
  { name: 'urgency', operator: 'equals', value: 'high' }
];

const actions: Action[] = [
  { type: 'notify', property: 'target', value: 'on-call-team' },
  { type: 'escalate', property: 'level', value: 'immediate' },
  { type: 'create-bridge', property: 'platform', value: 'teams' }
];

export const ResponseTemplates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [view, setView] = useState<'list' | 'configure'>('list');

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Critical System Outage':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'Privileged Access Request':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'Software Deployment':
        return <Layers className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const handleConfigureClick = (template: Template) => {
    setSelectedTemplate(template);
    setView('configure');
  };

  if (view === 'configure' && selectedTemplate) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Response Templates</h1>
            <p className="text-gray-500">Configure automated response patterns</p>
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <span className="text-lg">+</span> New Template
          </button>
        </div>

        <div className="flex gap-6">
          <div className="w-64 space-y-4">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="font-medium mb-3">Categories</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-red-700 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  Incident Management
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Shield className="w-4 h-4" />
                  Access Management
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Layers className="w-4 h-4" />
                  Service Request
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="font-medium mb-3">Filters</h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4" />
                  SLA Target
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Layers className="w-4 h-4" />
                  Platform
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Filter className="w-4 h-4" />
                  Priority
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                {getCategoryIcon(selectedTemplate.name)}
                <div>
                  <h2 className="text-xl font-semibold">{selectedTemplate.name}</h2>
                  <p className="text-gray-500">{selectedTemplate.code}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Response Configuration</h3>
                  <div className="space-y-2">
                    {responseSteps.map(step => (
                      <div key={step.id} className="flex items-center gap-3 text-gray-700">
                        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                          {step.id}
                        </span>
                        {step.description}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Conditions</h3>
                  <div className="space-y-3">
                    {conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-gray-600">{condition.name}</span>
                        <span className="text-gray-400">{condition.operator}</span>
                        <span className="font-medium">{condition.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Actions</h3>
                  <div className="space-y-3">
                    {actions.map((action, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-blue-600">{action.type}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">{action.property}:</span>
                          <span>{action.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Response Templates</h1>
          <p className="text-gray-500">Configure automated response patterns</p>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
          <span className="text-lg">+</span> New Template
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-4">
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-medium mb-3">Categories</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-red-700 bg-red-50 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
                Incident Management
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Shield className="w-4 h-4" />
                Access Management
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Layers className="w-4 h-4" />
                Service Request
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-medium mb-3">Filters</h2>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Clock className="w-4 h-4" />
                SLA Target
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Layers className="w-4 h-4" />
                Platform
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                <Filter className="w-4 h-4" />
                Priority
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {templates.map(template => (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(template.name)}
                  <div>
                    <h3 className="text-lg font-medium">{template.name}</h3>
                    <p className="text-gray-500">{template.code}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleConfigureClick(template)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  Configure
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-2 text-gray-600">{template.description}</p>

              <div className="mt-4 grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Priority</p>
                  <p className="font-medium">{template.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">SLA Target</p>
                  <p className="font-medium">{template.slaTarget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Platforms</p>
                  <p className="font-medium">{template.platforms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conditions</p>
                  <p className="font-medium">{template.conditions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};