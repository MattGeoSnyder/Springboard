import { useSelector, useDispatch } from 'react-redux';
import { setOverlayActive } from '../../../store/reducers/overlay';
import './Overlay.css';

const Overlay = () => {
  const dispatch = useDispatch();

  const active = useSelector(state => state.overlay.active);
  const image = useSelector(state => state.overlay.image);

  const disableOverlay = (e) => {
    e.stopPropagation();
    dispatch(setOverlayActive(false));
  } 

  const disableMouseWheel = (e) => {
    return;
  }

  return (
    <>
      {active && <div id='overlay' onClick={disableOverlay} onWheel={disableMouseWheel}>
        <img src={image}/>
      </div>}
    </>
  )
}

export default Overlay;