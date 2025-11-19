import { createContext, useContext, useState } from 'react';

interface NotificationContextValue {
  message: string | null;
  setMessage: (msg: string | null) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {message && <div className="toast">{message}</div>}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotification must be used inside NotificationProvider');
  }
  return ctx;
};
