import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Create context
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Load tasks from localStorage or initialize default tasks
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || {
    todo: [
      { id: uuidv4(), title: "Interview with Design Team", due: "Today", category: "Work" },
      { id: uuidv4(), title: "Team Meeting", due: "30 Dec, 2024", category: "Personal" },
    ],
    inProgress: [
      { id: uuidv4(), title: "Morning Workout", due: "Today", category: "Personal" },
      { id: uuidv4(), title: "Code Review", due: "Today", category: "Work" },
    ],
    completed: [
      { id: uuidv4(), title: "Submit Project Proposal", due: "Today", category: "Work" },
      { id: uuidv4(), title: "Birthday Gift Shopping", due: "Today", category: "Personal" },
    ],
  };

  const [tasks, setTasks] = useState(initialTasks);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for consuming the context
export const useTasks = () => useContext(TaskContext);
