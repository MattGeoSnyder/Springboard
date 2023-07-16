import './Message.css';

const Message = ({ message }) => {
    return (
        <div className="message">
            {message.content}
        </div>
    )
}

export default Message;