import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import lenotesScfreen from './lenotesScfreen.png'
import icontns from './icontns.png'

const Home = () => {

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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppNavbar/>
      <div>
        <div id="about">
          <section className="landing-page">
            <section className="px-0 py-4 [background:#84A1BE]">
              <div className="max-w-[800px] mx-auto px-6 py-0">
                <div className="text-center">
                  <h1 className=
                  "font-bold text-[2rem] leading-[1.1] tracking-[-0.03rem] mt-8 mb-0 md:text-5xl text-neutral-700"
                  >
                  Take Your Notes!
                  </h1>
                </div>
              </div>
            </section>
            <section className="px-0 py-4 [background:#84A1BE]">
              <div className="max-w-[800px] mx-auto px-6 py-0">
                <div className="features">
                  <h2 className="text-center text-[1.6rem] mt-0 md:text-[2rem] text-neutral-700">
                    Features
                  </h2>
                    <ul className="text-neutral-700 leading-[1.6] text-[1.1rem]">
                      <li className="text-neutral-700 leading-[1.6] text-[1.1rem]">
                        <strong>Plain text notes</strong>
                          - with no formatting or fluff to get in the way
                      </li>
                      <li className="text-neutral-700 leading-[1.6] text-[1.1rem]">
                        <strong>Secure</strong>
                          - MFA required to create account and login
                      </li>
                      <li className="text-neutral-700 leading-[1.6] text-[1.1rem]">
                        <strong>Search Notes</strong>
                        - easily search all notes
                      </li>
                      <li className="text-neutral-700 leading-[1.6] text-[1.1rem]">
                        <strong>FAST</strong>
                        - LeNotes works as fast as you do
                      </li>
                    </ul>
                </div>
              </div>
              <div className="max-w-[1200px] mx-auto px-6 py-0 mt-8 mb-8">
                <img
                  className="max-w-full h-auto"
                  alt="TakeNote App"
                  src={lenotesScfreen}
                />
              </div>
            </section>
            <footer className="text-center text-white px-0 py-4 md:px-0 md:py-4 [background:#1D232A]">
              <div className="max-w-[800px] mx-auto px-6 py-0">
                <img
                  className="block h-[50px] w-[50px] mt-4 mb-4 mx-auto md:h-[100px] md:w-[100px] md:mb-4"
                  alt="TakeNote App"
                  src={icontns}
                />
                <p className="leading-[1.6] text-white text-[1.1rem]">
                  <strong>LeNotes</strong>
                </p>
                <nav className="flex items-center justify-center mb-6">
                  <a
                    className="text-[rgba(255,255,255,0.8)] no-underline font-semibold mx-3 my-0 hover:text-white"
                    rel="noopener noreferrer"
                    href="https://github.com/plaseo/lenotes"
                  >
                    Source
                  </a>
                  <a
                    className="text-[rgba(255,255,255,0.8)] no-underline font-semibold mx-3 my-0 hover:text-white"
                    rel="noopener noreferrer"
                    href="https://github.com/plaseo/lenotes/issues"
                  >
                    Issues
                  </a>
                </nav>
              </div>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
