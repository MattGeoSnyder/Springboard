import { Link, useNavigate } from 'react-router-dom';
import hero from '../../assets/images/hero-section.jpg';
import couple from '../../assets/images/couple.svg';
import hatersProfile from '../../assets/images/haters-profile.png';
import hatersChat from '../../assets/images/haters-chat.png';
import './Home.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Home = () => {
  const userId = useSelector(state => state.user.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate(`/users/${userId}`);
    }
  }, [userId]);

  return (
    <div id="home">
      <section id='hero'>
        <img src={couple}/>
        <div>
          <h1>Find your love with hate</h1>
          <p>Find your perfect match from your dislikes, gripes, and pet peeves</p>
        </div>
      </section>
      <section id='profile'>
        <div>
          <h1>Create your profile</h1>
          <p>Let them know what you don't want</p>
        </div>
        <img src={hatersProfile}/>
      </section>
      <section id='chat'>
        <img src={hatersChat} />
        <div>
          <h1>Chat Anytime</h1>
          <p>Get real time messages and notifications</p>
          <p>Backed by Chat GPT 3.5 so you always have someone to talk to</p>
          <button>
            <Link to={'/signup'}>
              Join today
            </Link>
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home;