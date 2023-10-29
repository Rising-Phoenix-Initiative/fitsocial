import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 4rem 10%;
  text-align: center;
`;

const FeatureBlock = styled.div`
  margin-bottom: 2rem;
`;

const Features = () => (
    <FeaturesContainer>
        <h2>Features</h2>
        <FeatureBlock>
            <h3>Connect with Trainers</h3>
            <p>Find professional trainers for tailored advice and workout plans.</p>
        </FeatureBlock>
        <FeatureBlock>
            <h3>Track Your Progress</h3>
            <p>Keep tabs on your workouts, diet, and progress with easy-to-use tools.</p>
        </FeatureBlock>
        <FeatureBlock>
            <h3>Join Fitness Communities</h3>
            <p>Be a part of a supportive community that motivates each other to reach fitness goals.</p>
        </FeatureBlock>
        {/* Add as many features as you want */}
    </FeaturesContainer>
);

export default Features;