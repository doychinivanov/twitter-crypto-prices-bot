import * as dotenv from 'dotenv';
import type { Env } from '../interface/Env';
dotenv.config();

const appKey = process.env.APP_KEY as string;
const appSecret = process.env.APP_SECRET as string;
const accessToken = process.env.ACCESS_TOKEN as string;
const accessSecret = process.env.ACCESS_SECRET as string;
const apiEndpoint = process.env.API_ENDPOINT as string;

export const env: Env =  {
    appKey,
    appSecret,
    accessToken,
    accessSecret,
    apiEndpoint
};