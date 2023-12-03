import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import ProfileHeader from './components/profile-header.component';
import ProfileTabs from './components/profile-tabs.component';
import { usePosts } from '../../context/posts.context';
import { useAuth } from '../../context/auth.context';
import { getUser } from '../../services/users.service';

const ProfilePage = () => {
    const { userID } = useParams();
    const { user } = useAuth();
    const { posts } = usePosts();
    const [userData, setUserData] = useState({});
    const [isUserProfile, setIsUserProfile] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        async function fetchUserProfile(id) {
            console.log('id', id)
            console.log('user', user)
            setIsLoadingData(true);
            if (id === user.$id) {
                console.log('yes ')
                setIsUserProfile(true);
                setUserData(user);
            } else {
                console.log('no')
                setIsUserProfile(false);
                const response = await getUser(userID)
                console.log('response', response)
                setUserData(response);
            }
            setIsLoadingData(false);
        }
        fetchUserProfile(userID);
    }, [userID, user]);

    return (
        <Box sx={{ width: '100%' }}>
            <ProfileHeader userData={userData} />
            <ProfileTabs posts={posts} likes={posts} />
        </Box>
    );
};

export default ProfilePage;