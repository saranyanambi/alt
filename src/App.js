import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import Navbar from './Components/Navbar/Navbar';
import TaskBoard from "./Components/Task/Taskbuddy.jsx"
import Taskboard from './Components/Task2/Task2.jsx';
import Board from './Components/Board/Board.jsx';
import { TaskProvider } from "./Components/TaskContext.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {
  const [filters, setFilters] = useState({ category: "All", dueDate: "" });
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
      <TaskProvider>
      <Router>
      <Navbar onFilterChange={setFilters} />

        <Routes>
          <Route path="/list" element={<Taskboard filters={filters}/>} />
          <Route path="/board" element={<Board filters={filters}/>} />
          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </Router>
      </TaskProvider>

      {/* <Navbar/> */}
    </div>
  );
}

export default App;
