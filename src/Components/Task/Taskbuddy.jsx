import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

const TaskBoard = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  const [tasks, setTasks] = useState({
    todo: [
      { id: uuidv4(), title: "Interview with Design Team", due: "Today", status: "TO-DO", category: "Work" },
      { id: uuidv4(), title: "Team Meeting", due: "30 Dec, 2024", status: "TO-DO", category: "Personal" },
      { id: uuidv4(), title: "Design a Dashboard page along with wireframes", due: "31 Dec, 2024", status: "TO-DO", category: "Work" },
    ],
    inProgress: [
      { id: uuidv4(), title: "Morning Workout", due: "Today", status: "IN-PROGRESS", category: "Work" },
      { id: uuidv4(), title: "Code Review", due: "Today", status: "IN-PROGRESS", category: "Personal" },
      { id: uuidv4(), title: "Update Task Tracker", due: "25 Dec, 2024", status: "IN-PROGRESS", category: "Work" },
    ],
    completed: [
      { id: uuidv4(), title: "Submit Project Proposal", due: "Today", status: "COMPLETED", category: "Work" },
      { id: uuidv4(), title: "Birthday Gift Shopping", due: "Today", status: "COMPLETED", category: "Personal" },
      { id: uuidv4(), title: "Client Presentation", due: "25 Dec, 2024", status: "COMPLETED", category: "Work" },
    ],
  });
  const [newTask, setNewTask] = useState("");
  const [date,setDate]=useState("");
  const [category,setCategory]=useState("")
  const [show,setShow]=useState(false)
 
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = [...tasks[source.droppableId]];
    const destColumn = [...tasks[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);
    setTasks({ ...tasks, [source.droppableId]: sourceColumn, [destination.droppableId]: destColumn });
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = { id: uuidv4(), title: newTask, due: date, category: category, status: selectedStatus };
    setTasks({ ...tasks, [selectedStatus]: [...tasks[selectedStatus], task] });
    setNewTask("");
  };

  const deleteTask = (status, taskId) => {
    setTasks({ ...tasks, [status]: tasks[status].filter((task) => task.id !== taskId) });
  };

  return (
    <div style={{ padding: "20px" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([status, tasksList]) => (
          <Accordion key={status} defaultExpanded 
         >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}  sx={{
    backgroundColor: status === "todo" ? "##FAC3FF" : 
                     status === "inProgress" ? "#85D9F1" : 
                     status === "completed" ? "#CEFFCC" : "white"
  }}>
              <Box>{status.replace(/([A-Z])/g, " $1")} ({tasksList.length})</Box>
            </AccordionSummary>
            <AccordionDetails style={{backgroundColor:"#0000001A"}}>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                     {status === "todo" && (
                <div style={{ marginTop: "10px", display: "flex", gap: "10px",flexDirection:"column", alignItems:"flex-start"}}>
                 <Box>
                  <Button onClick={()=>setShow(!show)} variant="contained" color="primary" startIcon={<AddIcon />}>Add</Button>
                  </Box>
                  {show &&(<Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , flexDirection:"column"}}>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                    <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add new task"
                    style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                    </Box>

                    <Box>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Add Date"/>
                    </Box>

                    <Box >
                    <select onChange={(e)=>setSelectedStatus(e.target.value)}>
                    <option value="TODO">todo
                    </option>
                    <option value="inProgress">
                    inprogress
                    </option>
                    <option value="completed">
                    complete
                    </option>
                    </select>
                    </Box>

                    <Box>
                    <select onChange={(e)=>setCategory(e.target.value)}>
                    <option value="work">
                    work
                    </option>
                    <option value="personal">
                          personal
                    </option>
                    </select>
                    </Box>

                  </Box>
                  <Box>
                    <button onClick={addTask}>Add</button>
                    <button>cancel</button>
                  </Box>
                </Box>)}
                </div>
              )}
                    {tasksList.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ marginBottom: "10px" }}>
                            
                            
                            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , borderBottom: "1px solid grey" }}>
                            <div style={{ display: "flex", flexDirection: "row" ,alignItems:"center",justifyContent:"space-evenly",flexGrow: 1 }}>
   <Box>

    
    <Box sx={{display:"flex",alignItems:"center" ,maxWidth:400}}> <Checkbox {...label} /><Typography variant="subtitle1">{task.title}</Typography>
    </Box></Box>
    <Box><Typography variant="body2" color="textSecondary">Due: {task.due}</Typography></Box>
    <Box><Typography variant="caption" color="primary">{task.category}</Typography></Box>
  </div>
                              <IconButton onClick={() => deleteTask(status, task.id)} color="secondary">
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
             
            </AccordionDetails>
          </Accordion>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;



