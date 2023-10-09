import { Link } from 'react-router-dom';

// TODO render log out button once useSession is implemented
export function LoginButton() {
  return <Link to="/login">Log in</Link>;
}
