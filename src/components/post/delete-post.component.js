import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

const DeletePostDialog = ({ open, onClose, onDelete, deleteSubmitting }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '330px',
                    backgroundImage: 'none'
                },
            }}
            aria-labelledby="delete-post-dialog-title"
            aria-describedby="delete-post-dialog-description"
        >
            <DialogTitle sx={{ pb: 1, fontWeight: '700' }} id="delete-post-dialog-title">Delete post?</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-post-dialog-description">
                    This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results.
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <Button
                    variant="contained"
                    onClick={onDelete}
                    color="error"
                    disabled={deleteSubmitting}
                    sx={{
                        fontSize: '16px',
                        fontWeight: '700',
                        px: '35%',
                        border: '1px solid error.main',

                        "&:hover": {
                            border: '1px solid text.primary',
                            backgroundColor: 'error.main',
                        },
                    }}
                >
                    Delete
                </Button>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={deleteSubmitting}
                    sx={{
                        px: '34%',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: 'text.primary',
                        borderColor: 'text.primary',
                        mt: 3,
                        ml: '0px !important',

                        "&:hover": {
                            borderColor: 'text.primary',
                            backgroundColor: '#f7fff722',
                        },
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePostDialog;