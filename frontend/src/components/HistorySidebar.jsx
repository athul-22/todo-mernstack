import React from "react";
import PropTypes from "prop-types";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const HistorySidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} style={{ width: '100px' }}>
      <List style={{ width: '300px' }}>
        <ListItem button>
          <ListItemText primary="History Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="History Item 2" />
        </ListItem>
        {/* Add more history items as needed */}
      </List>
    </Drawer>
  );
};

HistorySidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HistorySidebar;
