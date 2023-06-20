const API_URL = 'http://localhost:4000'

export const getPokemons = () => {
    return fetch(API_URL + "/pokemons")
        .then((response: Response) => response.json())
        .catch((error: Error) => {
            throw new Error(`Couldn't fetch pokemon: "${error}"`);
        })
}

export const getPokemon = (id: number) => {
    return fetch(API_URL + `/pokemons/${id}`)
        .then((response: Response) => response.json())
        .catch(() => {
            if( !Number(id) ) {
                throw new Error(`Id must be of type number`);
            }
            throw new Error(`Couldn't fetch pokemon with id ${id}`);
        })
}