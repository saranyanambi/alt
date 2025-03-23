import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, Typography, Box, Button, MenuItem, Select } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../TaskContext.jsx";



const Board = ({filters}) => {
     const { tasks, setTasks } = useTasks();
//   const [tasks, setTasks] = useState(initialTasks);
//   const [filterCategory, setFilterCategory] = useState("All");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = [...tasks[source.droppableId]];
    const destColumn = [...tasks[destination.droppableId]];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);
    setTasks({ ...tasks, [source.droppableId]: sourceColumn, [destination.droppableId]: destColumn });
  };

  return (
    <Box sx={{ padding: 2 }}>
      

      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {Object.entries(tasks).map(([status, taskList]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ width: 300, background: "#f4f4f4", padding: 2, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ backgroundColor: status === "todo" ? "#FAC3FF" : status === "inProgress" ? "#85D9F1" : "#CEFFCC", padding: 1 }}>
                    {status.toUpperCase()}
                  </Typography>

                  {taskList.filter(task =>filters.category === "All" || task.category === filters.category).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ marginTop: 1, padding: 1 }}>
                          <CardContent>
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"space-between"}}>
                            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <Box variant="subtitle1">{task.title}</Box>
                            <Box>
                                        {/* <select name="plan" id="plan">
                                            
                                            <option value="" selected><img src="./more_icon.svg"/> </option>
                                            <option value="edit">Edit</option>
                                            <option value="delete">Delete</option>
                                        </select> */}
                                        
                                        </Box>
                           </Box>
                        
                            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                <Box>{task.category} </Box>
                                <Box>{task.due}</Box>
                            </Box>

                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Board;
