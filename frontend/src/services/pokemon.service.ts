const API_URL = 'http://localhost:4000'

export const getPokemons = () => {
    return fetch(API_URL + "/pokemons")
        .then((response: Response) => response.json())
        .catch((error: Error) => {
            throw new Error(`Couldn't fetch pokemon: "${error}"`);
        })
}