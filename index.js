import getArgs from './helper/args.js';
import {success, errors, help, printWeather} from './services/log-service.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage-service.js';
import { getWeather, getIcon } from './services/weather-service.js';

async function saveToken(token){
  
  if (!token.length) {
    errors('Token does not exist!')
    return
  }
  
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    console.log(success('Token successfully saved'));
  } catch (error) {
    errors(error.message)
  }
}

async function saveCity(city){
  
  if (!city.length) {
    errors('City does not exist!')
    return
  }
  
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    console.log(success('City successfully saved'));
  } catch (error) {
    errors(error.message)
  }
  
}

async function getForcast() {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
    const response = await getWeather(city)
    printWeather(response)
  } catch (error) {
    if (error?.response?.status==404) {
      console.log(errors('City not found'));
    }else if(error?.response?.status==401){
      console.log(errors('Invalid token'));
    } else {
      console.log(errors(error.message));
    }
  }
}

function startCLI(){
  const args = getArgs(process.argv) 

  if (args.h) {
    console.log(help());
  }
  
  if (args.c) {
    return saveCity(args.c)
  }
  
  if (args.t) {
    return saveToken(args.t)
  }
  
  getForcast()
}

startCLI()