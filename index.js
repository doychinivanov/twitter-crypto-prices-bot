import readWriteClient from './config/twitterClient.js'
// const CronJoB = require('cron').CronJob
import fetchPrices from './services/cryptoService.js'
import { tweetParser } from './utils/parser.js'

const testTweet = async () => {
    try {
        const response = await fetchPrices()
        const data = await response.json()
        await readWriteClient.v2.tweet(tweetParser(data))
    } catch (err) {
        console.error(err)
    }
}

testTweet()
// const job = new CronJoB('* * * * *', () => testTweet())

// job.start()
