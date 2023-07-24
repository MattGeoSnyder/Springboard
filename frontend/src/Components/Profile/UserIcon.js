import './UserIcon.css';

const UserIcon = ({ mode, user }) => {
  const image = user.photos.photo1?.image_url;
  const first_name = user.first_name;

  const render = () => {
    if (image) {
      return (<img src={image}/>)
    } else {
      return (<span>{first_name[0]}</span>);
    }
  }

  return (
    <div className={`user-icon ${mode}`}>
      {render()}
    </div>
  )
}

export default UserIcon;

