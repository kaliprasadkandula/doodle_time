import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;

const Header = ({title,subtitle}) => {
  return (
    <HeaderContainer>
      <h1>{title??`title not specified`}</h1>
      <p>{subtitle??`subtitle not specified`}</p>
    </HeaderContainer>
  );
};

export default Header;
