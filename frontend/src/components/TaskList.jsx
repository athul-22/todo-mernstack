/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskList.css";
import BodyNoTask from "../images/boynotask.png";
import toast from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TaskModal from "./TaskModal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priority, setPriority] = useState("n");
  const [datetimeval, setDateTimeVal] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("n");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([])

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    // Handle button click
  };

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
      const formattedDate = dayjs(datetimeval).format("YYYY-MM-DD");
      const formattedTime = dayjs(datetimeval).format("HH:mm:ss.SSS[Z]");

      const { data } = await axios.post("/api/tasks", {
        title: newTask,
        priority: priority,
        datetime: datetimeval,
        datenew: formattedDate,
        timenew: formattedTime,
      });

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

  // const deleteTask = async (id) => {
  //   try {
  //     await axios.patch(`/api/tasks/${id}`);
  //     // toast.success("Task deleted successfully");
  //     toast.success("Task deleted successfully");
  //     setTaskList(taskList.filter((task) => task._id !== id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



  // const deleteTask = async (id) => {
  //   try {
  //     await axios.delete(`/api/tasks/${id}`);
  //     toast.success("Task deleted successfully");
  
  //     // Find the task in the taskList
  //     const deletedTask = taskList.find((task) => task._id === id);
  
  //     // Move the deleted task to the completed tasks section
  //     setCompletedTasks([deletedTask, ...completedTasks]);
  
  //     // Remove the task from the main taskList
  //     setTaskList(taskList.filter((task) => task._id !== id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/move-to-completed/${id}`);
      toast.success("Task Removed successfully");
      // Remove the task from the main taskList (optional, as the backend already handles it)
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  
  

  const handleCheckboxClick = async (clickedTask) => {
    setIsLoading(true);

    try {
      const updatedTasks = taskList.map((task) => {
        if (task._id === clickedTask._id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });

      await axios.put(`/api/tasks/${clickedTask._id}`, {
        completed: !clickedTask.isCompleted,
      });

      setTaskList(updatedTasks);

      await updateTaskCompletionStatus(
        clickedTask._id,
        !clickedTask.isCompleted
      );

      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);

      // Open the modal after updating the task
      handleTaskClick(clickedTask);
    }
  };

  const handleCloseIconClick = () => {
    // Close the modal when the close icon is clicked
    setIsModalOpen(false);

    // Optionally, you can perform additional actions here
  };

  const updateTaskCompletionStatus = async (taskId, isCompleted) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: isCompleted }),
      });
    } catch (error) {
      console.error("Error updating task completion status:", error);
      throw error;
    }
  };

  const handleChangeselectpriority = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ minHeight: "10%", display: "flex", flexDirection: "column" }}>
      <div className="filter">
        <InputLabel id="priority-filter-label" style={{ color: "white" }}>
          Priority
        </InputLabel>
        <Select
          labelId="priority-filter-label"
          id="demo-simple-select"
          value={priorityFilter}
          label="Priority"
          onChange={handleChangeselectpriority}
          style={{
            float: "right",
            marginRight: "450px",
            height: "50px",
            width: "auto",
            color: "white",
            marginTop: "-85px",
            backgroundColor: "#1890ff",
            border: "none",
            outline: "none",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "#1890ff 0px 4px 16px 0px",
          }}
        >
          <MenuItem value="">⚡️ All</MenuItem>
          <MenuItem value="h">🔺 HIGH</MenuItem>
          <MenuItem value="m">🔸 MEDIUM</MenuItem>
          <MenuItem value="l">❇️ LOW</MenuItem>
        </Select>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div>
          <div
            className="task-list-container"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
              height: "550px",
              overflowY: "scroll",
            }}
          >
            {taskList.length > 0 ? (
              <table>
                {
                  <tbody style={{ justifyContent: "center" }}>
                    {taskList
                      .filter((task) =>
                        priorityFilter ? task.priority === priorityFilter : true
                      )
                      .map((task) => (
                        <tr
                          className={`task-list ${
                            isHovered ? "hover-disabled" : ""
                          }`}
                          key={task._id}
                          // onClick={() => handleTaskClick(task)}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <td
                            className="task-item"
                            style={{ display: "flex", paddingTop: "5px" }}
                          >
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
                            <div onClick={() => handleTaskClick(task)}>
                              <p
                                className="task-title"
                                style={{
                                  textDecoration: task.isCompleted
                                    ? "line-through"
                                    : "none",
                                  color: task.isCompleted ? "grey" : "black",
                                  cursor: "pointer",
                                }}
                              >
                                {task.title}
                              </p>
                            </div>
                            <div
                              className={`priority-box ${task.priority}`}
                            ></div>
                          </td>

                          <td>
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
                <TaskModal
                  open={isModalOpen}
                  handleClose={handleCloseIconClick}
                  taskDetails={selectedTask}
                />
              </table>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "100px",
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
                  All Tasks are completed! 🎉
                </p>
              </div>
            )}
          </div>

          <div className="footer">
            {newTask && (
              <div>
                <div className="priority">
                  <div>
                    <DatePicker
                      selected={datetimeval}
                      onChange={(date) => setDateTimeVal(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      popperPlacement="bottom-start"
                      popperModifiers={{
                        flip: {
                          behavior: ["bottom"],
                        },
                        preventOverflow: {
                          enabled: false,
                        },
                        hide: {
                          enabled: false,
                        },
                      }}
                      popperClassName="date-picker-popper"
                      showPopperArrow={false}
                      customInput={<CustomCalendarIcon />}
                    />
                  </div>
                  <button
                    className={`red ${
                      selectedPriority === "h" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setPriority("h");
                      setSelectedPriority("h");
                    }}
                  >
                    High Priority
                  </button>
                  <button
                    className={`orange ${
                      selectedPriority === "m" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setPriority("m");
                      setSelectedPriority("m");
                    }}
                  >
                    Medium Priority
                  </button>
                  <button
                    className={`green ${
                      selectedPriority === "l" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setPriority("l");
                      setSelectedPriority("l");
                    }}
                  >
                    Low Priority
                  </button>
                </div>
              </div>
            )}

            <input
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              onFocus={() => setipFocused(true)}
              onBlur={() => setipFocused(false)}
              placeholder="Task Title"
              type="text"
              className="taskinput"
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
    </div>
  );
}

const CustomCalendarIcon = React.forwardRef(({ value, onClick }, ref) => (
  <CalendarTodayIcon
    onClick={onClick}
    color="white"
    style={{
      marginRight: "30px",
      marginTop: "-5px",
      backgroundColor: "#1890ff",
      color: "white",
      height: "50px",
      width: "50px",
      padding: "10px",
      boxShadow: "#1890ff 0px 4px 16px 0px",
      borderRadius: "10px",
    }}
    ref={ref}
  />
));

export default TaskList;
