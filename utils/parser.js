export const tweetParser = (data) => {
    return `BTC: $${data.bitcoin.usd}\n\nETH: $${data.ethereum.usd}\n\nADA: $${data.cardano.usd}\n\n\n#bitcoin #btc #ethereum #eth #ada #cardano #crypro #prices`
}