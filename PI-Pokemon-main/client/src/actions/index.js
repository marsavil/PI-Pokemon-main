import axios from "axios";
import {
  GET_POKEMONS,
  GET_TYPES,
  FILTER_BY_ORIGIN,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  SORT_BY_TYPE,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
} from "../actions_Type";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}
export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http:///localhost:3001/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}
export function filterPokemonsByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}
export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}
export function sortByType(payload) {
  return {
    type: SORT_BY_TYPE,
    payload,
  };
}
export function getPokemonByName(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/pokemons?name=" + payload
      );
      return dispatch({
        type: GET_POKEMON_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      
      alert(' No pokemon exists with the name given');
    }
  };
}
export function getPokemonById(id){
  return async function (dispatch){
    try {
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`, {});
      console.log(json)
      return dispatch({
        type: GET_POKEMON_BY_ID,
        payload: json.data
      })

    } catch (error) {
      console.log('error en getPokemonById')
    }
  }
}
export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.post("http://localhost:3001/pokemon", payload);
      console.log(json)
      alert(json.data)
      return json
    } catch (error) {
      alert (error.response.data.error)
    }
    
  };
}
