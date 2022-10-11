import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderComponent = styled.header`
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 20px;

  a {
    text-decoration: none;
    font-size: 20px;
    margin: 0 15px;
    color: #000;
  }
`;

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <HeaderComponent>
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
    </HeaderComponent>
  );
};

export default Header;
