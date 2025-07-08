// src/components/UI/NotificationSystem.jsx
import React, { useState, useEffect } from 'react';
import './NotificationSystem.css';

const NotificationSystem = ({ notifications = [] }) => {
  const [displayedNotifications, setDisplayedNotifications] = useState([]);

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotification = notifications[notifications.length - 1];
      const id = Date.now();
      
      setDisplayedNotifications(prev => [
        ...prev,
        { ...newNotification, id, timestamp: Date.now() }
      ]);

      // Auto-remove after 4 seconds
      setTimeout(() => {
        setDisplayedNotifications(prev => 
          prev.filter(notif => notif.id !== id)
        );
      }, 4000);
    }
  }, [notifications]);

  return (
    <div className="notification-system">
      {displayedNotifications.map((notification) => (
        <div 
          key={notification.id}
          className={`notification ${notification.type || 'info'}`}
        >
          <div className="notification-icon">
            {notification.type === 'success' && '✅'}
            {notification.type === 'warning' && '⚠️'}
            {notification.type === 'error' && '❌'}
            {notification.type === 'info' && 'ℹ️'}
          </div>
          <div className="notification-content">
            <div className="notification-title">{notification.title}</div>
            <div className="notification-message">{notification.message}</div>
          </div>
          <div className="notification-close">×</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
