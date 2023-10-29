import React from 'react';
import styled from 'styled-components';
import backgroundImage from "../../../assets/hero-background.png";

const HeroContainer = styled.section`
  position: relative; // Relative to the current container
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${props => props.theme.colors.onBackground};

  // Pseudo-element for the overlay
  &::before {
    content: '';
    position: absolute; // Cover the parent
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
    z-index: 1; // Above the image, below the content
  }

  // We need to ensure that the content is above the overlay
  & > * {
    position: relative;
    z-index: 2; // Higher than the overlay's z-index to keep content above
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  padding: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    background-color: ${props => props.theme.brand.primary};
    color: ${props => props.theme.colors.onPrimary};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${props => props.theme.colors.primaryVariant};
    }
  }
`;

const Hero = () => (
    <HeroContainer>
        <HeroContent>
            <h1>Welcome to Fitsocial</h1>
            <p>Connect with fitness enthusiasts around the world</p>
            <button>Join Now</button>
        </HeroContent>
    </HeroContainer>
);

export default Hero;