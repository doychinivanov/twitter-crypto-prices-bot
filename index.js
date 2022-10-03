import readWriteClient from './config/twitterClient.js'
import cb from 'cron'
import fetchPrices from './services/cryptoService.js'
import { tweetParser } from './utils/parser.js'

const tweetCryptoInfo = async () => {
    try {
        const response = await fetchPrices()
        const data = await response.json()
        await readWriteClient.v2.tweet(tweetParser(data))
    } catch (err) {
        console.error(err)
    }
}

const cron = new cb.CronJob('0 */2 * * *', () => tweetCryptoInfo())

cron.start()
 