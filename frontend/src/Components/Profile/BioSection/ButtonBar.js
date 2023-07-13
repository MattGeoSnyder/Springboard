import './ButtonBar.css';

const ButtonBar = () => {
  return (
    <div id="button-bar">
      <div id="dislike"><i className="fa-regular fa-thumbs-down"></i></div>
      <div id="like"><i className="fa-regular fa-thumbs-up"></i></div>
    </div>
  )
}

export default ButtonBar;