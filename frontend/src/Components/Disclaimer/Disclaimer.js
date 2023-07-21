import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Disclaimer.css'

const Disclaimer = () => {
  const userId = useSelector(state => state.user.user.id);

  return (
    <div id="disclaimer-page">
      <div id="main-body">
        <h1>
          A Quick Disclaimer
        </h1>
        <p>
          Haters is a portfolio project not intended for actual use. This app is seeded with bot users to demonstrate all of the features. 
        </p>
        <p>
          These bots should be easy to identify. Upon signing up, you'll be matched with an AI companion
          that will keep you company and demonstrate the messaging features.
        </p>
        <p>
          While this app is intended to be a portfolio project, on the off-chance that you do talk with another person, always be kind. Haters is meant to
          be a light hearted concept, not a place for actual hate.
        </p>
        <div id="signature">
          <p>Hater's Creator</p>
          <p>-Matt</p>
        </div>
        <div id='link-bar'>
          <Link to={`/users/${userId}/profile`}>I understand, let's go <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer;