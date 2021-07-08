import { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home/index';
import auth from './services/auth';

function App() {
  const [user, setUser] = useState(false);
  const [userVerify, setUserVerify] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(async () => {
    const userL = localStorage.getItem('user');
    setUser(userL);
    if (user) {
      const userV = await auth.verifyUser();
      setUserName(userV.username);
      userV.status === 200 ? setUserVerify(true) : setUserVerify(false);
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          {userVerify ? (
            <>
              <Route exact path="/home">
                <Home user={userName} setUser={setUser} />
              </Route>
              <Redirect to={'/home'} />
            </>
          ) : (
            <>
              <Route path="/">
                <Login setUser={setUser} />
                <Redirect to={'/'} />
              </Route>
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
