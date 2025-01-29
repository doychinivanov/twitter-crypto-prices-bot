import { ApiResponse } from "../interface/ApiResponse"

export const tweetParser = (data: ApiResponse): string => {
    return `$BTC: $${data.bitcoin.usd}\n\n$ETH: $${data.ethereum.usd}\n\n$SOL: $${data.solana.usd}\n\n\n`
}