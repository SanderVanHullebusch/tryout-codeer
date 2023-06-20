export enum PokemonType {
    BUG = "bug",
    DARK = "dark",
    DRAGON = "dragon",
    ELECTRIC = "electric",
    FAIRY = "fairy",
    FIRE = "fire",
    FIGHTING = "fighting",
    FLYING = "flying",
    GHOST = "ghost",
    GRASS = "grass",
    GROUND = "ground",
    ICE = "ice",
    NORMAL = "normal",
    POISON = "poison",
    PSYCHIC = "psychic",
    ROCK = "rock",
    STEEL = "steel",
    WATER = "water",
}

export type PokemonBase = {
    "HP": string,
    "Attack": string,
    "Defense": string,
    "Sp. Attack": string,
    "Sp. Defense": string,
    "Speed": string
}

export type Pokemon = {
    "id": number,
    "name": string,
    "type": PokemonType[],
    "base": PokemonBase
}