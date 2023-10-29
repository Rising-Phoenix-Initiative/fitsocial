import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  padding: 4rem 10%;
  text-align: center;
`;

const Testimonial = styled.blockquote`
  border-left: 4px solid ${props => props.theme.colors.secondary};
  padding-left: 1rem;
  font-style: italic;
  margin: 2rem 0;

  p {
    margin: 0.5rem 0;
  }

  cite {
    display: block;
    margin-top: 1rem;
    font-style: normal;
    font-weight: bold;
  }
`;

const Testimonials = () => (
    <TestimonialsContainer>
        <h2>What People Are Saying</h2>
        <Testimonial>
            <p>"I've met so many inspiring people through Fitsocial and improved my workouts!"</p>
            <cite>- Jane Doe</cite>
        </Testimonial>
        <Testimonial>
            <p>"Fitsocial keeps me motivated and makes fitness fun with community challenges."</p>
            <cite>- John Smith</cite>
        </Testimonial>
        {/* You can add more testimonials here */}
    </TestimonialsContainer>
);

export default Testimonials;