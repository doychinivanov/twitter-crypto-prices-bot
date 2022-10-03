import { TwitterApi } from 'twitter-api-v2'
import * as dotenv from 'dotenv'
dotenv.config()

const client = new TwitterApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET
})

const readWriteClient = client.readWrite

export default readWriteClient
