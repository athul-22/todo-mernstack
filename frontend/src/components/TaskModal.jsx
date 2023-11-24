import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TaskModal = ({ open, handleClose, handleComplete, taskDetails }) => {
  // Add a conditional check to prevent accessing properties of null or undefined
  if (!taskDetails) {
    return null; // or handle the case where taskDetails is not available
  }

  const { title, priority, datetime } = taskDetails;

  // Convert the datetime string to a JavaScript Date object
  const dateObj = new Date(datetime);

  // Check if the date is valid
  const isDateValid = !isNaN(dateObj.getTime());

  // Get the date and time strings or display a message if invalid
  const dateStr = isDateValid ? dateObj.toLocaleDateString() : "No date given";
  const timeStr = isDateValid ? dateObj.toLocaleTimeString() : "No time given";

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          outline: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}
      >
        {/* Close Icon Button */}
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="div" style={{ fontSize: "30px" }}>
          {title}

          {/* Priority Color */}
          <div
            style={{
              width:'30px',
              height: "10px",
              color: "",
              backgroundColor: getPriorityColor(priority),
              borderRadius: "10px",
              marginTop: "-5px",
              marginLeft: "",
            }}
          ></div>
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          style={{ fontSize: "18px", marginTop: "5px" }}
        >
          Priority: {priority}
        </Typography> */}
        <Typography
          variant="body2"
          color="text.secondary"

          style={{
           
            display: "inline-flex",
            justifyContent: "center",
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          <EventIcon 
          style={{
              boxShadow: "#1890ff 0px 4px 16px 0px",
              backgroundColor: "#1890ff",
              color: "white",
              height: "30px",
              width: "30px",
              borderRadius: "5px",
              padding: "3px",
              marginRight: "20px",
            }}
          /> {dateStr}
        </Typography>
        <br />
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ display: "inline-flex", fontSize: "18px",marginTop: "20px", }}
        >
          <AccessTimeIcon
            style={{
              boxShadow: "#1890ff 0px 4px 16px 0px",
              backgroundColor: "#1890ff",
              color: "white",
              height: "30px",
              width: "30px",
              borderRadius: "5px",
              padding: "3px",
              marginRight: "20px",
              
            }}
          />{" "}
          {timeStr}
        </Typography>

        {/* "Complete Task" and "Close" Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between" style={{marginTop: "50px",}}> 
          <Button
            onClick={handleComplete}
            variant="contained"
            style={{
              boxShadow: "#1890ff 0px 4px 16px 0px",
              backgroundColor: "#1890ff",
            }}
          >
            Mark Completed
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              color: "black",
              border: "1px solid black",
              backgroundColor: "white",
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Function to get priority color based on priority letter
const getPriorityColor = (priority) => {
  switch (priority) {
    case "h":
      return "#ff0000";
    case "m":
      return "#ff9900";
    case "l":
      return "#50C878";
    default:
      return "gray";
  }
};

export default TaskModal;
