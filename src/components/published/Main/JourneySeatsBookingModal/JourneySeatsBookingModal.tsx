import { Fade } from '@mui/material';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import React from 'react';

const style = {
  // position: 'absolute' as 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  overflowY: 'scroll',
};
interface IModalProps {
  children: React.ReactNode;
  isShowModal: boolean;
  onClose: () => void;
}

export const JourneySeatsBookingModal = ({
  isShowModal,
  onClose,
  children,
}: IModalProps) => {
  return (
    <Modal
      style={{ margin: 16 }}
      open={isShowModal}
      onClose={onClose}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      disableScrollLock={true}
      disablePortal={false}
    >
      <Fade in={isShowModal}>
        <Container
          maxWidth={'lg'}
          disableGutters
          // sx={style}
          sx={{
            borderRadius: '4px',
            bgcolor: 'background.paper',
            position: { md: 'absolute' },
            top: '50%',
            left: '50%',
            transform: { md: 'translate(-50%, -50%)' },
            height: { xs: '96vh', md: 'initial' },
          }}
        >
          {children}
        </Container>
      </Fade>
    </Modal>
  );
};
