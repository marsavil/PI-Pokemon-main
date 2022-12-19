require('dotenv').config();
const express = require('express');
const {getAllPokemons,
    getPokemonByIdFromApi,
    getPokemonByNameFromApi,
    getPokemonsByNameFromDb,
    getPokemonByIdFromDb,
    getTypes} = require("../calls/index");
const { Router } = require('express');
const router = Router();
router.use(express.json()) 
const { Sequelize } = require('sequelize');
const {Pokemon, Type} = require('../db.js');

router.get('/', async (req, res, next) => {

  try {       
    const {name} = req.query;
      if (name){
        let search = await getPokemonByNameFromApi(name);
            if (search.error){ // no encontrado en la API externa
                search = await getPokemonsByNameFromDb(name); 

                if (!search){ // no encontrado en DB
                    return res.status(404).json({"message": "Pokemon not found"});
                }
            }
            return res.status(200).json(search);
        }
        const allPokemons = await getAllPokemons(); // si no llega nombre por query, busca todos los pokemons (ap y db)
        return res.status(200).json(allPokemons);
    } catch (error) {
        next(error);
    }
});

router.get('/:idPokemon', async (req, res, next) => {
    
    try {       
      const {idPokemon} = req.params;
      if (idPokemon){
        let search = null;
        if (isNaN(idPokemon)){ // si no es número busca en DB
          search = await getPokemonByIdFromDb(idPokemon);
        } else { // el id es número y busca en api
          search = await getPokemonByIdFromApi(idPokemon);
        }
        if (search){ 
          return res.status(200).json(search);
        }
      }
      return res.status(404).json({"message": "Pokemon Id not found"});
    } catch (error) {
      next(error);
    }
});



router.post('/', async (req, res, next) => {
  
  const {name, image, hp, attack, defense, speed, height, weigth, types} = req.body;

  if (!name || !image) {
    return res.status(404).json({error : 'Name and image are required fields.'});
  }


        //Verificar que el nombre este disponible.
  let search = await getPokemonByNameFromApi(name);

        // busqueda en la base de datos
  if (search.error){ // no encontrado en la API externa
    search = await getPokemonsByNameFromDb(name); }

  if (search){
            return res.status(400).json({ error: "Pokemon name already exists." });
  }
    try {
        const createdPokemon = await Pokemon.create(req.body);
        let allTypes = await Type.findAll()
        console.log(allTypes)
        if(!allTypes.length) {
          
          allTypes = await getTypes()
        }
        types.forEach(t => {
            let filteredType = allTypes.filter(type => type.name.toLowerCase() == t.toLowerCase())
            createdPokemon.addType(filteredType)
            console.log(filteredType)
          })
          

        return res.status(201).send('Pokemon created successfully'); 
    }  
    catch (error) {
        return error;
    }
    
});


module.exports = router;