import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Item = ({ title, to }) => {
  return (
    <Box
      style={{ color: "#91acbf", cursor: "pointer" }}
      sx={{
        my: 2,

        "& .MuiTypography-root:hover": {
          color: "#470a45",
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
  return (
    <Box
      display="flex"
      width="20%"
      height="100% !important"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap="5%"
      backgroundColor="#0e3663"
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
        <Item title="Dashboard" to="/" />

        <Item title="Members" to="/members" />
        <Item title="Help" to="/" />
      </Box>
    </Box>
  );
};

export default SideBar;
