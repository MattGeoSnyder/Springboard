import './UserIcon.css';

const UserIcon = ({ mode, user }) => {
  const image = user.photos.photo1?.image_url;
  const first_name = user.first_name;

  const render = () => {
    if (image) {
      return (<img src={image} alt='' />)
    } else {
      return (<span>{first_name ? first_name[0] : ''}</span>);
    }
  }

  // User icon is either profile image or first letter of their name
  // passed different mode class for styling.
  return (
    <div className={`user-icon ${mode}`}>
      {render()}
    </div>
  )
}

export default UserIcon;

