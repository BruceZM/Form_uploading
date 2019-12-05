import React,{ useState } from 'react';
import './App.css';
import Content from './pages/content'
import LoginForm from './pages/login'

const App = () => {

  const [logState,setLogState] = useState(localStorage.getItem('upload_token') || false);

  const handleLogout = () => {
    localStorage.removeItem('upload_token');
    setLogState(localStorage.getItem('upload_token') || false);
  }

  const handleLogin = () => {
    setLogState(localStorage.getItem('upload_token') || false);
  }
  return (
    <div className="App">
        {
          logState?
          <Content handleLogout={handleLogout}/>
          :
          <LoginForm handleLogin={handleLogin}/>
        }    
    </div>
  );
}

export default App;
