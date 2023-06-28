import PhotoInput from "./PhotoInput";
import { useSelector } from "react-redux";
import './Photos.css';

const Photos = () => {
  const username = useSelector(state => state.user.user.username);

  return (
    <div id='photos'>
      <PhotoInput name='photo1' username={username} photoLabel="Profile Photo" />
      <PhotoInput name='photo2' photoLabel="Photo 2" />
      <PhotoInput name='photo3' photoLabel="Photo 3" />
    </div>
  )
}

export default Photos;