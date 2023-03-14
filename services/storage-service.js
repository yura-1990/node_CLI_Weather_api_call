import os from 'os'
import path from 'path';
import fs from 'fs'

const filePath = path.join(os.homedir(), 'weather-data.json')
const TOKEN_DICTIONARY ={
  token:'token',
  city: 'city'
}


async function saveKeyValue (key, value){
  let data={}
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath)
    data = JSON.parse(file)
  }
  data[key]=value
  await fs.promises.writeFile(filePath, JSON.stringify(data)) 
}

async function getKeyValue(key){
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath)
    const data = await JSON.parse(file)
    return data[key]
  }
  
  return undefined
}

async function isExist(path) {
  try {
    await fs.promises.stat(path)
    return true
  } catch (error) {
    return false
  }
}

export {saveKeyValue, getKeyValue,TOKEN_DICTIONARY}