import './NotificationBadge.css';

const NotificationBadge = ({ notifications, mode='' }) => {

  return (
    <>
      {notifications !== 0 && <div className={`notification-badge ${mode}`}>
        {notifications}
      </div>}
    </>
  )
}

export default NotificationBadge;