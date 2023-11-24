/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { styled } from '@mui/system';
import axios from "axios";
import { Button } from "@mui/material";
import "./TaskList.css";
import BodyNoTask from "../images/boynotask.png";
// import TaskItem from "./TaskItem";
import toast from "react-hot-toast";
import ClearIcon from "@mui/icons-material/Clear";
import Task from "../../../backend/models/Task";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TaskModal from "./TaskModal";

// const StyledInput = styled('input')({
//   '&.datetimepicker': {
//     border: 'none',
//     width: '5%',
//     color: 'red',
//   },
// });


// const useStyles = makeStyles({
//   // Define a class to override the border style
//   noBorder: {
//     border: 'none',
//   },
// });

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [addNewTask, setAddNewTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [ipFocused, setipFocused] = useState(false);
  const [priority, setPriority] = useState("n");
  const [datetime, setDateTime] = useState("null");
  const [datetimeval, setDateTimeVal] = useState('');
  const [selectedPriority, setSelectedPriority] = useState("n"); // Add this state variable
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateTimePickerOpen, setDateTimePickerOpen] = useState(false);

  // TASK MODEL 
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };


  const handleButtonClick = () => {
    setDateTimePickerOpen(!isDateTimePickerOpen);
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
      const formattedTime = dayjs(datetimeval).format("HH:mm:ss.SSS[Z]"); // Note the format change here
      console.log(formattedDate, "formatted date");

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

  // ⭐️ OLD CHECKED BOX FUNCTION

  // const handleCheckboxClick = async (task) => {

  //   setIsLoading(true);

  //   try {
  //     await axios.put(`/api/tasks/${task._id}`, {
  //       completed: !task.isCompleted,
  //     });
  //     toast.success("Task updated successfully");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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

      console.log(clickedTask);
      console.log(clickedTask.isCompleted);

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
    }
  };

  //UPDATE TASK FUNCTION
  const updateTaskCompletionStatus = async (taskId, isCompleted) => {
    try {
      // Make an API call to your backend to update the task completion status
      // Example using fetch:
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: isCompleted }),
      });
      // Handle success response if needed
    } catch (error) {
      // Handle error
      console.error("Error updating task completion status:", error);
      throw error; // Throw the error to handle it in the click handler
    }
  };

  // const inputChange = () => {
  //   let inputTaskValue = document.getElementsByClassName('taskinput').value;

  // }


  return (
    <div style={{ minHeight: "10%", display: "flex", flexDirection: "column" }}>
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
                    {taskList.map((task) => (
                      <tr className="task-list" key={task._id} onClick={() => handleTaskClick(task)}>
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
                              color: task.isCompleted ? "grey" : "black",
                            }}
                          >
                            {task.title}
                          </p>

                          {/* TASK PRIORITY COLOUR BOX  */}

                          <div
                            className={`priority-box ${task.priority}`}
                          ></div>
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
                <TaskModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
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
                  All Tasks are completed ! 🎉
                </p>
              </div>
            )}
          </div>

          <div className="footer">
            {newTask && (
              <div>

                {/* DATE TIME OLD */}
                {/* <div className="datetime">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {newTask && (
                      <DateTimePicker
                        className="datetimepicker"
                        // label="Choose Date and Time"
                        placeholder=""
                        value={datetime}
                        onChange={(newValue) => setDateTime(newValue)}
                        renderInput={(props) => (
                          <StyledInput
                            {...props}
                            className="datetimepicker"
                            style={{ width: '5%', color: 'red' }}
                          />
                        )}
                      />
                    )}

                  </LocalizationProvider>
                </div> */}

                {/* <div className="priority">
                  <button  className="red" onClick={() => setPriority("h")}>
                    High Priority
                  </button>
                  <button className="orange" onClick={() => setPriority("m")}>
                    Medium Priority
                  </button>
                  <button className="green" onClick={() => setPriority("l")}>
                    Low Priority
                  </button>
                </div> */}
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
                          behavior: ['bottom'],
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
                    className={`red ${selectedPriority === "h" ? "selected" : ""}`}
                    onClick={() => {
                      setPriority("h");
                      setSelectedPriority("h");
                    }}
                  >
                    High Priority
                  </button>
                  <button
                    className={`orange ${selectedPriority === "m" ? "selected" : ""
                      }`}
                    onClick={() => {
                      setPriority("m");
                      setSelectedPriority("m");
                    }}
                  >
                    Medium Priority
                  </button>
                  <button
                    className={`green ${selectedPriority === "l" ? "selected" : ""
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
              // onChange={inputChange}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              onFocus={() => setipFocused(true)}
              onBlur={() => setipFocused(false)}
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
    </div>
  );
}

const CustomCalendarIcon = React.forwardRef(({ value, onClick }, ref) => (
  <CalendarTodayIcon  onClick={onClick} color="white" style={{marginRight:'30px',marginTop:'-5px',backgroundColor:"#1890ff",color:'white',height:'50px',width:'50px',padding:'10px',boxShadow: "#1890ff 0px 4px 16px 0px",borderRadius:'10px'}} ref={ref} />
));


export default TaskList;
