import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/page";

export const PokemonList: FC = () => {
  // Add here a table with the data from the server
  return (
    <Page>
      <Link to="/example">example</Link>
    </Page>
  );
};
