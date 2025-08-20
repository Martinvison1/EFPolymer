import { join } from 'path';
import { homedir } from 'os';

export default () => {
  // Determine default data directory based on OS
  const getDefaultDataDir = () => {
    const platform = process.platform;
    const home = homedir();
    
    switch (platform) {
      case 'darwin':
        return join(home, 'Library', 'Application Support', 'EFPolymerCRM');
      case 'win32':
        return join(home, 'AppData', 'Local', 'EFPolymerCRM');
      default:
        return join(home, '.efpolymer-crm');
    }
  };

  const dataDir = process.env.DATA_DIR || getDefaultDataDir();
  
  return {
    port: parseInt(process.env.PORT, 10) || 8443,
    host: process.env.HOST || '127.0.0.1',
    
    // Data paths
    dataDir,
    dbPath: process.env.DB_PATH || join(dataDir, 'db', 'efpcrm.db'),
    vaultPath: process.env.VAULT_PATH || join(dataDir, 'vault'),
    backupPath: process.env.BACKUP_PATH || join(dataDir, 'backups'),
    logPath: process.env.LOG_PATH || join(dataDir, 'logs'),
    certPath: process.env.CERT_PATH || join(dataDir, 'certs'),
    configPath: process.env.CONFIG_PATH || join(dataDir, 'config'),
    
    // Database
    database: {
      url: process.env.DATABASE_URL || `file:${join(dataDir, 'db', 'efpcrm.db')}`,
    },
    
    // Security
    jwt: {
      secret: process.env.JWT_SECRET || 'efpolymer-crm-jwt-secret-key',
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    },
    
    session: {
      secret: process.env.SESSION_SECRET || 'efpolymer-crm-session-secret',
      timeoutMinutes: parseInt(process.env.SESSION_TIMEOUT_MINUTES, 10) || 20,
    },
    
    // Features
    features: {
      lanMode: process.env.LAN_MODE === 'true',
      telemetryEnabled: process.env.TELEMETRY_ENABLED === 'true',
      backupSchedule: process.env.BACKUP_SCHEDULE || '0 2 * * *', // Daily at 2 AM
    },
    
    // Localization
    defaultLocale: process.env.DEFAULT_LOCALE || 'en',
    supportedLocales: ['en', 'es'],
    
    // Performance
    maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE, 10) || 50 * 1024 * 1024, // 50MB
    queryTimeout: parseInt(process.env.QUERY_TIMEOUT, 10) || 5000, // 5 seconds
  };
};