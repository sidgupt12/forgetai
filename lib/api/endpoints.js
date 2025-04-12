// lib/api/endpoints.js
export const ENDPOINTS = {
    // Health check
    HEALTH: '/health',
    
    // Data endpoints
    DATA: {
      GET: '/api/data',
      SAVE: '/api/save',
      DELETE: (id) => `/api/data/${id}`,
      SAVE_TWEET: '/api/save-tweet',
      SAVE_PDF: '/api/save-pdf'
    },
    
    // Query endpoints
    QUERY: '/api/query',
    
    // Session endpoints
    SESSION: {
      RESET: '/api/reset-session',
      GET: (id) => `/api/session/${id}`,
    },
    
    // User endpoints
    USER: {
      USAGE: '/api/usage',
    }
  };