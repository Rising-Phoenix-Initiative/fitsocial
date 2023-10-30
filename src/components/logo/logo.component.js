import React from "react";
import { Navigate } from "react-router-dom/dist";
import { LogoContainer, LogoImage, Title, TitleGreen } from "./logo.styles";


const Logo = ({ noText = false }) => {
  const imagePath = process.env.PUBLIC_URL + '/fitsociallogo.png';  // Replace 'your-logo.png' with your actual file name

  return (
    <LogoContainer onClick={<Navigate to="/" />}>
      <LogoImage src={imagePath} alt="logo" />
      {noText ? null :
        (<Title>
          <TitleGreen>fit</TitleGreen>social
        </Title>)}
    </LogoContainer>
  );
}

export default Logo;