import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.financialdashboard',
  appName: 'financial-dashboard',
  webDir: 'out', // This is the critical fix
  server: {
    androidScheme: 'https'
  }
};

export default config;