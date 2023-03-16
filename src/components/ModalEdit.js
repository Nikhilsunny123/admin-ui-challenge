import {
  Button,
  Dialog,
  DialogTitle,

  DialogActions,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { handleEdit } from "./commonFunctions";

const ModalEdit = ({
  setIsEdit,
  editData,
  id,
  isEdit,
  data,
  newName,
  newEmail,
  newRole,
  setData,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    handleEdit(id, data, isEdit, setData);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <SaveIcon style={{ cursor: "pointer" }} onClick={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "green", fontSize: "20px" }}>
          Save Changes
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setIsEdit(false);
              editData(id, data, isEdit, newName, newEmail, newRole, setData);
            }}
          >
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalEdit;
