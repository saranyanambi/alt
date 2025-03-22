import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import TaskBoard from "./Components/Task/Taskbuddy.jsx"
import Taskboard from './Components/Task2/Task2.jsx';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TaskBoard/>
      <Taskboard/>
      {/* <Navbar/> */}
    </div>
  );
}

export default App;
