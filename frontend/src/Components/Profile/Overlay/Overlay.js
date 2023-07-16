import { useSelector, useDispatch } from 'react-redux';
import { setOverlayActive } from '../../../store/reducers/overlay';
import MatchOverlay from './MatchOverlay';
import './Overlay.css';
import { setContent } from '../../../store/reducers/hatesSidebar';

const Overlay = () => {
  const dispatch = useDispatch();

  const active = useSelector(state => state.overlay.active);
  const image = useSelector(state => state.overlay.image);
  const mode = useSelector(state => state.overlay.mode);

  const disableOverlay = (e) => {
    console.log(e.target);
    dispatch(setOverlayActive({ active: false }));
  } 

  const disableMouseWheel = (e) => {
    return;
  }

  const render = () => {
    if (!active) return <></>

    let content;
    if (mode === 'match') {
      content = <MatchOverlay />
    } else {
      content = <img src={image} />
    }

    return (
      <div id='overlay' onClick={disableOverlay} onWheel={disableMouseWheel}>
        {content}
      </div>
    )
  }

  return (
    <>
      {render()}
    </>
  )
}

export default Overlay;