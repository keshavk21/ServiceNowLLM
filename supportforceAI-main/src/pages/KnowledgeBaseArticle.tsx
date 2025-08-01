import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, Tag, Link as LinkIcon, ThumbsUp, Eye, Monitor, CheckCircle } from 'lucide-react';

interface Article {
  id: string;
  code: string;
  title: string;
  category: string;
  updated: string;
  helpful: number;
  views: number;
  environment: { name: string; items: string[] }[];
  procedure: { step: number; title: string; items: string[] }[];
  issues: { title: string; type: 'error' | 'success'; description?: string }[];
  escalation?: {
    levels: {
      level: number;
      when: string;
      contact: string;
      priority: string;
    }[];
  };
}

const articles: { [key: string]: Article } = {
  'vpn-guide': {
    id: 'KB0001234',
    code: 'KB0001234',
    title: 'VPN Connection Troubleshooting Guide',
    category: 'Network',
    updated: '2024-02-20',
    helpful: 92,
    views: 1245,
    environment: [
      {
        name: 'Environment Requirements',
        items: [
          'Windows 10/11 Enterprise',
          'Cisco AnyConnect VPN Client v4.10+',
          'Corporate Network Access',
          'Active Directory Credentials'
        ]
      }
    ],
    procedure: [
      {
        step: 1,
        title: 'Basic Connection Check',
        items: [
          'Verify internet connectivity by accessing external websites',
          'Test network stability by pinging 8.8.8.8',
          'Ensure no other VPN clients are running',
          'Check system date and time are correct'
        ]
      },
      {
        step: 2,
        title: 'Client Verification',
        items: [
          'Open AnyConnect client',
          'Verify server address is correct: vpn.company.com',
          'Clear saved credentials',
          'Restart AnyConnect service'
        ]
      }
    ],
    issues: [
      {
        title: 'Error 413: Client Certificate Required',
        type: 'error',
        description: 'Contact Security team if certificate is expired'
      },
      {
        title: 'Verify certificate in Personal Certificate Store',
        type: 'success'
      },
      {
        title: 'Error 429: Unable to Resolve Server',
        type: 'error'
      },
      {
        title: 'Check DNS settings and hosts file',
        type: 'success',
        description: 'Ensure no conflicting VPN entries in hosts file'
      }
    ],
    escalation: {
      levels: [
        {
          level: 1,
          when: 'Basic troubleshooting steps fail',
          contact: 'Network Support Team',
          priority: 'P3'
        },
        {
          level: 2,
          when: 'Certificate or authentication issues',
          contact: 'Security Team',
          priority: 'P2'
        }
      ]
    }
  },
  'mfa-setup': {
    id: 'KB0001235',
    code: 'KB0001235',
    title: 'Azure MFA Configuration',
    category: 'Security',
    updated: '2024-02-21',
    helpful: 95,
    views: 2103,
    environment: [
      {
        name: 'Environment',
        items: [
          'Azure AD Premium',
          'Microsoft 365 Enterprise',
          'Authenticator App'
        ]
      }
    ],
    procedure: [
      {
        step: 1,
        title: 'Policy Setup',
        items: [
          'Access Azure Portal',
          'Configure MFA Settings',
          'Set User Groups'
        ]
      },
      {
        step: 2,
        title: 'User Enrollment',
        items: [
          'Send Instructions',
          'Setup Authentication',
          'Test Access'
        ]
      }
    ],
    issues: [
      {
        title: 'Enrollment Failure',
        type: 'error'
      },
      {
        title: 'Verify user permissions',
        type: 'success',
        description: 'Check license assignment'
      }
    ]
  },
  'license-management': {
    id: 'KB0001236',
    code: 'KB0001236',
    title: 'Exchange Migration Process',
    category: 'Email',
    updated: '2024-02-22',
    helpful: 91,
    views: 1876,
    environment: [
      {
        name: 'Environment',
        items: [
          'Exchange Server 2019',
          'Exchange Online',
          'Azure AD Connect'
        ]
      }
    ],
    procedure: [
      {
        step: 1,
        title: 'Pre-Migration',
        items: [
          'Assessment Check',
          'Verify Requirements',
          'Prepare Environment'
        ]
      },
      {
        step: 2,
        title: 'Migration',
        items: [
          'Create Batches',
          'Start Migration',
          'Monitor Progress'
        ]
      }
    ],
    issues: [
      {
        title: 'Migration Stuck',
        type: 'error'
      },
      {
        title: 'Check connectivity',
        type: 'success',
        description: 'Verify batch size'
      }
    ]
  }
};

export const KnowledgeBaseArticle: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articles[articleId || ''];

  if (!article) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Article not found</h2>
          <Link to="/knowledge-base" className="text-blue-600 hover:text-blue-700">
            Return to Knowledge Base
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          to="/knowledge-base"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Knowledge Base
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">{article.title}</h1>
          <div className="text-sm text-gray-500">{article.code}</div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Updated {article.updated}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-4 h-4" />
            <span>{article.category}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ThumbsUp className="w-4 h-4" />
            <span>{article.helpful}% Helpful</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Eye className="w-4 h-4" />
            <span>{article.views} Views</span>
          </div>
        </div>

        {article.environment.map((env, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium">{env.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {env.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium">Procedure</h2>
          </div>
          <div className="space-y-6">
            {article.procedure.map((proc) => (
              <div key={proc.step} className="pl-6 border-l-2 border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-medium">
                    {proc.step}
                  </span>
                  <h3 className="font-medium">{proc.title}</h3>
                </div>
                <ul className="space-y-2">
                  {proc.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LinkIcon className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium">Common Issues</h2>
          </div>
          <div className="space-y-4">
            {article.issues.map((issue, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className={`mt-1 w-2 h-2 rounded-full ${issue.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}></span>
                <div>
                  <div className={`font-medium ${issue.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {issue.title}
                  </div>
                  {issue.description && (
                    <p className="text-sm text-gray-600">{issue.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {article.escalation && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium">Escalation Path</h2>
            </div>
            <div className="space-y-4">
              {article.escalation.levels.map((level) => (
                <div key={level.level} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                      {level.level}
                    </span>
                    <span className="font-medium">LEVEL {level.level}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>When: {level.when}</p>
                    <p>Contact: {level.contact}</p>
                    <p>Priority: {level.priority}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};