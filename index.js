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

const morningJob = new cb.CronJob('34 00 * * *', () => tweetCryptoInfo())
const noonJob = new cb.CronJob('0 13 * * *', () => tweetCryptoInfo())
const afternoonJob = new cb.CronJob('0 18 * * *', () => tweetCryptoInfo())
const eavningJob = new cb.CronJob('0 22 * * *', () => tweetCryptoInfo())

morningJob.start()
noonJob.start()
afternoonJob.start()
eavningJob.start()
 