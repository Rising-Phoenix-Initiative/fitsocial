import React from 'react';
import { Grid, Paper, Typography, Avatar, useTheme } from '@mui/material';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

// Dummy avatar images, replace with actual image URLs or resources
const avatarJane = 'https://via.placeholder.com/150';
const avatarJohn = 'https://via.placeholder.com/150';

const Testimonials = () => {
  const theme = useTheme();

  const testimonials = [
    {
      quote: "I've met so many inspiring people through Fitsocial and improved my workouts!",
      author: 'Jane Doe',
      avatar: avatarJane,
    },
    {
      quote: "Fitsocial keeps me motivated and makes fitness fun with community challenges.",
      author: 'John Smith',
      avatar: avatarJohn,
    },
    // More testimonials can be added here
  ];

  return (
    <Grid container spacing={4} sx={{ padding: theme.spacing(8, 2), textAlign: 'center' }}>
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" gutterBottom>
          What People Are Saying
        </Typography>
      </Grid>
      {testimonials.map((testimonial, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Paper elevation={4} sx={{ padding: theme.spacing(4), margin: theme.spacing(2) }}>
            <Avatar sx={{ margin: 'auto', bgcolor: theme.palette.secondary.main }}>
              <InsertCommentIcon />
            </Avatar>
            <Typography variant="body1" sx={{ fontStyle: 'italic', marginTop: theme.spacing(2) }}>
              "{testimonial.quote}"
            </Typography>
            <Typography variant="subtitle1" component="cite" sx={{ display: 'block', marginTop: theme.spacing(1), fontWeight: 'bold' }}>
              - {testimonial.author}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Testimonials;
