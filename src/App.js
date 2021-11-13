import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';
import Protected from './components/auth/Protected';
import { oktaAuthConfig, oktaSignInConfig } from './config';

const oktaAuth = new OktaAuth(oktaAuthConfig);

function App() {
  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri, window.location.origin), { replace: true });
  };

  return (
    <Router>
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={customAuthHandler}
        restoreOriginalUri={restoreOriginalUri}
      >
        <div className="App">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/staff" element={<Staff />} />
            <SecureRoute path='/protected' component={Protected} />
            <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
            <Route path='/login/callback' component={LoginCallback} />
          </Routes>
        </div>
      </Security>
    </Router>
  );
}

export default App;
