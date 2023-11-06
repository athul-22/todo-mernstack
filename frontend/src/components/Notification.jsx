import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Notifications() {
  return (
    <div>
      <IconButton color="inherit" aria-label="Notifications">
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </div>
  );
}

export default Notifications;
