import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const questionsAnswers = [
        {
            id: 'panel1',
            question: 'Do I need a personal trainer to use Fitsocial?',
            answer: 'No, Fitsocial is for everyone interested in fitness, whether you have a trainer or not.'
        },
        {
            id: 'panel2',
            question: 'Can I share my fitness journey on Fitsocial?',
            answer: 'Absolutely! Fitsocial encourages sharing your fitness stories to motivate others.'
        },
        // Add more FAQs here...
    ];

    return (
        <div>
            <Typography variant="h2" component="h2" gutterBottom textAlign="center">
                Frequently Asked Questions
            </Typography>
            {questionsAnswers.map((faq) => (
                <Accordion key={faq.id} expanded={expanded === faq.id} onChange={handleChange(faq.id)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FAQ;
