import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function Test() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TEST METY 
        </p>
        <Link to=""> 
          <p>mety</p>
        </Link>
      </header>
    </div>
  );
}

export default Test;
