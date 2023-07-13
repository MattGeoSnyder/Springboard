import PhotoInput from "./PhotoInput";
import './Photos.css';

const Photos = () => {


  return (
    <div id='photos'>
      <PhotoInput name='photo1' photoLabel="Profile Photo" />
      <PhotoInput name='photo2' photoLabel="Photo 2" />
      <PhotoInput name='photo3' photoLabel="Photo 3" />
    </div>
  )
}

export default Photos;