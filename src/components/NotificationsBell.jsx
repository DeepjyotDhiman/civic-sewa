import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './NotificationsBell.css';

const NotificationsBell = ({ userRole }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Authorities listen for 'all_authorities', while citizens listen for their own unique UID.
    const targetUserId = userRole === 'authority' ? 'all_authorities' : user.uid;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", targetUserId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [user, userRole]);

  const handleNotificationClick = async (notif) => {
    // Navigate to the relevant page to see the issue details
    if (userRole === 'authority') {
      navigate('/authority/issues');
    } else {
      navigate('/dashboard');
    }

    // Mark the notification as read in Firestore
    if (!notif.isRead) {
      await updateDoc(doc(db, "notifications", notif.id), { isRead: true });
    }
    setIsOpen(false);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="notifications-bell">
      <button onClick={() => setIsOpen(!isOpen)} className="bell-button">
        <FiBell />
        {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="dropdown-header">Notifications</div>
          {notifications.length === 0 ? (
            <div className="notification-item">No new notifications.</div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(notif)}
              >
                {notif.message}
                <span className="notification-time">
                  {notif.createdAt ? new Date(notif.createdAt.seconds * 1000).toLocaleString() : ''}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;