import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
type propsType = {
  open: boolean;
  handleClose: () => void;
  text: string;
  isLoading: boolean;
  onConfirm: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({ open = false, handleClose, text, onConfirm, isLoading = false }: propsType) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {text}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={2} gap={2}>
            <LoadingButton
              loading={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onConfirm();
              }}
              color={'primary'}
            >
              تایید
            </LoadingButton>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              color={'error'}
            >
              رد
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
