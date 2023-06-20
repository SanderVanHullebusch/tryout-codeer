import { Injectable } from '@nestjs/common';
import * as pokemonJson from '../data/pokemons.json';
import { PokemonBase, PokemonDto } from '../dto/pokemon.dto';

@Injectable()
export class PokemonService {
    private pokemons: PokemonDto[];

    constructor() {
        this.pokemons = pokemonJson;
    }

    findAll(): PokemonDto[] {
        return this.pokemons;
    }
    
    findMaxBase(): PokemonBase {
        // const initial = {
        //     base: {
        //         'HP': 0,
        //         'Attack': 0,
        //         'Defense': 0,
        //         'Sp. Attack': 0,
        //         'Sp. Defense': 0,
        //         'Speed': 0
        //     }
        // }
        return this.pokemons[150].base; // TODO: x
    }
    
    findOne(id:number): PokemonDto {
        return this.pokemons.find(item => {if(item.id == id){return item.id;}});
    }
}
