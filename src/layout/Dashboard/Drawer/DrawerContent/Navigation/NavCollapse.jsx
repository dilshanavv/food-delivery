import { useState } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import NavItem from './NavItem';

export default function NavCollapse({ item }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        {item.icon && <ListItemIcon>{<item.icon />}</ListItemIcon>}
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children &&
            item.children.map((child) => (
              <NavItem key={child.id} item={child} level={2} />
            ))}
        </List>
      </Collapse>
    </>
  );
}