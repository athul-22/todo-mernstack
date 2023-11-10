import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./TaskList.css";
import BodyNoTask from "../images/boynotask.png";
import TaskItem from "./TaskItem";
import toast from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [addNewTask, setAddNewTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  // const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const addTaskFun = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error("Task is empty");
      return;
    }
    try {
      const { data } = await axios.post("/api/tasks", { title: newTask });
      setTaskList([data, ...taskList]);
      toast.success("Task added successfully");
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks/mytasks");
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted successfully");
      setTaskList(taskList.filter((task) => task._id != id));
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAddTask = () => {
  //   if (task) {
  //     setTasks([...tasks, task]);
  //     setTask("");
  //   }
  // };

  const handleCheckboxClick = async (task) => {
    try {
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !task.isCompleted,
      });
      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="taskmain" style={{ overflowY: "hidden" }}>
      <div className="container">
        <div className="columns is-centered is-mobile">
          <div>
            {taskList.length > 0 ? (
              <table>
                {
                  <tbody>
                    {taskList.map((task) => (
                      <tr className="task-list" key={task._id}>
                        <td
                          className="task-item"
                          style={{ display: "flex", paddingTop: "5px" }}
                        >
                          {/* <input
                            className="task-checkbox"
                            type="checkbox"
                            checked={isCompleted}
                            onChange={handleCheckboxClick}
                            onClick={handleCheckboxClick(task.id)}
                          /> */}

                          <div
                            onChange={() => handleCheckboxClick(task)}
                            role="checkbox"
                            aria-checked
                          >
                            <input
                              className="task-checkbox"
                              type="checkbox"
                              checked={task.isCompleted}
                              disabled={isLoading}
                              readOnly
                              tabIndex={-1}
                            
                            />
                          </div>

                          <p
                            className="task-title"
                            style={{
                              textDecoration: task.isCompleted
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.title}
                          </p>
                        </td>
                        <td>
                          {/* <button onClick={() => deleteTask(task._id)} className="task-delete-btn">
                          Delete
                        </button> */}
                          <ClearIcon
                            className="task-delete-btn"
                            onClick={() => deleteTask(task._id)}
                            style={{
                              color: "black",
                              backgroundColor: "#f5f5f5",
                              alignContent: "center",
                              fontSize: "10px",
                              marginRight: "20px",
                              height: "35px",
                              width: "35px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "-200px",
                    marginBottom: "100px",
                  }}
                >
                  <img src={BodyNoTask} height="300px" width="300px" />
                  <br />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "grey",
                  }}
                >
                  No Taskes are found!
                </p>
              </div>
            )}
          </div>

          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task Title"
            type="text"
            className="taskinput"
            // placeholder="Add Task"
            style={{
              cursor: "pointer",
              fontSize: "17px",
              color: "white",
              border: "none",
              height: "50px",
            }}
          />
          <button
            onClick={addTaskFun}
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
