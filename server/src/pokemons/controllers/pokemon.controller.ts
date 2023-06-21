import { Controller, Get, Delete, Param } from '@nestjs/common';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
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

    @Delete('/:id')
    @ApiOperation({ summary: 'Remove a pokemon by id' })
    @ApiOkResponse({ description: 'The pokemon is successfully deleted' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiNotFoundResponse({ description: 'Resource not found' })
    public deleteOne(@Param('id') id: number) {
        return this.pokemonService.deleteOne(id);
    }
}
