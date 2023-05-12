import { Link } from "react-router-dom";

const Nav = () => {
  return (
  <div>
    <h1>Microblog</h1>
    <p>Get in the Rithm of blogging!</p>
    <Link to='/'>Blog</Link>
    <Link to='/new'>New</Link>
  </div>
  )
}

export default Nav;