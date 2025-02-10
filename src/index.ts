import type { Response } from 'node-fetch';
import type { CronJob } from 'cron';
import type { ApiResponse } from './interface/ApiResponse';
import readWriteClient from './config/twitterClient';
import cb from 'cron';
import fetchPrices from './services/cryptoService';
import { tweetParser } from './utils/parser';

export const tweetCryptoInfo = async (): Promise<void> => {
    try {
        const response: Response = await fetchPrices();
        const data: ApiResponse = await response.json() as ApiResponse;
        await readWriteClient.v2.tweet(tweetParser(data));
    } catch (err) {
        console.error(err)
    }
};

export const cron: CronJob = new cb.CronJob('0 */2 * * *', () => tweetCryptoInfo());
cron.start();
 