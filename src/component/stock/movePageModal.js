import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import './movePageModal.css';

/*
파일명 : movePageModal.js
생성자 : JDeok
날 짜  : 2025.03.21
시 간  : 오전 09:21
기 능  : 페이지이동 Modal
Params :
Return :
변경사항
     - 2025.03.21 : JDeok(최초작성)
*/

const movePageModal = ({ open = false, handleClose = () => {} }) => {
    const handleConfirm = () => {
        window.open("https://www.shinhaninvest.com", "_blank");
        handleClose();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className="custom-modal"
            PaperProps={{
                sx: {
                    height: '240px',
                },
            }}
        >
            <DialogContent>
                <img
                    src="assets/images/analyzeTest/sh_logo.png"
                    alt="Badge Icon"
                />
                <p>신한투자증권으로 이동하시겠습니까?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} className="confirm-button"
                        style={{
                            backgroundColor: '#37383C',
                            color: '#fff',
                            borderRadius: '15px',
                            width: '100px',
                            height: '50px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            lineHeight: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            marginTop: '10px',
                        }}>
                이동 할게요
            </Button>
                <Button onClick={handleClose} className="cancel-button"
                        style={{
                            backgroundColor: '#37383C',
                            color: '#fff',
                            borderRadius: '15px',
                            width: '100px',
                            height: '50px',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            lineHeight: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0,
                            marginTop: '10px',
                        }}>
                    다음에 할게요
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default movePageModal;
