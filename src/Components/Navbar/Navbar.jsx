// import { useState } from "react";
// import { TextField, Select, MenuItem, Box, Button ,FormControl,InputLabel} from "@mui/material";
// import { Search } from "@mui/icons-material";
// import {
 
//   InputAdornment

// } from "@mui/material";
// import { useTasks } from "../TaskContext";
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { Link, useLocation } from "react-router-dom";

// import { ViewList, ViewModule } from "@mui/icons-material";

// const Navbar = ({ onFilterChange }) => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedDueDate, setSelectedDueDate] = useState("");
//   const location = useLocation();


//   const handleFilterChange = () => {
//     onFilterChange({ category: selectedCategory, dueDate: selectedDueDate });
//   };

//   return (
//     <Box sx={{ display: "flex", alignItems: "flex-start",flexDirection:"column", justifyContent:"space-between",backgroundColor: "#f8f9fa" }}>
//         <Box>
//             <img src="/task_icon.png"/>
//             <span>Taskbuddy</span>
//         </Box>
//          <Box sx={{ display: "flex",backgroundColor: "#f8f9fa" }}>
//       <Button
//         component={Link}
//         to="/list"
//         startIcon={<ViewList />}
//         variant={location.pathname === "/list" ? "contained" : "text"}
//       >
//         List
//       </Button>

//       <Button
//         component={Link}
//         to="/board"
//         startIcon={<ViewModule />}
//         variant={location.pathname === "/board" ? "contained" : "text"}
//       >
//         Board
//       </Button>
//     </Box>
//     <Box sx={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
//     <Box sx={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
        
//       <Box>Filter by:</Box>

     
//     <Box>
      
//       <FormControl fullWidth variant="outlined" size="small">
//       <InputLabel>Category</InputLabel>
//       <Select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         label="Category"
//         displayEmpty
//       >
//         <MenuItem value="" disabled>
//           Category
//         </MenuItem>
//         <MenuItem value="All">All</MenuItem>
//         <MenuItem value="Work">Work</MenuItem>
//         <MenuItem value="Personal">Personal</MenuItem>
//       </Select>
//     </FormControl>

//     </Box>
    
//       <TextField
//         type="date"
//         value={selectedDueDate}
//         onChange={(e) => setSelectedDueDate(e.target.value)}
//       />
      

//       <Button variant="contained" onClick={handleFilterChange}>
//         Apply Filters
//       </Button>
//       </Box>

//       <Box>
//         <Box>
//       <TextField
          
//           size="small"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="start">
//                  <Search  />
//               </InputAdornment>
//             ),
//           }}
//           placeholder="Search"
//           name="search"
          
//         />
//         </Box>
//         <Box>
//           <Button size="small" backgroundColor="secondary">
//         Add Task
//       </Button>
//       </Box>
//         </Box>
//         </Box>
//     </Box>
//   );
// };

// export default Navbar;







import { useState } from "react";
import { TextField, Select, MenuItem, Box, Button, FormControl, InputLabel } from "@mui/material";
import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ViewList, ViewModule } from "@mui/icons-material";

const Navbar = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const location = useLocation();

  const handleFilterChange = () => {
    onFilterChange({ category: selectedCategory, dueDate: selectedDueDate });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, backgroundColor: "#f8f9fa" }}>
      
      {/* Logo and Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <img src="/task_icon.png" alt="Task Icon" width={30} height={30} />
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Taskbuddy</span>
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button component={Link} to="/list" startIcon={<ViewList />} variant={location.pathname === "/list" ? "contained" : "text"}>
          List
        </Button>
        <Button component={Link} to="/board" startIcon={<ViewModule />} variant={location.pathname === "/board" ? "contained" : "text"}>
          Board
        </Button>
      </Box>

      {/* Filter and Search Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: 2 }}>
        
        {/* Filter Options */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ fontWeight: "bold" }}>Filter by:</Box>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} label="Category">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
            </Select>
          </FormControl>

          <TextField type="date" size="small" value={selectedDueDate} onChange={(e) => setSelectedDueDate(e.target.value)} sx={{ minWidth: 180 }} />

          <Button variant="contained" onClick={handleFilterChange}>
            Apply Filters
          </Button>
        </Box>

        {/* Search & Add Task */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200, borderRadius: 20 }}
          />

          <Button variant="contained" sx={{ backgroundColor: "#6a1b9a", borderRadius: 20, color: "#fff", px: 3 }}>
            ADD TASK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
