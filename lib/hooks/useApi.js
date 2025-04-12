// lib/hooks/useApi.js
'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { initializeApi } from '@/lib/api';

export default function useApi() {
  const { getToken, userId } = useAuth();
  
  useEffect(() => {
    if (getToken) {
      initializeApi(getToken);
    }
  }, [getToken]);
  
  return {
    userId
  };
}