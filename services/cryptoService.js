import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
dotenv.config()

const fetchPrices = () => {
    return fetch(process.env.API_ENDPOINT)
}

export default fetchPrices