import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        const initial = {
            'HP': 0,
            'Attack': 0,
            'Defense': 0,
            'Sp. Attack': 0,
            'Sp. Defense': 0,
            'Speed': 0
        }
        const max = this.pokemons.reduce((max, current) => {
            for (const [key, value] of Object.entries(current.base)) {
                if( value > max[key] ) {
                    max[key] = value
                }
            }
            return max;
        }, initial)
        return max;
    }
    
    findOne(id:number): PokemonDto {
        return this.pokemons.find(item => {if(item.id == id){return item.id;}});
    }

    deleteOne(id: number){
        const pokemonIndex = this.pokemons.findIndex((item) => { return item.id == id;});
        if (pokemonIndex === -1) throw new HttpException(`No pokemon found with id ${id}`, HttpStatus.NOT_FOUND);
        this.pokemons.splice(pokemonIndex, 1);
        return `Pokemon with id ${id} has been deleted successfully.`;
    }
    
    addOne(values: Omit<PokemonDto, 'id'>){
        // Get the max id currently set
        const maxId = this.pokemons.reduce((max: number, curr: PokemonDto) => {
            return curr.id > max ? curr.id : max;
        }, 0);
        
        const pokemon : PokemonDto = {
            id: maxId + 1,
            ...values
        }
        pokemonJson.push(pokemon)
    }
}
