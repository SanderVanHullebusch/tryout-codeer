import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PokemonDto } from '../dto/pokemon.dto';
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

    @Get('/:id')
    @ApiOperation({ summary: 'Get a pokemon by id' })
    @ApiOkResponse({ type: [PokemonDto] })
    public findOne(@Param('id') id: number): PokemonDto {
        return this.pokemonService.findOne(id);
    }
}
