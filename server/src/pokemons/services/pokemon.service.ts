import { Injectable } from '@nestjs/common';
import * as pokemonJson from '../data/pokemons.json';
import { PokemonDto } from '../dto/pokemon.dto';

@Injectable()
export class PokemonService {
    private pokemons: PokemonDto[];

    constructor() {
        this.pokemons = pokemonJson;
    }

    findAll(): PokemonDto[] {
        return this.pokemons;
    }
    
    findOne(id:number): PokemonDto {
        return this.pokemons.find(item => {if(item.id == id){return item.id;}});
    }
}
