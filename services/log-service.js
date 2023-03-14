import chalk from "chalk"
import dedent from "dedent"
import {getIcon} from '../services/weather-service.js'

const success=(success)=>{
  return `${chalk.bgGreen('SUCCESS')} ${success}`
}
const errors=(error)=>{
  return `${chalk.bgRed('ERROR')} ${error}` 
}

const help=()=>{
  return dedent`${chalk.bgBlue('HELP')}
          -s [CITY]----- save city as a default value to the next command
          -t [API_KEY]-- save token as a default value to the next command
          -h ----------- ${chalk.bgBlue('help')}
          ` 
}

const printWeather=(response)=>{
  console.log(dedent`
    Country: ${response.name}
            Weather: ${response.weather[0].main} 
              ${getIcon(response.weather[0].icon)}   ${response.weather[0].description}
              Temprature: ${response.main.temp}
              Humidity:   ${response.main.humidity}
  `); 
}

export {success, errors, help, printWeather} 