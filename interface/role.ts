import { Language } from './common';

export interface Role {
  id: string;
  code: string;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  isSystemRole: boolean;
  status: 'active' | 'inactive';
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Permission {
  id: string;
  code: string;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  module: string;
  action: 'view' | 'create' | 'update' | 'delete' | 'approve' | 'export' | 'manage';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  status: 'active' | 'inactive';
  assignedBy?: string;
  assignedAt: string;
  revokedBy?: string;
  revokedAt?: string;
  note?: string;
}
