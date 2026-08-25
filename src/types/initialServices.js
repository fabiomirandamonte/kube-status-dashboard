export const INITIAL_SERVICES = [
  { 
    id: 1, 
    name: 'auth-service', 
    namespace: 'prod-core', 
    status: 'Healthy', 
    cpu: 12, 
    memory: 256, 
    history: [{ time: '00:00', cpu: 12 }],
    logs: ['[INFO] Auth token issued'] 
  },
  { 
    id: 2, 
    name: 'payment-gateway', 
    namespace: 'prod-finance', 
    status: 'Healthy', 
    cpu: 25, 
    memory: 512, 
    history: [{ time: '00:00', cpu: 25 }],
    logs: ['[INFO] Payment processed'] 
  },
  { 
    id: 3, 
    name: 'user-db-replica', 
    namespace: 'prod-db', 
    status: 'Healthy', 
    cpu: 45, 
    memory: 2048, 
    history: [{ time: '00:00', cpu: 45 }],
    logs: ['[INFO] Replication synced'] 
  },
];