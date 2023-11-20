import React, { useState } from 'react';
import {
    Button,
    Box,
    Typography,
    Dialog,
    DialogContent,
    TextField
} from '@mui/material';
import { IconButton, Avatar } from '@mui/material';
import { PhotoLibrary, GifBox, InsertEmoticon, Send, Close as CloseIcon } from '@mui/icons-material';
import { usePosts } from '../../context/posts.context';
import { useAuth } from '../../context/auth.context';
import { uploadImage } from '../../services/posts.service';


const NewPostDialog = () => {
    const [postContent, setPostContent] = useState('');
    const [error, setError] = useState(null);

    const { createPost, submitting, newPostOpen, closeNewPost } = usePosts();
    const { user } = useAuth();

    const submitPost = async () => {
        const postData = {
            text: postContent,
            userId: user?.$id,
            name: user?.name,
            username: user?.username,
        }

        try {
            await createPost(postData, user?.$id);
            setPostContent('');
            closeNewPost();

        } catch (error) {
            setError(error.message);
        }
    }

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const result = await uploadImage(file);
                console.log(result); // Handle the success response
            } catch (error) {
                console.error(error); // Handle the error
            }
        }
    };

    return (
        <Dialog PaperProps={{ sx: { backgroundImage: 'none' } }} open={newPostOpen} onClose={closeNewPost} fullWidth maxWidth="sm">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pb={0}>
                <Avatar sx={{ backgroundColor: 'background.onSurface', color: 'text.onSurface' }}>VF</Avatar>
                <IconButton edge="end" color="inherit" onClick={closeNewPost} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                <TextField
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                    autoFocus
                    margin="dense"
                    id="post"
                    label="What's happening?"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                />
                {error && <Typography variant="secondary">
                    {error}
                </Typography>}
            </DialogContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Box display="flex" justifyContent="start" alignItems="center" gap={1}>
                    <IconButton
                        sx={{
                            "&:hover": {
                                color: '#11cc11'
                            }
                        }}
                        color="inherit"
                        aria-label="upload media"
                    >
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleUpload}
                        />
                        <PhotoLibrary />
                    </IconButton>
                    <IconButton
                        sx={{
                            "&:hover": {
                                color: '#11cc11'
                            }
                        }}
                        color="inherit"
                        aria-label="add gif"
                    >
                        <GifBox />
                    </IconButton>
                    <IconButton
                        sx={{
                            "&:hover": {
                                color: '#11cc11'
                            }
                        }}
                        color="inherit"
                        aria-label="add emoji"
                    >
                        <InsertEmoticon />
                    </IconButton>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Button
                        onClick={submitPost}
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        endIcon={<Send />}
                        sx={{ fontSize: '1rem', fontWeight: '700' }}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default NewPostDialog;