import { Link } from "react-router-dom";
import './Nav.css';

const Nav = () => {
  return (
  <div id='Nav'>
    <h1>Microblog</h1>
    <p>Get in the Rithm of blogging!</p>
    <Link to='/'>Blog</Link>
    <Link to='/new'>New</Link>
  </div>
  )
}

export default Nav;