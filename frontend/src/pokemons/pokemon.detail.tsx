import { Alert, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as pokemonService from "../services/pokemon.service"

import { Page } from "../components/page";
import { Pokemon } from "../types/pokemon";
import { typeColors } from "../misc/typeColors";


type RouteProps = {
  id: string;
};

export const PokemonDetail: FC = () => {
  const { id } = useParams<RouteProps>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() =>  {

    pokemonService.getPokemon(Number(id))
      .then(value => {
        setPokemon(value)
      })
      .catch((error: Error) => {
        setError(error.message)
      })
  }, [id]);

  // Catch error state
  if( error ) {
    return (
      <Page>
        <Alert message={error} type="error" showIcon />
      </Page>
    );
  }

  // Catch empty pokemons state
  if( !pokemon ) {
    return (
      <Page>
        <h1>No pokemon with id '{id}' found.</h1>
      </Page>
    );
  }
  
  return (
    <Page>
      <h1>#{pokemon.id} {pokemon.name}</h1>
      <div>
        {pokemon.type.map(type => {
            return (
              <Tag color={typeColors[type.toLowerCase()]} key={type}>
                {type}
              </Tag>
            );
          })}
      </div>
      <p>{JSON.stringify(pokemon)}</p>
    </Page>
  );
};
