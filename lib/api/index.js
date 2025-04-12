// lib/api/index.js
import apiClient, { configureClient } from './client';
import { ENDPOINTS } from './endpoints';

// Initialize with auth token getter
export function initializeApi(getToken) {
  if (getToken) {
    configureClient(getToken);
  }
}

// Export all API methods
export const healthApi = {
  checkHealth: async () => {
    const response = await apiClient.get(ENDPOINTS.HEALTH);
    return response.data;
  }
};

export const dataApi = {
  fetchUserData: async (type = null) => {
    let url = ENDPOINTS.DATA.GET;
    if (type) {
      url += `?type=${type}`;
    }
    const response = await apiClient.get(url);
    return response.data;
  },
  
  saveData: async (data) => {
    const response = await apiClient.post(ENDPOINTS.DATA.SAVE, data);
    return response.data;
  },
  
  saveTweet: async (tweetUrl) => {
    const response = await apiClient.post(ENDPOINTS.DATA.SAVE_TWEET, { tweetUrl });
    return response.data;
  },
  
  savePdf: async (pdfFile) => {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    
    const response = await apiClient.post(
      ENDPOINTS.DATA.SAVE_PDF,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
  
  deleteData: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.DATA.DELETE(id));
    return response.data;
  }
};

export const queryApi = {
  sendQuery: async (text, userId, sessionId = undefined) => {
    const response = await apiClient.post(ENDPOINTS.QUERY, {
      text,
      userId,
      sessionId
    });
    return response.data;
  }
};

export const sessionApi = {
  resetSession: async (userId) => {
    const response = await apiClient.post(ENDPOINTS.SESSION.RESET, { userId });
    return response.data;
  },
  
  getSession: async (sessionId) => {
    const response = await apiClient.get(ENDPOINTS.SESSION.GET(sessionId));
    return response.data;
  }
};

export const userApi = {
  fetchUsageStats: async () => {
    const response = await apiClient.get(ENDPOINTS.USER.USAGE);
    return response.data;
  }
};