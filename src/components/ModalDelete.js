import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

const ModalDelete = ({ ondeleteData, member }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <DeleteForeverIcon style={{ cursor: "pointer" }} onClick={handleOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "red", fontSize: "20px" }}>
          Confirm delete
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              ondeleteData(member);
              setOpen(false);
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
