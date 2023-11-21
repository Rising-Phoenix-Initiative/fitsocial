import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const EditPost = ({ post, onEditClose, onEditSubmit, editSubmitting }) => {
    const [editedContent, setEditedContent] = useState(post.text);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            my: 3
        }}>
            <TextField
                onChange={(e) => setEditedContent(e.target.value)}
                value={editedContent}
                autoFocus
                margin="dense"
                id="post"
                label=""
                type="text"
                fullWidth
                multiline
                rows={4}
            />
            <Box
                gap={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 3
                }}
            >
                <Button
                    onClick={() => onEditSubmit(editedContent)}
                    variant="contained"
                    color="primary"
                    disabled={editSubmitting}
                    sx={{ fontSize: '0.9rem', fontWeight: '700' }}
                >
                    Save
                </Button>
                <Button
                    onClick={onEditClose}
                    variant="outlined"
                    color="error"
                    disabled={editSubmitting}
                    sx={{
                        color: 'text.primary',
                        borderColor: 'text.primary',
                        fontSize: '0.9rem',
                        fontWeight: '700',

                        "&:hover": {
                            borderColor: 'text.primary',
                            backgroundColor: '#f7fff722',
                        },
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EditPost;