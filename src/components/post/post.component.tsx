import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { getInitials } from "../../utils/get-initials.util";
import Loader from "../loader/loader.component";
import { useEffect } from "react";
import { useFormatDate } from "../../hooks/use-format-date.hook";
import { useAuth } from "../../context/auth.context";
import { usePosts } from "../../context/posts.context";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BlockIcon from "@mui/icons-material/Block";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditPost from "./edit-post.component";
import DeletePostDialog from "./delete-post.component";

type PostProps = {
    post: {
        text: string;
        name: string;
        username: string;
        likes: number;
        likeIds: string[];
        comments: number;
        initialLiked?: boolean;
        initialBookmarked?: boolean;
        userId: string;
        $createdAt: string; // Assuming this is a string representation of a date
        edited?: boolean;
        uid: string;
    };
};

const Post: React.FC<PostProps> = ({ post }) => {
    const {
        text,
        name,
        username,
        likes,
        likeIds,
        comments,
        initialLiked = false,
        initialBookmarked = false,
    } = post;
    const { user } = useAuth();
    const { addLikeToPost, removeLikeFromPost, updatePost, deletePost } =
        usePosts();

    const realTimeDate = useFormatDate(post.$createdAt);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const [liked, setLiked] = useState<boolean>(post.initialLiked || false);
    const [likesCount, setLikesCount] = useState<number>(post.likes);
    const [likeIdsState, setLikeIds] = useState<string[]>(post.likeIds);
    const [isLikeButtonDisabled, setIsLikeButtonDisabled] =
        useState<boolean>(false);

    const [bookmarked, setBookmarked] = useState(initialBookmarked);

    const [MenuDropdownAnchorEl, setMenuDropdownAnchorEl] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editSubmitting, setEditSubmitting] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);

    //TODO: BUG HERE when deleting a post
    useEffect(() => {
        if (name && user) {
            if (likeIds.includes(user.uid)) {
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
        if (user) {
            if (likeIdsState.includes(user.uid)) {
                setLiked(false);
                setLikesCount(likesCount - 1); // Decrement likes
                setLikeIds(likeIdsState.filter((id) => id !== user.uid)); // Remove userId from likeIds
                await removeLikeFromPost(post.uid, user.uid);
            } else {
                setLiked(true);
                setLikesCount(likesCount + 1); // Increment likes
                setLikeIds([...likeIdsState, user.uid]); // Add userId to likeIds
                await addLikeToPost(post.uid, user.uid);
            }
        }
        setIsLikeButtonDisabled(false);
    };

    const handleBookmark = () => {
        // Here, you would also handle the update to the backend
        setBookmarked(!bookmarked);
    };

    const handleMenuDropdownOpen = (event: any) => {
        setMenuDropdownAnchorEl(event.currentTarget);
    };

    const handleMenuDropdownClose = () => {
        setMenuDropdownAnchorEl(null);
    };

    const handleEdit = () => {
        handleMenuDropdownClose();
        setIsEditing(true);
    };

    const handleEditSubmit = async (
        editedContent: string,
        newImageURL?: string
    ) => {
        setEditSubmitting(true);
        if (user) {
            await updatePost(
                post.uid,
                { text: editedContent, edited: true },
                newImageURL
            );
            handleEditClose();
        }
        setEditSubmitting(false);
    };

    const handleEditClose = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        handleMenuDropdownClose();
        setDeleteOpen(true);
    };

    const handleDeleteSubmit = async () => {
        setDeleteSubmitting(true);
        if (user && user.uid === post.userId) {
            await deletePost(post.uid);
            handleDeleteClose();
        }
        setDeleteSubmitting(false);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    py: 2,
                    px: 4,
                    maxWidth: "100%",
                    borderBottom: "1px solid",
                    borderColor: "background.border",

                    "&:hover": {
                        backgroundColor: "background.paper",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease-in-out",
                    },
                }}
            >
                {isLoadingData || !user ? (
                    <Loader
                        size={50}
                        sx={{
                            width: "100%",
                            height: "100%",
                            background: "transparent",
                            py: "50px",
                        }}
                    />
                ) : (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar sx={{ mr: 1 }}>
                                    {getInitials(name)}
                                </Avatar>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    gap={1}
                                >
                                    <Typography variant="subtitle2">
                                        {name}
                                    </Typography>
                                    <Typography variant="caption">
                                        @{username}
                                    </Typography>
                                    <Typography variant="caption">
                                        &#8226;
                                    </Typography>
                                    <Typography variant="caption">
                                        {realTimeDate}
                                    </Typography>
                                    {post.edited && (
                                        <Typography variant="caption">
                                            (edited)
                                        </Typography>
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
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mb: 1.5,
                                        p: 1,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                }}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                }}
                            >
                                {post.userId === user.uid ? (
                                    <>
                                        <MenuItem onClick={handleEdit}>
                                            <ListItemIcon>
                                                <EditIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Edit Post" />
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete}>
                                            <ListItemIcon>
                                                <DeleteForeverIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Delete Post" />
                                        </MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <PersonAddIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Follow User" />
                                        </MenuItem>
                                        <MenuItem>
                                            <ListItemIcon>
                                                <BlockIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Block User" />
                                        </MenuItem>
                                    </>
                                )}
                            </Menu>
                        </Box>
                        {isEditing ? (
                            <EditPost
                                post={post}
                                onEditSubmit={handleEditSubmit}
                                editSubmitting={editSubmitting}
                                onEditClose={handleEditClose}
                            />
                        ) : (
                            <Typography
                                sx={{
                                    my: 3,
                                    mx: 1,
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                }}
                            >
                                {text}
                            </Typography>
                        )}
                        {!isEditing && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <IconButton
                                        disabled={isLikeButtonDisabled}
                                        onClick={handleLike}
                                        sx={{
                                            color: liked
                                                ? "iconHover.heart"
                                                : "inherit",
                                            "&:hover": {
                                                color: "iconHover.heart",
                                            },
                                            "&:disabled": {
                                                color: liked
                                                    ? "iconHover.heart"
                                                    : "inherit",
                                            },
                                        }}
                                        aria-label="like post"
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                    {likesCount}
                                    <IconButton
                                        sx={{
                                            ml: 2,
                                            "&:hover": {
                                                color: "iconHover.comment",
                                            },
                                        }}
                                        aria-label="comment on post"
                                    >
                                        <CommentIcon />
                                    </IconButton>
                                    {comments}
                                    <IconButton
                                        sx={{
                                            ml: 2,
                                            "&:hover": {
                                                color: "iconHover.general",
                                            },
                                        }}
                                    >
                                        <ShareIcon />
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <IconButton
                                        onClick={handleBookmark}
                                        sx={{
                                            ml: 1,
                                            color: bookmarked
                                                ? "iconHover.general"
                                                : "inherit",
                                            "&:hover": {
                                                color: "iconHover.general",
                                            },
                                        }}
                                    >
                                        <BookmarkIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </Box>
            <DeletePostDialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                onDelete={handleDeleteSubmit}
                deleteSubmitting={deleteSubmitting}
            />
        </>
    );
};

export default Post;