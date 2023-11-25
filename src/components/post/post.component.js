import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { getInitials } from '../../utils/get-initials.util';
import Loader from '../loader/loader.component';
import { useEffect } from 'react';
import { useFormatDate } from '../../hooks/use-format-date.hook';
import { useAuth } from '../../context/auth.context';
import { usePosts } from '../../context/posts.context';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditPost from './edit-post.component';
import DeletePostDialog from './delete-post.component';

const Post = ({ post }) => {
    const {
        text,
        name,
        username,
        likes,
        likeIds,
        comments,
        initialLiked = false,
        initialBookmarked = false
    } = post;
    const { user } = useAuth();
    const { addLikeToPost, removeLikeFromPost, updatePost, deletePost } = usePosts();

    const realTimeDate = useFormatDate(post.$createdAt);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const [liked, setLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(likes);
    const [likeIdsState, setLikeIds] = useState(likeIds);
    const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false);

    const [bookmarked, setBookmarked] = useState(initialBookmarked);

    const [MenuDropdownAnchorEl, setMenuDropdownAnchorEl] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editSubmitting, setEditSubmitting] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);

    // BUG HERE when deleting a post
    useEffect(() => {
        if (name) {
            if (likeIds.includes(user.$id)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
            setIsLoadingData(false);
        } else {
            setIsLoadingData(true);
        }
    }, [name, likeIds, user]);

    const handleLike = async () => {
        setIsLikeButtonDisabled(true);
        if (likeIdsState.includes(user.$id)) {
            setLiked(false);
            setLikesCount(likesCount - 1); // Decrement likes
            setLikeIds(likeIdsState.filter(id => id !== user.$id)); // Remove userId from likeIds
            await removeLikeFromPost(post.$id, user.$id);
        } else {
            setLiked(true);
            setLikesCount(likesCount + 1); // Increment likes
            setLikeIds([...likeIdsState, user.$id]); // Add userId to likeIds
            await addLikeToPost(post.$id, user.$id);
        }
        setIsLikeButtonDisabled(false)
    };

    const handleBookmark = () => {
        // Here, you would also handle the update to the backend
        setBookmarked(!bookmarked);
    };

    const handleMenuDropdownOpen = (event) => {
        setMenuDropdownAnchorEl(event.currentTarget);
    };

    const handleMenuDropdownClose = () => {
        setMenuDropdownAnchorEl(null);
    };

    const handleEdit = () => {
        handleMenuDropdownClose()
        setIsEditing(true);
    };

    const handleEditSubmit = async (editedContent) => {
        setEditSubmitting(true);
        await updatePost(post.$id, { text: editedContent, edited: true }, user.$id);
        handleEditClose();
        setEditSubmitting(false);
    };

    const handleEditClose = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        handleMenuDropdownClose()
        setDeleteOpen(true);
    };

    const handleDeleteSubmit = async () => {
        setDeleteSubmitting(true);
        await deletePost(post.$id, user.$id);
        handleDeleteClose();
        setDeleteSubmitting(false);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return (
        <>
            <Box sx={{
                py: 2,
                px: 4,
                maxWidth: '100%',
                borderBottom: '1px solid',
                borderColor: 'background.border',

                "&:hover": {
                    backgroundColor: 'background.paper',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease-in-out',
                }
            }}
            >
                {isLoadingData ? <Loader size={50} sx={{ width: '100%', height: '100%', background: 'transparent', py: '50px' }} /> : (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ mr: 1 }}>{getInitials(name)}</Avatar>
                                <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
                                    <Typography variant="subtitle2">{name}</Typography>
                                    <Typography variant="caption">@{username}</Typography>
                                    <Typography variant="caption">&#8226;</Typography>
                                    <Typography variant="caption">{realTimeDate}</Typography>
                                    {post.edited && (
                                        <Typography variant="caption">(edited)</Typography>
                                    )}
                                </Box>
                            </Box>
                            <IconButton onClick={handleMenuDropdownOpen}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={MenuDropdownAnchorEl}
                                open={Boolean(MenuDropdownAnchorEl)}
                                onClose={() => setMenuDropdownAnchorEl(null)}
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
                                {post.userId === user.$id ? (
                                    <>
                                        <MenuItem onClick={handleEdit}>
                                            <ListItemIcon><EditIcon /></ListItemIcon>
                                            <ListItemText primary="Edit Post" />
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete}>
                                            <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
                                            <ListItemText primary="Delete Post" />
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <ListItemIcon><PersonAddIcon /></ListItemIcon>
                                            <ListItemText primary="Follow User" />
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon><BlockIcon /></ListItemIcon>
                                            <ListItemText primary="Block User" />
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </Box>
                        {isEditing ? (
                            <EditPost post={post} onEditSubmit={handleEditSubmit} editSubmitting={editSubmitting} onEditClose={handleEditClose} />
                        ) : (
                            <Typography sx={{
                                my: 3,
                                mx: 1,
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                            }}>
                                {text}
                            </Typography>
                        )
                        }
                        {!isEditing && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    disabled={isLikeButtonDisabled}
                                    onClick={handleLike}
                                    sx={{
                                        color: liked && 'iconHover.heart',
                                        '&:hover': {
                                            color: 'iconHover.heart',
                                        },
                                        '&:disabled': {
                                            color: liked && 'iconHover.heart',
                                        }
                                    }}
                                    aria-label="like post">
                                    <FavoriteIcon />
                                </IconButton>
                                {likesCount}
                                <IconButton icon="comment" sx={{
                                    ml: 2,
                                    '&:hover': {
                                        color: 'iconHover.comment',
                                    }
                                }} aria-label="comment on post">
                                    <CommentIcon />
                                </IconButton>
                                {comments}
                                <IconButton sx={{
                                    ml: 2,
                                    '&:hover': {
                                        color: 'iconHover.general',
                                    }
                                }}>
                                    <ShareIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={handleBookmark} sx={{
                                    ml: 1,
                                    color: bookmarked && 'iconHover.general',
                                    '&:hover': {
                                        color: 'iconHover.general',
                                    }
                                }}>
                                    <BookmarkIcon />
                                </IconButton>
                            </Box>
                        </Box>}
                    </>
                )}
            </Box>
            <DeletePostDialog open={deleteOpen} onClose={handleDeleteClose} onDelete={handleDeleteSubmit} deleteSubmitting={deleteSubmitting} />
        </>
    );
};

export default Post;