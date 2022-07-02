import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <header>
      <div>
        <button type="button" className="NavSandwich">
          <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.172974" width="20" height="3" rx="1.5" fill="#000000"></rect>
            <rect x="0.172974" y="7" width="20" height="3" rx="1.5" fill="#000000"></rect>
            <rect x="0.172974" y="14" width="20" height="3" rx="1.5" fill="#000000"></rect>
            </svg>
        </button>
        <button>
          INFO
        </button>
        <center>
          Welcome to Squordle!
        </center>
        <button style={{textAlign: "right"}}>
          OPTIONS
        </button>
      </div>
    </header>
  );
}

export default App;
