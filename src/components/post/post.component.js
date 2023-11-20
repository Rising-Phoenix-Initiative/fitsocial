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

const Post = ({ post }) => {
    const { text, name, username, likes, comments, initialLiked = false, initialBookmarked = false } = post;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [liked, setLiked] = useState(initialLiked);
    const [bookmarked, setBookmarked] = useState(initialBookmarked);
    const realTimeDate = useFormatDate(post.$createdAt);

    useEffect(() => {
        if (name) {
            setIsLoadingData(false);
        } else {
            setIsLoadingData(true);
        }
    }, [name]);

    const handleLike = () => {
        // Here, you would also handle the update to the backend
        setLiked(!liked);
    };

    const handleBookmark = () => {
        // Here, you would also handle the update to the backend
        setBookmarked(!bookmarked);
    };

    return (
        <Box sx={{ my: 2, p: 2, border: '1px solid', borderRadius: '16px', borderColor: 'divider', width: '100%' }}>
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
                                {post.$createdAt !== post.$updatedAt && (
                                    <Typography variant="caption">(edited)</Typography>
                                )}
                            </Box>
                        </Box>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                    <Typography sx={{ my: 2 }}>{text}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={handleLike} sx={{
                                mr: 1,
                                color: liked && 'iconHover.heart',
                                '&:hover': {
                                    color: 'iconHover.heart',
                                }
                            }} aria-label="like post">
                                <FavoriteIcon />
                            </IconButton>
                            {likes}
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
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Post;