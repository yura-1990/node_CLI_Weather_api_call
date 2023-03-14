import https from "https";
import axios from "axios";
import { TOKEN_DICTIONARY, getKeyValue } from "./storage-service.js";

const getIcon=icon=>{
  switch (icon.slice(0, 2)) {
    case '01':
      return "☀"
    case '02':
      return "⛅"
    case '03':
      return "☁"
    case '04':
      return "☁"
    case '09':
      return "🌧"
    case '10':
      return "🌦"
    case '11':
      return "🌩"
    case '13':
      return "❄"
    case '50':
      return "🌦"
  }
}


async function getWeather(city) { 
  const token = await getKeyValue(process.env.TOKEN ?? TOKEN_DICTIONARY.token);
  
  if (!token) {
    throw new Error("Token does not exist to get the weather data!");
  }
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`);
/*   url.searchParams.append("q", city);
  url.searchParams.append("appid", token);
  url.searchParams.append("limit", 5); */

  /* https.get(url, (response) => {
    let res='';
    response.on("data", (chunk) => {
      res += chunk;
    });

    response.on("end", () => {
      console.log(res);
    });
  }); */

  const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather`,{
    params:{
      q: city,
      appid:token
    }
  })
  
  return data
}

export {getWeather,getIcon}