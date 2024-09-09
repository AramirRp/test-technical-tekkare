import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {t('welcome.title')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('welcome.description')}
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          {t('welcome.enterDashboard')}
        </Button>
      </Box>
    </Modal>
  );
};

export default WelcomeModal;