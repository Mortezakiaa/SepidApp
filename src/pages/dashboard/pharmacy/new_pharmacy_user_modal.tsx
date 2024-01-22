import { Box, Fade, Modal, Skeleton, Typography } from '@mui/material';
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import UserNewEditForm from '@sections/@dashboard/user/UserNewEditForm.tsx';
import useModalManager from '@/zustand/utils/useModalManager.ts';
import { useShallow } from 'zustand/react/shallow';
import useFetchSingleUser from '@/react-query/user/useFetchSingleUser.ts';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function NewPharmacyUserModal() {
  const { isOpen, closeModal, findModal } = useModalManager(
    useShallow((state) => ({ closeModal: state.closeModal, isOpen: state.isOpen, findModal: state.findModal }))
  );
  console.log(findModal('PharmacyUser'));
  const isOpened = isOpen.some((modal) => modal.name === 'PharmacyUser');
  const user_id = findModal('PharmacyUser')?.data;
  const { data, isLoading } = useFetchSingleUser(user_id);

  return (
    <Modal
      open={isOpened}
      onClose={() => closeModal('PharmacyUser')}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpened}>
        <Box sx={style}>
          <Typography fontSize={24} mb={2}>
            {!!user_id ? `${data?.full_name || ''}ویرایش کاربر ` : 'ساخت کاربر جدید برای داروخانه'}
          </Typography>
          {isLoading ? (
            <Skeleton width={'100%'} height={450} sx={{ marginTop: -8, marginBottom: -8 }} />
          ) : (
            <UserNewEditForm pharmacyId={8} currentUser={data} isEdit={!!data} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
