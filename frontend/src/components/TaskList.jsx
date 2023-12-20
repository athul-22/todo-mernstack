/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
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
  const [completedTasks, setCompletedTasks] = useState([]);

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

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/move-to-completed/${id}`);
      toast.success("Task Removed successfully");
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
      handleTaskClick(clickedTask);
    }
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
            marginRight: "20px", // Adjusted margin
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
          {/* ... (previous menu items) */}
        </Select>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div>
          <div
            className="task-list-container"
            style={{
              display: "flex",
              flexDirection: "column", // Adjusted flexDirection
              alignItems: "center", // Centered items
              marginTop: "20px", // Adjusted margin
            }}
          >
            <TableContainer component={Paper} style={{ width: '70%',borderRadius: "20px" ,border:'1px solid grey'}}>
              <Table style={{ width: '100%', borderCollapse: "collapse" }}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{paddingTop: 0.8, paddingBottom: 0}} >
                  {taskList
                    .filter((task) =>
                      priorityFilter ? task.priority === priorityFilter : true
                    )
                    .map((task) => (
                      <TableRow key={task._id} style={{ maxHeight: '20px' }}>
                        <TableCell style={{ maxHeight: '20px' }}>
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
                        </TableCell>
                        <TableCell>
                          <div onClick={() => handleTaskClick(task)}>
                            <p
                              className="task-title"
                              style={{
                                textDecoration: task.isCompleted
                                  ? "line-through"
                                  : "none",
                                color: task.isCompleted ? "grey" : "black",
                                cursor: "pointer",
                                padding: 0, 
                                margin: 0
                              }}
                            >
                              {task.title}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`priority-box ${task.priority}`}
                          ></div>
                        </TableCell>
                        <TableCell>
                          <ClearIcon
                            className="task-delete-btn"
                            onClick={() => deleteTask(task._id)}
                            style={{
                              color: "black",
                              backgroundColor: "#f5f5f5",
                              alignContent: "center",
                              fontSize: "6px",
                              marginRight: "20px",
                              height: "25px",
                              width: "25px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin:'10px'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <hr
              style={{
                width: "100%", // Full width
                border: "1px solid #ddd", // Border style
              }}
            /> */}
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