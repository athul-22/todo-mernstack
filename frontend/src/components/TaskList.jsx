/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
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
import { Table as AntTable, Tag } from "antd";
import DoneIcon from "@mui/icons-material/Done";
import AddButton from "./AddTask";

const getTasks = async () => {
  console.log("Fetching tasks...");
  try {
    const { data } = await axios.get("/api/tasks/mytasks");
    setTaskList(
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  } catch (err) {
    console.log(err);
  }
};

export const addTaskFun = async (setReloadTable, setNewTask, getTasks) => {
  try {
    // Implement your logic to add the task
    // ...

    // Set reloadTable to true to trigger a re-render in TaskList
    setReloadTable(true);
    // ...

    await getTasks();
    console.log("got it bro");
  } catch (error) {
    console.error('Error in addTaskFun:', error);
  }
};

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
  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const addTaskFun = async (taskData) => {
    // e.preventDefault();
    if (newTask.length <= 0) {
      toast.error("Task is empty");
      return;
    }

    try {
      // Implement your logic to add the task using the taskData
      console.log("addtaskfun called", taskData);
      // Make API request or update state as needed

      // Set reloadTable to true to trigger a re-render in TaskList
     
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
      getTasks();
     
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    console.log("Fetching tasks...");
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

  const antdColumns = [
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: "20%",
      render: (priority) => {
        let color = "";
        switch (priority) {
          case "h":
            color = "red";
            break;
          case "m":
            color = "orange";
            break;
          case "l":
            color = "green";
            break;
          default:
            break;
        }
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "Mark as Done",
      key: "markAsDone",
      width: "20%",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleCheckboxClick(record)}
          disabled={record.isCompleted || isLoading}
        >
          <DoneIcon />
        </Button>
      ),
    },
    {
      title: "Task",
      dataIndex: "title",
      key: "title",
      width: "80%",
    },
    {
      title: "Delete",
      key: "delete",
      width: "45%",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => deleteTask(record._id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      ),
    },
    // Add other columns as needed
  ];

  return (
    <div>
      <AddButton callAddFun={()=>addTaskFun()} />
      <div
        className="task-list-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ overflowY: "scroll", width: "100%", height: "600px" }}>
          <AntTable
            dataSource={taskList}
            columns={antdColumns}
            rowKey="_id"
            pagination={false}
            style={{
              height: "100vh",
              width: "100%",
              borderRadius: "auto",
              border: "auto black",
              position: "relative", 
            }}
            scroll={{ y: 600 }} // Set the y property to the desired height
          />
        </div>
      </div>
    </div>
  );
}


export default TaskList;
