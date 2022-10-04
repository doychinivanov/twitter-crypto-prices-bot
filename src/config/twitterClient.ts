import { TwitterApi, TwitterApiReadWrite } from 'twitter-api-v2'
import { env } from './envVars'

const client: TwitterApi = new TwitterApi({
    appKey: env.appKey,
    appSecret: env.appSecret,
    accessToken: env.accessToken,
    accessSecret: env.accessSecret
})

const readWriteClient: TwitterApiReadWrite = client.readWrite

export default readWriteClient
