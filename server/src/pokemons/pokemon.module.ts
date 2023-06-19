import { Module } from '@nestjs/common';
import { PokemonController } from './controllers';
import { PokemonService } from './services';

@Module({
    imports: [],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule {}
