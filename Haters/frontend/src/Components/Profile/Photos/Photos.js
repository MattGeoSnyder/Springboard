import PhotoInput from "./PhotoInput";
import './Photos.css';

const Photos = () => {

  //TODO: Move this out of here.

  return (
    <div id='photos'
      onClick={(e) => {}}
    >
      <PhotoInput name='photo1' photoLabel="Profile Photo" />
      <PhotoInput name='photo2' photoLabel="Photo 2" />
      <PhotoInput name='photo3' photoLabel="Photo 3" />
    </div>
  )
}

export default Photos;