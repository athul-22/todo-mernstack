import React, { useState } from "react";
import { Modal, Button, Form, Input, Radio, DatePicker, Space } from "antd";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";

const Model = ({ visible, onCancel }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("l");
  const [dateTime, setDateTime] = useState(null);

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

      console.log("Task added successfully:", data);
      toast.success("Task Added successfully");
    
      // addTaskFun();
      
      setTaskTitle("");
      setSelectedColor("l");
      setDateTime(null);
      onCancel();
      window.location.reload()
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  return (
    <Modal
      title="Add New Task"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
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
  );
};

Model.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  addTaskFun: PropTypes.func.isRequired,
  setReloadTable: PropTypes.func.isRequired,
};

const AddButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [reloadTable, setReloadTable] = useState(false);

  // const addTaskFun = async (taskData) => {
  //   try {
  //     // Implement your logic to add the task using the taskData
  //     console.log('Adding task:', taskData);
  //     // Make API request or update state as needed

  //     // Set reloadTable to true to trigger a re-render in TaskList
  //     setReloadTable(true);
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //     throw error;
  //   }
  // };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const reloadFun(){
  //   props.addTaskFun();
  // }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        <PlusOutlined /> Add Task
      </Button>
      <Model
        visible={isModalVisible}
        onCancel={() => {
          handleCancel();
          // Reset reloadTable to false when the modal is closed
          
        }}
        onAddTask={() => {
          setIsModalVisible(false);
          // Reset reloadTable to false after adding a task
          
        }}
      />
      {/* Your other components and content */}
    </div>
  );
};

export default AddButton;
