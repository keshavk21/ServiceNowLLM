export interface Platform {
  name: string;
  status: 'connected' | 'disconnected';
}

export interface SystemStatus {
  name: string;
  status: 'active' | 'synced' | 'inactive';
}

export interface AdminControl {
  title: string;
  description: string;
  action: 'Manage' | 'View' | 'Configure';
  details?: string;
}

export interface MenuItem {
  name: string;
  icon: string;
  path: string;
  isAdmin?: boolean;
  description?: string;
}