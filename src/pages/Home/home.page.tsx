import React from "react";
import TopBar from "../../components/TopBar/topBar.component";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <TopBar>
      <h1>Home</h1>
    </TopBar>
  );
};

export default HomePage;
