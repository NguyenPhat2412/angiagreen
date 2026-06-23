export interface AuditLog {
  id: string;
  actorId?: string;
  actorType: 'user' | 'admin' | 'doctor' | 'system';
  action: string;
  module: string;
  entityType?: string;
  entityId?: string;
  oldValue?: Record<string, any> | any;
  newValue?: Record<string, any> | any;
  ipAddress?: string;
  userAgent?: string;
  result: 'success' | 'failed';
  reason?: string;
  createdAt: string;
}
