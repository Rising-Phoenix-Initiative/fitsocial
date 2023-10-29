import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.section`
  padding: 4rem 10%;
`;

const Question = styled.article`
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Answer = styled.div`
  margin-top: 0.5rem;
`;

const FAQ = () => {
    const [visibleAnswer, setVisibleAnswer] = useState(null);

    const questionsAnswers = [
        { question: 'Do I need a personal trainer to use Fitsocial?', answer: 'No, Fitsocial is for everyone interested in fitness, whether you have a trainer or not.' },
        { question: 'Can I share my fitness journey on Fitsocial?', answer: 'Absolutely! Fitsocial encourages sharing your fitness stories to motivate others.' },
        // Add more FAQs here...
    ];

    const handleClick = index => {
        setVisibleAnswer(index === visibleAnswer ? null : index);
    };

    return (
        <FAQContainer>
            <h2>Frequently Asked Questions</h2>
            {questionsAnswers.map((item, index) => (
                <Question key={index} onClick={() => handleClick(index)}>
                    <h3>{item.question}</h3>
                    {visibleAnswer === index && <Answer>{item.answer}</Answer>}
                </Question>
            ))}
        </FAQContainer>
    );
};

export default FAQ;