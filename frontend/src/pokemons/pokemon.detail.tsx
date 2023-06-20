import { Alert, Card, Tag, Progress } from "antd";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as pokemonService from "../services/pokemon.service"

import { Page } from "../components/page";
import { Pokemon, PokemonBase } from "../types/pokemon";
import { typeColors } from "../misc/typeColors";
import styles from './pokemon.detail.module.css';


type RouteProps = {
  id: string;
};

export const PokemonDetail: FC = () => {
  const { id } = useParams<RouteProps>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonMaxBase, setPokemonMaxBase] = useState<PokemonBase | null>(null);
  const [error, setError] = useState<string | null>(null)

  useEffect(() =>  {

    pokemonService.getPokemon(Number(id))
      .then(value => {
        setPokemon(value)
      })
      .catch((error: Error) => {
        setError(error.message)
      })

    pokemonService.getMaxPokemonBase()
      .then(value => {
        setPokemonMaxBase(value)
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
  if( !pokemon || !pokemonMaxBase ) {
    return (
      <Page>
        <h1>Loading...</h1>
      </Page>
    );
  }

  const baseElementComponent = (baseElement: string) => {
    let percent = (pokemon.base[baseElement as keyof PokemonBase] / pokemonMaxBase[baseElement as keyof PokemonBase]) * 100
    if(percent > 100) {
      percent = 100
    }

    return (
      <div key={baseElement} className={styles['base-element']}>
        <p>{baseElement}</p>
        <div className={styles['base-element__progress']}>
          <Progress showInfo={false} percent={percent} />
          <p>{pokemon.base[baseElement as keyof PokemonBase]}</p>
        </div>
      </div>
    )
  }
  
  return (
    <Page>
      <Card>
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
        <hr style={{ marginTop: '1.25em'}} />

        <div className={styles.base}>
          <div>
            {['HP', 'Speed'].map((baseElement: string) => {
              return baseElementComponent(baseElement)
            })}
          </div>
          <div>
            {['Attack', 'Defense'].map((baseElement: string) => {
              return baseElementComponent(baseElement)
            })}
          </div>
          <div>
            {['Sp. Attack', 'Sp. Defense'].map((baseElement: string) => {
              return baseElementComponent(baseElement)
            })}
          </div>
        </div>
      </Card>
    </Page>
  );
};
