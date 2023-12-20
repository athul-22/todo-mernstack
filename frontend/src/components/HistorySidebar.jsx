import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const HistorySidebar = ({ open, onClose }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const getCompletedTasks = async () => {
      try {
        const { data } = await axios.get("/api/tasks/userCompletedTask");
        setTaskList(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (err) {
        console.log(err);
      }
    };

    // Invoke the function inside the useEffect
    getCompletedTasks();
  }, []); // Empty dependency array means it will run only once when the component mounts

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      style={{ width: "100px" }}
    >
      <List style={{ width: "300px" }}>
        {taskList.length === 0 ? (
          <ListItem>
            <ListItemText style={{textAlign:'center'}} primary="No completed tasks found" />
          </ListItem>
        ) : (
          taskList.map((task, index) => (
            <React.Fragment key={task._id}>
              <ListItem button style={{ position: "relative" }}>
                <ListItemText primary={task.title} />
              </ListItem>
              {/* {index !== taskList.length - 1 && (
                <hr
                  style={{
                    position: "absolute",
                    width: "100%",
                    top: "100%",
                    left: 0,
                    margin: 0,
                    border: "none",
                    height: "1px",
                    backgroundColor: "grey",
                  }}
                />
              )} */}
            </React.Fragment>
          ))
        )}
      </List>
    </Drawer>
  );
};

HistorySidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistorySidebar;
