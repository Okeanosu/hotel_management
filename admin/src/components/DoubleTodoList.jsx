import React, { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Fab,
} from "@mui/material";
import { Add, Delete, Edit, Save, Cancel } from "@mui/icons-material";

const DoubleTodoList = ({ nameKey, nameValue, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({ [nameKey]: "", [nameValue]: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState({ [nameKey]: "", [nameValue]: "" });

  const clickAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ [nameKey]: "", [nameValue]: "" });
  };

  const clickEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  const clickSaveTask = () => {
    if (editIndex >= 0) {
      const newTasks = [...tasks];
      newTasks[editIndex] = editTask;
      setTasks(newTasks);
      setEditIndex(-1);
      setEditTask({ [nameKey]: "", [nameValue]: "" });
    }
  };

  const clickCancelEdit = () => {
    setEditIndex(-1);
    setEditTask({ [nameKey]: "", [nameValue]: "" });
  };

  const clickDeleteTask = (index) => {
    setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
  };

  return (
    <>
      <TextField
        value={newTask[nameKey]}
        onChange={(e) => setNewTask({ ...newTask, [nameKey]: e.target.value })}
        label={`New ${nameKey}`}
        variant="outlined"
        size="small"
        sx={{ width: 200, mr: 1 }}
      />
      <TextField
        value={newTask[nameValue]}
        onChange={(e) =>
          setNewTask({ ...newTask, [nameValue]: e.target.value })
        }
        label={`New ${nameValue}`}
        variant="outlined"
        size="small"
        sx={{ width: 500, mr: 1 }}
      />

      <Fab color="primary" size="small" onClick={clickAddTask}>
        <Add />
      </Fab>

      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} sx={{ maxWidth: "730px" }}>
            {editIndex === index ? (
              <Box>
                <TextField
                  value={editTask[nameKey]}
                  onChange={(e) =>
                    setEditTask({ ...editTask, [nameKey]: e.target.value })
                  }
                  label={`Edit ${nameKey}`}
                  variant="outlined"
                  size="small"
                  sx={{ width: 200, mr: 1 }}
                />

                <TextField
                  value={editTask[nameValue]}
                  onChange={(e) =>
                    setEditTask({ ...editTask, [nameValue]: e.target.value })
                  }
                  label={`Edit ${nameValue}`}
                  variant="outlined"
                  size="small"
                  sx={{ width: 400, mr: 1 }}
                />
              </Box>
            ) : (
              <ListItemText
                primary={task[nameKey]}
                secondary={task[nameValue]}
                sx={{ width: 200 }}
              />
            )}

            <ListItemSecondaryAction sx={{ display: "flex", gap: "10px" }}>
              {editIndex === index ? (
                <>
                  <Fab color="success" size="small" onClick={clickSaveTask}>
                    <Save />
                  </Fab>
                  <Fab
                    color="secondary"
                    size="small"
                    onClick={clickCancelEdit}
                  >
                    <Cancel />
                  </Fab>
                </>
              ) : (
                <>
                  <Fab
                    color="primary"
                    size="small"
                    onClick={() => clickEditTask(index)}
                  >
                    <Edit />
                  </Fab>
                  <Fab
                    color="primary"
                    size="small"
                    onClick={() => clickDeleteTask(index)}
                  >
                    <Fab color="error" size="small">
                      <Delete />
                    </Fab>
                  </Fab>
                </>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default DoubleTodoList;
