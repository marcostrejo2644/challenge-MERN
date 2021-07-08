import Login from '../pages/Login';
import Home from '../pages/Home/index';

export default function home({ user }) {
  if (user) {
    return <Home></Home>;
  } else {
    return <Login></Login>;
  }
}
