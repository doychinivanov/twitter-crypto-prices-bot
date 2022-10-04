import fetch, { Response } from 'node-fetch'
import { env } from '../config/envVars'

const fetchPrices = (): Promise<Response> => {
    return fetch(env.apiEndpoint)
}

export default fetchPrices