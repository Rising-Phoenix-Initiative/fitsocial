import React from 'react';
import {
    DashboardContainer,
    MainContent,
    PostsList,
    SideContent,
    SafeArea,
    SearchComponent,
    SearchBar
} from './dashboard.styles';
import Post from '../../components/post/post.component';
import Navigation from '../../components/common/navigation/navigation.components';
import UserStats from './components/user-stats/user-stats.component';
import { Box, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';

// Mock data: array of post objects
const postData = [
    { id: 1, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 2, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 3, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 4, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 5, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 6, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 7, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 8, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 9, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 10, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 11, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 12, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 13, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 14, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 13, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    // Add as many posts as you like for testing purposes
];

const userData = {
    profilePicture: 'https://via.placeholder.com/150',
    name: 'John Doe',
    workouts: 150,
    achievements: ['5k Runner', '100 Workouts', 'Marathon Finisher'],
    goalProgress: 75, // This represents the percentage of the goal achieved.
    recentActivities: [
        'Completed a 10k run',
        'Joined "Summer Fitness Challenge"',
        'Achieved "5k Runner" badge',
        'Posted a new workout routine',
        'Shared a diet tip'
    ]
};


const Dashboard = () => {
    return (
        <DashboardContainer>
            <Navigation />
            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <MainContent>
                    <SearchComponent>
                        <SearchBar>
                            <IconButton size="small">
                                <Search />
                            </IconButton>
                            <InputBase placeholder="Search..." />
                        </SearchBar>
                    </SearchComponent>
                    <SafeArea>
                        <PostsList>
                            {/* Map through postData to render Post components */}
                            {postData.map(post => (
                                <Post
                                    key={post.id}
                                    content={post.content}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))}
                        </PostsList>
                    </SafeArea>
                </MainContent>
                <SideContent>
                    <UserStats user={userData} />
                </SideContent>
            </Box>
        </DashboardContainer>
    );
};

export default Dashboard;