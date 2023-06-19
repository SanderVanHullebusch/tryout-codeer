import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemons/pokemon.module';

@Module({
    imports: [PokemonModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
