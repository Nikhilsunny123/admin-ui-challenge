import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Box
      active={selected === title}
      style={{ color: "grey", cursor: "pointer" }}
      onClick={() => setSelected(title)}
      sx={{
        my: 2,
        "& .MuiTypography-root:hover": {
          color: "#849e41 ",
        },
      }}
    >
      <Link style={{ textDecoration: "none" }} to={to}>
        <Typography>{title}</Typography>
      </Link>
    </Box>
  );
};

const SideBar = () => {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      display="flex"
      width="20%"
      height="100% !important"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap="5%"
      backgroundColor="#4c9ed9"
      padding="10px 20px"
    >
      <Typography variant="h6">ADMINS</Typography>

      <Box>
        <img
          alt="profile-user"
          width="100px"
          height="100vh"
          src={`../../assets/profile.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Item
          title="Dashboard"
          to="/"
          selected={selected}
          setSelected={setSelected}
        />

        <Item
          title="Members"
          to="/members"
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Help"
          to="/"
          selected={selected}
          setSelected={setSelected}
        />
      </Box>
    </Box>
  );
};

export default SideBar;
