import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./TaskList.css";

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

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [sideContainerContent, setSideContainerContent] = useState(
    "Your side container content goes here"
  );

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    //     <div style={{ width: '70%', marginLeft: '15%', textAlign: 'left' }}>
    //   <button
    //     style={{
    //       cursor: 'pointer',
    //       fontSize: '17px',
    //       borderRadius: '5px',
    //       boxShadow: '#1890ff 0px 4px 16px 0px',
    //       backgroundColor: '#1890ff',
    //       color: 'white',
    //       border: 'none',
    //       height: '40px',
    //       width: '130px',
    //     }}
    //   >
    //     Edit Profile
    //   </button>

    //   <div style={{ marginTop: '30px' }}>
    //     <label htmlFor="addTask">Add Task</label>
    //     <input type="text" id="addTask" />
    //     <button
    //       style={{
    //         cursor: 'pointer',
    //         fontSize: '17px',
    //         borderRadius: '5px',
    //         boxShadow: '#1890ff 0px 4px 16px 0px',
    //         backgroundColor: '#1890ff',
    //         color: 'white',
    //         border: 'none',
    //         height: '40px',
    //         width: '130px',
    //       }}
    //     >
    //       Submit
    //     </button>
    //   </div>
    // </div>

    <div id="taskmain">
      <div className="container">
        <div className="columns is-centered is-mobile">
          
          <input
            type="text"
            className="taskinput"
            placeholder="Add Task"
            style={{
              cursor: "pointer",
              fontSize: "17px",
              color: "white",
              border: "none",
              height: "50px",
            }}
          />
          <button
            className="submit"
            style={{
              cursor: "pointer",
              fontSize: "17px",

              boxShadow: "#1890ff 0px 4px 16px 0px",
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
              height: "50px",
              width: "130px",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskList;
