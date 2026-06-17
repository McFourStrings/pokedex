import axios from "axios";

export const client = axios.create({
baseURL: "https://pokeapi.co/api/v2/"

});

export function getAllPokemon(limit, offset) {

    console.log(limit, offset);
    return client.get('/pokemon', {
        params: {
            limit,
            offset
        }
    });
}

export function getPokemonbyId(id) {
    return client.get(`/pokemon/${id}/`);
}




export function getPokemonGen1(limit = 151, offset = 0){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });
}
export function getPokemonGen2(limit = 100, offset = 151){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen3(limit = 135, offset = 251){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen4(limit = 107, offset = 386){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen5(limit = 156, offset = 493){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen6(limit = 72, offset = 649){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen7(limit = 88, offset = 721){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen8(limit = 96, offset = 809){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getPokemonGen9(limit = 120, offset = 905){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function getMega(limit = 325, offset = 1025){
    return client.get(`/pokemon`, {
        params: {
            limit,
            offset
        }
    });

}

export function searchPokemon(name) {
    return client.get(`/pokemon/${name}/`);
}






export function getPokemonDetails(id) {
  return client.get(`/pokemon/${id}/`);
}

export function getPokemonSpecies(id) {
  return client.get(`/pokemon-species/${id}/`);
}

export function getPokemonSpeciesnoId() {
  return client.get(`/pokemon-species/`);
}

export function getTypeDetails(id) {
  return client.get(`/type/${id}/`);
}