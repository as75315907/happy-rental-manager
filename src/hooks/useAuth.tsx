
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const loginTime = localStorage.getItem('loginTime');
      
      if (authStatus === 'true' && loginTime) {
        // 檢查是否超過 24 小時（可調整）
        const now = Date.now();
        const login = parseInt(loginTime);
        const hoursDiff = (now - login) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          // 登入已過期
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    logout
  };
};
