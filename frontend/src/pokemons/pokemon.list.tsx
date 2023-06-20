import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as pokemonService from "../services/pokemon.service"
import { Pokemon, PokemonType } from "../types/pokemon";

import { Page } from "../components/page";
import { Alert, Table, Tag } from "antd";
import { typeColors } from "../misc/typeColors";

import './../styles/antd/table.css';

export const PokemonList: FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)

    pokemonService.getPokemons()
      .then(value => {
        setLoading(false)
        setPokemons(value)
      })
      .catch((error: Error) => {
        setLoading(false)
        setError(error.message)
      })
  }, []);

  // Catch error state
  if( error ) {
    return (
      <Page>
        <Alert message={error} type="error" showIcon />
      </Page>
    );
  }

  // Catch empty pokemons state
  if( !pokemons ) {
    return (
      <Page>
        <h1>No pokemons.</h1>
      </Page>
    );
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '5em' // Give ID enough space to contain 3 characters
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '15em', // Give types enough (but not too much) space
      render: (types: PokemonType[]) => (
        <>
          {types.map(type => {
            return (
              <Tag color={typeColors[type.toLowerCase()]} key={type}>
                {type}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  
  return (
    <Page>
      <Table 
        dataSource={pokemons} 
        columns={columns} 
        rowKey="id" 
        loading={loading}

        onRow={(record) => ({
          onClick: () => navigate(`/${record.id}`)})
        }
      />
    </Page>
  );
};
