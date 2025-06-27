import React from 'react';
import { debugLog, env, isDevelopment } from '../config/env';

const EnvironmentInfo: React.FC = () => {
  React.useEffect(() => {
    debugLog('Environment Info Component mounted');
    debugLog('Current environment:', env.ENVIRONMENT);
    debugLog('API Base URL:', env.API_BASE_URL);
  }, []);

  if (!isDevelopment()) {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-sm">
      <h3 className="font-bold mb-2">Environment Info</h3>
      <div className="space-y-1">
        <div>Environment: {env.ENVIRONMENT}</div>
        <div>API URL: {env.API_BASE_URL}</div>
        <div>Debug Mode: {env.DEBUG_MODE ? 'ON' : 'OFF'}</div>
        <div>Analytics: {env.ENABLE_ANALYTICS ? 'ON' : 'OFF'}</div>
      </div>
    </div>
  );
};

export default EnvironmentInfo;
