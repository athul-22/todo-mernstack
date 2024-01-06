/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import { Modal, Form, Input, Radio, DatePicker } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
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
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TaskModal from "./TaskModal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import "react-datepicker/dist/react-datepicker.css";
import { Table as AntTable, Tag } from "antd";
import DoneIcon from "@mui/icons-material/Done";
import AddButton from "./AddTask";
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import Drawer from '@mui/material/Drawer';

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

  // ADD TASK BUTTON STATES
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("l");
  const [dateTime, setDateTime] = useState(null);

  // RTIMELINE DRAWER 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };



  useEffect(() => {
    getTasks();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // HANDLE ADD TASK FUNCTION
  const handleAddTask = async () => {
    if (taskTitle.trim().length === 0) {
      toast.error("Task is empty");
      return;
    }
    try {
      const { data } = await axios.post("/api/tasks", {
        title: taskTitle,
        priority: selectedColor,
        datetime: dateTime ? dateTime.toISOString() : null,
      });

      toast.success("Task Added successfully");

      setTaskTitle("");
      setSelectedColor("l");
      setDateTime(null);
      setIsModalVisible(false);
      setTaskList([data, ...taskList]);
      setNewTask("");
      getTasks();
      // window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  // ADD TASK PREV FUNCTION 
  const addTaskFun = async () => {
    // e.preventDefault();
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
         <ClearIcon/>
        </Button>
      ),
    },
    // Add other columns as needed
  ];

  return (
    <div>
      {/* <AddButton callAddFun={()=>addTaskFun()} /> */}
      <Button type="primary" style={{border:" 1px solid #BDDEFF",marginRight:'20px'}} onClick={showModal}>
        <PlusOutlined /> Add Task
      </Button>
      <Button type="primary" style={{border:" 1px solid #BDDEFF"}} onClick={openDrawer}>
        <ViewTimelineIcon /> Timeline
      </Button>
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

      {/* ADD TASK MODEL */}
      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAddTask}>
            Add Task
          </Button>,
        ]}
      >
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <Form.Item label="Task Title" style={{ marginBottom: "20px", flex: 1 }}>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="What You want ToDo Today"
            />
          </Form.Item>
          <Form.Item label="Priority" style={{ marginBottom: "20px", flex: 1 }}>
            <Radio.Group
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button
                className="custom-radio-button"
                style={{ background: "#e3f2fd", color: "#1e96fc" }}
                value="l"
              >
                Normal
              </Radio.Button>
              <Radio.Button
                className="custom-radio-button"
                style={{ background: "#fff2b2", color: "#f48c06" }}
                value="m"
              >
                Important
              </Radio.Button>
              <Radio.Button
                className="custom-radio-button"
                style={{ background: "#fff0f3", color: "#ff4d6d" }}
                value="h"
              >
                Urgent
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Date and Time"
            style={{ marginBottom: "20px", flex: 1 }}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={dateTime}
              onChange={(date) => setDateTime(date)}
            />
          </Form.Item>
        </Form>
        </Modal>

        <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <div style={{ width: 400, padding: 16 }}>
          {/* You can add any content you want inside the drawer */}
        </div>
      </Drawer>
    </div>
  );
}


export default TaskList;
