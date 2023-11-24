import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const TaskModal = ({ open, handleClose, handleComplete, taskDetails }) => {
  // Add a conditional check to prevent accessing properties of null or undefined
  if (!taskDetails) {
    return null; // or handle the case where taskDetails is not available
  }

  const { title, priority, datetime } = taskDetails;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          
          bgcolor: "background.paper",
          boxShadow: 24,
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

        <Typography variant="h6" component="div">
        {title}
          {/* Priority Color */}
          <div
            style={{
              width: "40px",
              height: "8px",
              backgroundColor: getPriorityColor(priority),
              borderRadius: "10px",
              marginTop:'-1px',
              marginLeft:'-2px'
            }}
          ></div>
         <div style={{display:'inline-flex',}}>
         
         </div>
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        <Typography variant="body2" color="text.secondary" style={{fontSize:'20px',marginTop:'-20px'}} >
          Priority: {priority}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{fontSize:'20px'}}> 
          Time: {datetime}
        </Typography>

        {/* "Complete Task" and "Close" Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleComplete} variant="contained" style={{boxShadow: "#1890ff 0px 4px 16px 0px",
                backgroundColor: "#1890ff",}}>
            Mark Completed
          </Button>
          <Button onClick={handleClose} variant="contained" style={{color:'black',border:'1px solid black',
                backgroundColor: "white"}}>
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
