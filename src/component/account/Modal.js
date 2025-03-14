import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';

const Modal = ({ open, handleClose, handleConfirm, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    borderRadius: '30px',
                    backgroundColor: '#333333',
                    color: '#fff',
                },
            }}
        >
            <DialogContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '44px 160px 16px 160px',
                    backgroundColor: '#333333',
                    color: '#fff',
                }}
            >
                <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png"
                    alt="Rocket"
                    width="123"
                    height="123"
                    style={{ marginBottom: '16px' }}
                />
                <p>{message}</p>
            </DialogContent>
            <DialogActions
                style={{
                    justifyContent: 'center',
                    gap: '12px',
                    paddingBottom: '34px',
                    backgroundColor: '#333333',
                }}
            >
                <Button
                    onClick={handleConfirm}
                    style={{
                        backgroundColor: '#263FBD',
                        color: '#FFFFFF',
                        borderRadius: '86px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        width: '160px',
                    }}
                >
                    변경 할게요
                </Button>
                <Button
                    onClick={handleClose}
                    style={{
                        backgroundColor: '#FFFFFF',
                        color: '#263FBD',
                        border: '2px solid #263FBD',
                        borderRadius: '86px',
                        padding: '12px 24px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        width: '160px',
                    }}
                >
                    다음에 할게요
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
