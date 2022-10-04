import { Response } from 'node-fetch'
import readWriteClient from './config/twitterClient'
import cb, { CronJob } from 'cron'
import fetchPrices from './services/cryptoService'
import { tweetParser } from './utils/parser'
import { ApiResponse } from './interface/ApiResponse'

const tweetCryptoInfo = async (): Promise<void> => {
    try {
        const response: Response = await fetchPrices()
        const data: ApiResponse = await response.json() as ApiResponse
        await readWriteClient.v2.tweet(tweetParser(data))
        console.log('done')
    } catch (err) {
        console.error(err)
    }
}

const cron: CronJob = new cb.CronJob('0 */2 * * *', () => tweetCryptoInfo())

cron.start()
 