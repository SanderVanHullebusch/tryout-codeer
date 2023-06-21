import { Alert, Button, Card, Tag, Progress } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as pokemonService from "../services/pokemon.service"

import { Page } from "../components/page";
import { DeleteOutlined } from "@ant-design/icons";

import { Pokemon, PokemonBase } from "../types/pokemon";
import { typeColors } from "../misc/types";
import styles from './pokemon.detail.module.css';


type RouteProps = {
  id: string;
};

export const PokemonDetail: FC = () => {
  const navigate = useNavigate();

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

  const deleteById = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()

    pokemonService.deletePokemon(id)
      .then(() => {
        navigate(`/`)
      })
      .catch((error: Error) => {
        setError(error.message)
      })
  }
  
  return (
    <Page>
      <Card>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1em', justifyContent: 'space-between' }}>
          <div>
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
          </div>
          <Button 
              type="primary" icon={<DeleteOutlined />} size='middle' 
              onClick={(e) => deleteById(e, Number(id))}
            />
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
