import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';


function SessionWarningDialog() {
  const { showSessionWarning, setShowSessionWarning, logout } = useAuth();


  const handleLogoutNow = () => {
    setShowSessionWarning(false);
    logout();
  };


  const handleDismiss = () => {
    setShowSessionWarning(false);
    // Optional: trigger token refresh here
  };


  return (
    <Dialog open={showSessionWarning} onClose={handleDismiss}>
      <DialogTitle>Session Expiring</DialogTitle>
      <DialogContent>
        <Typography>
          Your session will expire in 1 minute. Please save your work or extend your session.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogoutNow} color="error">Logout Now</Button>
        <Button onClick={handleDismiss} autoFocus>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}


export default SessionWarningDialog;