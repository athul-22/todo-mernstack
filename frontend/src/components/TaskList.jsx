import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

function TaskList() {
  const [taskList, setTaskList] = useState([]);

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks/myTasks");
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ width: '70%', marginLeft: '15%', textAlign: 'left' }}>
  <button
    style={{
      cursor: 'pointer',
      fontSize: '17px',
      borderRadius: '5px',
      boxShadow: '#1890ff 0px 4px 16px 0px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      height: '40px',
      width: '130px',
    }}
  >
    Edit Profile
  </button>

  <div style={{ marginTop: '30px' }}>
    <label htmlFor="addTask">Add Task</label>
    <input type="text" id="addTask" />
    <button
      style={{
        cursor: 'pointer',
        fontSize: '17px',
        borderRadius: '5px',
        boxShadow: '#1890ff 0px 4px 16px 0px',
        backgroundColor: '#1890ff',
        color: 'white',
        border: 'none',
        height: '40px',
        width: '130px',
      }}
    >
      Submit
    </button>
  </div>
</div>

  );
}

export default TaskList;
