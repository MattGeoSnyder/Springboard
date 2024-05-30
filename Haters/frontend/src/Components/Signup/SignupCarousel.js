import { useState, useEffect } from 'react';
import './SignupCarousel.css';
import promise from '../../assets/images/promise-day.svg';
import kiss from '../../assets/images/forehead-kiss.svg';
import hug from '../../assets/images/hug-day.svg';


// background image link
// https://img.freepik.com/free-vector/fire-background-design_1189-229.jpg?w=826&t=st=1687137525~exp=1687138125~hmac=6d617c02cf15b312dc6882e055271aecbd3d96f036c995202d59460c51398bc6

const SignupCarousel = ({ page }) => {

  const [ lefts, setLefts ] = useState([0, 100, 200]);

  useEffect(() => {
    setLefts([0, 100, 200].map(val => val - (100 * page)));
  },[page])

  return (
    <div id='signup-carousel'>
        <div className='carousel-item' style={{left: `${lefts[0]}%`}}>
          <img src={promise}/>
        </div>
        <div className='carousel-item' style={{left: `${lefts[1]}%`}}>
          <img src={kiss}/>
        </div>
        <div className='carousel-item' style={{left: `${lefts[2]}%`}}>
          <img src={hug}/>
        </div>
    </div>
  )
}

export default SignupCarousel;