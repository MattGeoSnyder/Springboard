import { useState, useEffect } from 'react';
import './SignupCarousel.css';
import couple from '../../assets/images/couple_1.jpg';
import heart from '../../assets/images/heart.jpg';
import date from '../../assets/images/online_date.jpg';


// background image link
// https://img.freepik.com/free-vector/fire-background-design_1189-229.jpg?w=826&t=st=1687137525~exp=1687138125~hmac=6d617c02cf15b312dc6882e055271aecbd3d96f036c995202d59460c51398bc6

const SignupCarousel = ({ page }) => {

  const [ lefts, setLefts ] = useState([0, 200, 400]);

  useEffect(() => {
    setLefts([10, 210, 410].map(val => val - (200 * page)));
  },[page])

  return (
    <div id='signup-carousel'>
        <div className='carousel-item' style={{left: `${lefts[0]}%`}}>
          <img src={date}/>
        </div>
        <div className='carousel-item' style={{left: `${lefts[1]}%`}}>
          <img src={heart}/>
        </div>
        <div className='carousel-item' style={{left: `${lefts[2]}%`}}>
          <img src={couple}/>
        </div>
    </div>
  )
}

export default SignupCarousel;