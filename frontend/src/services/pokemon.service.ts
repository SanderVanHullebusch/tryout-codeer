const API_URL = 'http://localhost:4000'

export const getPokemons = () => {
    return fetch(API_URL + "/pokemons")
        .then((response: Response) => response.json())
        .catch((error: Error) => {
            throw new Error(`Couldn't fetch pokemon: "${error}"`);
        })
}

export const getMaxPokemonBase = () => {
    return fetch(API_URL + "/pokemons/maxbase")
        .then((response: Response) => response.json())
        .catch((error: Error) => {
            throw new Error(`Couldn't fetch pokemon: "${error}"`);
        })
}

export const getPokemon = (id: number) => {
    return fetch(API_URL + `/pokemons/${id}`)
        .then((response: Response) => response.json())
        .catch(() => {
            // Number(0) returns 0 (=== false)
            if( id === 0 ) {
                throw new Error(`Pokemon developers don't start counting from zero apparently.`);
            }
            if( !Number(id) ) {
                throw new Error(`Id must be of type number`);
            }
            throw new Error(`Couldn't fetch pokemon with id ${id}`);
        })
}

export const deletePokemon = (id: number) => {
    return fetch(API_URL + `/pokemons/${id}`, { method: 'DELETE' })
        .then((response: Response) => response)
        .catch((error: Error) => {
            throw new Error(`Couldn't delete pokemon with id ${id}: ${error}`);
        })
}