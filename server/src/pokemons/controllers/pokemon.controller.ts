import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PokemonBase, PokemonDto } from '../dto/pokemon.dto';
import { PokemonService } from '../services';

@Controller('pokemons')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    @ApiOperation({ summary: 'Get a list of pokemon' })
    @ApiOkResponse({ type: [PokemonDto] })
    public findAll(): PokemonDto[] {
        return this.pokemonService.findAll();
    }
    
    @Get('/maxbase')
    @ApiOperation({ summary: 'Get an object with the max base stats of all pokemon' })
    @ApiOkResponse({ type: [PokemonBase] })
    public findMaxBase(): PokemonBase {
        return this.pokemonService.findMaxBase();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a pokemon by id' })
    @ApiOkResponse({ type: [PokemonDto] })
    public findOne(@Param('id') id: number): PokemonDto {
        return this.pokemonService.findOne(id);
    }
}
