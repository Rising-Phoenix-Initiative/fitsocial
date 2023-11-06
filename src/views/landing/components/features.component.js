import React from 'react';
import { Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleIcon from '@mui/icons-material/People';

const Features = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={4} sx={{ padding: theme.spacing(8, 2) }}>
            <Grid item xs={12}>
                <Typography variant="h2" component="h2" gutterBottom textAlign="center">
                    Features
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <FitnessCenterIcon fontSize="large" color="primary" />
                        <Typography variant="h5" component="h3" gutterBottom>
                            Connect with Trainers
                        </Typography>
                        <Typography variant="body1">
                            Find professional trainers for tailored advice and workout plans.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <TimelineIcon fontSize="large" color="primary" />
                        <Typography variant="h5" component="h3" gutterBottom>
                            Track Your Progress
                        </Typography>
                        <Typography variant="body1">
                            Keep tabs on your workouts, diet, and progress with easy-to-use tools.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <PeopleIcon fontSize="large" color="primary" />
                        <Typography variant="h5" component="h3" gutterBottom>
                            Join Fitness Communities
                        </Typography>
                        <Typography variant="body1">
                            Be a part of a supportive community that motivates each other to reach fitness goals.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Features;
