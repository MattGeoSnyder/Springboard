import moment from 'moment';
import './Message.css';

const Message = ({ message, userId }) => {
    const dir = message.from_user == userId ? 'sent' : 'received';
    const time = new Date(message.sent_at);

    return (
        <div className={`message ${dir}`}>
            <p className={`message-content ${dir}`}>
                {message.content}
            </p>
            <div className={`time ${dir}`}>{time.toLocaleString()}</div>
        </div>
    )
}

export default Message;