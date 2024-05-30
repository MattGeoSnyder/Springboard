import { useState } from 'react';
import SignupCarousel from "./SignupCarousel";
import SignupForm from "./SignupForm";
import './Signup.css';

const Signup = () => {

    const [ page, setPage ] = useState(0);

    return (
        <div id="signup-container">
            <SignupCarousel page={page}/>
            <SignupForm page={page} setPage={setPage}/>
        </div>
    )
}

export default Signup;