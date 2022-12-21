import axios from 'axios';
import { GET_POKEMONS, GET_TYPES, FILTER_BY_ORIGIN, ORDER_BY_NAME, ORDER_BY_ATTACK, SORT_BY_TYPE } from '../actions_Type';

export function getPokemons(){
    return async function (dispatch){
        var json = await axios.get ('http://localhost:3001/pokemons');
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        })
    }
}
export function getTypes(){
    return async function (dispatch){
        var json = await axios.get('http:///localhost:3001/types');
        return dispatch ({
            type: GET_TYPES,
            payload: json.data
        })
    }
}
export function filterPokemonsByOrigin(payload){
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}
export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}
export function sortByType(payload){
    return {
        type: SORT_BY_TYPE, 
        payload
    }
}