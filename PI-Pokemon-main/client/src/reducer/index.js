import { GET_POKEMONS,
  GET_TYPES,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  SORT_BY_TYPE,
  GET_POKEMON_BY_NAME, 
  POST_POKEMON,
  GET_POKEMON_BY_ID} from '../actions_Type/index.js'

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  pokemonFound: {},
  pokemonDetails: {},
  types: [],
  
}


function rootReducer(state = initialState, action){
  switch (action.type){
    case GET_POKEMONS :
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload
      }
    case GET_TYPES :
      return {
        ...state,
        types: action.payload
      }
    case FILTER_BY_ORIGIN :
      const allPokemons = state.pokemons;
      const filteredPokemons = action.payload === 'db' ? allPokemons.filter(p => p.createdInDB): allPokemons.filter(p => !p.createdInDB)
      return {
        ...state,
        filteredPokemons: action.payload === 'all' ? state.pokemons : filteredPokemons
      }
    case ORDER_BY_NAME :
      let pokemons = state.pokemons.map(p => {
        return p})
      let sortedPokemons = action.payload === 'A-to-Z' ?
      state.filteredPokemons.sort(function(a,b){
        if(a.name > b.name){
          return 1
        }
        if(b.name > a.name){
          return -1
        }
        return 0
      }):
      state.filteredPokemons.sort(function(a,b){
        if(a.name>b.name){
          return -1
        }
        if(b.name>a.name){
          return 1
        }
        return 0
      })
      return {
        ...state,
        filteredPokemons:  sortedPokemons
      }
    case ORDER_BY_ATTACK :
      let sortedPokemonsByAttack = action.payload === 'asc' ?
      state.filteredPokemons.sort(function(a,b){
        if(a.attack > b.attack){
          return 1
        }
        if(b.attack > a.attack){
          return -1
        }
        return 0
      }):
      state.filteredPokemons.sort(function(a,b){
        if(a.attack>b.attack){
          return -1
        }
        if(b.attack>a.attack){
          return 1
        }
        return 0
      })
      return {
        ...state,
        filteredPokemons: sortedPokemonsByAttack
      }
    case SORT_BY_TYPE :
      //console.log(action.payload)
      let sortedPokemonsByType = state.filteredPokemons.filter((p) => {
        let types = []
        p.types.forEach(t => {
          if(t.name === action.payload){
            console.log(t.name)
            types.push(t.name)
            console.log(types)
          }
        });
        if(types.length){
          return p
        }
      })
      return {
        ...state,
        filteredPokemons: action.payload === 'allTypes' ? state.pokemons: sortedPokemonsByType
      }
    case  GET_POKEMON_BY_NAME :
      return {
        ...state,
        filteredPokemons: [action.payload]
      }
    case POST_POKEMON :
      return {
        ...state,
      }
      case GET_POKEMON_BY_ID :
        return {
          ...state,
          pokemonDetails: action.payload
        }
    default:
      return state;

  }

}

export default rootReducer