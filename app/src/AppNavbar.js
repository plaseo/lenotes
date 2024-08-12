import React, { useState, useEffect } from 'react';
import './Home'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logoTransp from './logoTransp.png'

const AppNavbar = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [cookies] = useCookies(['XSRF-TOKEN']); 

  useEffect(() => {
    setLoading(true);
    fetch('api/user', { credentials: 'include' })
      .then(response => response.text())
      .then(body => {
        if (body === '') {
          setAuthenticated(false);
        } else {
          setUser(JSON.parse(body));
          setAuthenticated(true);
        }
        setLoading(false);
      });
  }, [setAuthenticated, setLoading, setUser])
  
  const login = () => {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    window.location.href = `//${window.location.hostname}${port}/api/private`;
  }

  const logout = () => {
    fetch('/api/logout', {
      method: 'POST', credentials: 'include',
      headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] } 
    })
      .then(res => res.json())
      .then(response => {
        window.location.href = `${response.logoutUrl}?id_token_hint=${response.idToken}`
          + `&post_logout_redirect_uri=${window.location.origin}`;
      });
  }
  const button = authenticated ?
    <div>
      <button color="primary" onClick={logout}>Logout</button>
    </div> : 
    <button color="primary" onClick={login}>Login</button>;
  
  const button2 = authenticated ?
      <li><button color="link"><Link to="/notes">View Notes</Link></button></li>
      :
      <div hidden></div>

  const message = user ?
  <h2>Welcome, {user.name}!</h2> :
  <p>Login to view LeNotes</p>;

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#FFB71B">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>{message}</li>
              <li><a href='/'>Home</a></li>
              {button2}
              <li><button>{button}</button></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a href='/notes' className="btn btn-ghost"><img className='h-10 w-50' src={logoTransp} /></a>
        </div>
        <div className="navbar-end">
          <a href='/notes/new' className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFB71B"
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="round">
              <path
              d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"/>
              <path
              d="M14 3v5h5M18 21v-6M15 18h6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
