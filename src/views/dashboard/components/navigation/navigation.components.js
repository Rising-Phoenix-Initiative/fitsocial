import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Dialog,
    DialogContent,
    TextField
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubjectIcon from '@mui/icons-material/Subject';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

import { IconButton, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import { Notifications as NotificationsIcon, Portrait, ExitToApp, Settings, Bookmark, PhotoLibrary, GifBox, InsertEmoticon, Send } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../utils/capitalize.util';
import { topics } from './topics.data';
import { generateSlug } from '../../../../utils/generate-slug.util';
import Logo from '../../../../components/logo/logo.component';
import styled from 'styled-components';
import { useState } from 'react';
import { NavigationContainer } from './navigation.styles';
import { useAuth } from '../../../../context/auth.context';
import { usePosts } from '../../../../context/posts.context';
import { uploadImage } from '../../../../services/posts.service';
import { logout } from '../../../../features/auth/authService';

const UserSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

function Navigation() {
    const [userDropdownAnchorEl, setUserDropdownAnchorEl] = useState(null);
    const { user } = useAuth();

    const { createPost } = usePosts();
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [error, setError] = useState(null);

    const submitPost = async () => {
        const postData = {
            text: postContent,
            userId: user.userId,
        }
        try {
            await createPost(postData, user.userId);
            setPostContent('');
            setNewPostOpen(false);

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

    const handleUserDropdownOpen = (event) => {
        setUserDropdownAnchorEl(event.currentTarget);
    };

    return (
        <NavigationContainer>
            <Box>
                <Logo />
                <Box sx={{ mt: '40px' }}>
                    <List>
                        <ListItem button component={Link} to="/home">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/explore">
                            <ListItemIcon><ExploreIcon /></ListItemIcon>
                            <ListItemText primary="Explore" />
                        </ListItem>
                        <ListItem button component={Link} to="/bookmarks">
                            <ListItemIcon><Bookmark /></ListItemIcon>
                            <ListItemText primary="Bookmarks" />
                        </ListItem>
                        <ListItem button component={Link} to="/notifications">
                            <ListItemIcon><Badge variant="dot" color="secondary"><NotificationsIcon /></Badge></ListItemIcon>
                            <ListItemText primary="Notifications" />
                        </ListItem>
                    </List>
                    <Divider sx={{ my: '10px' }} />
                    <Accordion sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemIcon>
                                <SubjectIcon />
                            </ListItemIcon>
                            <Typography>Topics</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0, height: '200px', overflowY: 'scroll' }}>
                            <List component="div" disablePadding>
                                {topics.map(topic => (
                                    <ListItem button key={topic} component={Link} to={`/topics/${generateSlug(topic)}`}>
                                        <ListItemText primary={capitalizeFirstLetter(topic)} />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Divider sx={{ my: '10px' }} />
                    <ListItem button component={Link} to="/messages">
                        <ListItemIcon><ForumIcon /></ListItemIcon>
                        <ListItemText primary="Messages" />
                    </ListItem>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/groups">
                        <ListItemIcon><GroupIcon /></ListItemIcon>
                        <ListItemText primary="Groups" />
                    </ListItem>
                    <Divider sx={{ my: '10px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
                        <Button
                            sx={{
                                borderRadius: '40px',
                                px: "40px",
                                fontSize: '1.2rem',
                                fontWeight: '700'
                            }}
                            color="primary"
                            variant="contained"
                            onClick={() => setNewPostOpen(true)}
                        >
                            New Post
                        </Button>
                        <Dialog open={newPostOpen} onClose={() => setNewPostOpen(false)} fullWidth maxWidth="sm">
                            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ pb: 0 }}>
                                <Avatar sx={{ backgroundColor: '#4173fc' }}>VF</Avatar>
                                <IconButton edge="end" color="inherit" onClick={() => setNewPostOpen(false)} aria-label="close">
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
                    </Box>

                </Box>
            </Box>
            <UserSection>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Avatar />
                        <Box sx={{ ml: '10px' }}>
                            <Typography variant="subtitle2">John Doe</Typography>
                            <Typography variant="subtitle2">@username</Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleUserDropdownOpen}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={userDropdownAnchorEl}
                    open={Boolean(userDropdownAnchorEl)}
                    onClose={() => setUserDropdownAnchorEl(null)}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mb: 1.5,
                            p: 1,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem>
                        <ListItemIcon><Portrait /></ListItemIcon>
                        <ListItemText primary="Change Avatar" />
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon><Settings /></ListItemIcon>
                        <ListItemText primary="Account Settings" />
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </MenuItem>
                </Menu>
            </UserSection>
        </NavigationContainer>
    );
}

export default Navigation;