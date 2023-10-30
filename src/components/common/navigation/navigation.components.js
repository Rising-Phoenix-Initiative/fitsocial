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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubjectIcon from '@mui/icons-material/Subject';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../utils/capitalize.util';
import { topics } from './topics.data';
import { generateSlug } from '../../../utils/generate-slug.util';

function Navigation() {
    return (
        <Box sx={{
            m: '80px 20px 20px 80px',
            p: '80px 60px 40px 40px',
            width: '275px',
            position: 'relative',

            '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                right: 0,
                width: '3px',
                height: '90%',
                background: 'linear-gradient(rgba(30,30,30, 0) 5%, rgba(30,30,30, 0.7) 10%, rgba(30,30,30, 1) 80%, rgba(30,30,30, 0) 95%)'
            }
        }}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/explore">
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary="Explore" />
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
                <AccordionDetails sx={{ p: 0, height: '300px', overflowY: 'scroll' }}>
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
                <Button sx={{ borderRadius: '40px', px: "40px", fontSize: '1.2rem', fontWeight: '700' }} color="primary" variant="contained">
                    New Post
                </Button>
            </Box>
        </Box>
    );
}

export default Navigation;