import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const SideBarItem = ({ onClick, currentPage, icon, label, tabId }) => {
  return (
    <ListItem
      key={tabId}
      sx={{
        ...(currentPage === tabId
          ? { backgroundColor: "#3589A1", color: "#FFFDFD" }
          : {}),
      }}
      disablePadding
    >
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
