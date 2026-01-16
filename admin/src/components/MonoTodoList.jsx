import { useState } from "react";
import { Box, TextField, IconButton, Fab } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const MonoTodoList = ({ label, tasks, setTasks }) => {
  const [newTasks, setNewTasks] = useState("");

  const clickAddTask = () => {
    if (newTasks.trim()) {
      setTasks([...tasks, newTasks]);
      setNewTasks("");
    }
  };

  const clickDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <Box>
        <TextField
          value={newTasks}
          onChange={(e) => setNewTasks(e.target.value)}
          label={`New ${label}`}
          variant="outlined"
          size="small"
          sx={{ minWidth: "500px", margin: "0 16px 10px 0" }}
        />
        <IconButton onClick={clickAddTask}>
          <Add />
        </IconButton>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <IconButton onClick={() => clickDeleteTask(index)}>
                <Delete />
              </IconButton>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default MonoTodoList;
