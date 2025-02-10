import type { Mock } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { tweetCryptoInfo } from "../src/index";
import fetchPrices from "../src/services/cryptoService";
import readWriteClient from "../src/config/twitterClient";
import { tweetParser } from "../src/utils/parser";

vi.mock("../src/services/cryptoService", () => ({
  default: vi.fn(),
}));

vi.mock("../src/config/twitterClient", () => ({
  default: {
    v2: {
      tweet: vi.fn(),
    },
  },
}));

vi.mock("../src/utils/parser", () => ({
  tweetParser: vi.fn((data) => `Parsed tweet for ${data.crypto}: $${data.price}`),
}));

describe("tweetCryptoInfo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch prices, parse the data, and send a tweet", async () => {
    const mockApiResponse = {
      json: vi.fn().mockResolvedValue({
        crypto: "BTC",
        price: 50000,
      }),
    };

    (fetchPrices as Mock).mockResolvedValue(mockApiResponse);

    await tweetCryptoInfo();

    expect(fetchPrices).toHaveBeenCalledOnce();
    expect(mockApiResponse.json).toHaveBeenCalledOnce();
    expect(tweetParser).toHaveBeenCalledWith({ crypto: "BTC", price: 50000 });
    expect(readWriteClient.v2.tweet).toHaveBeenCalledWith("Parsed tweet for BTC: $50000");
  });

  it("should log an error if fetchPrices fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (fetchPrices as Mock).mockRejectedValue(new Error("API error"));

    await tweetCryptoInfo();

    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("API error"));
    consoleErrorSpy.mockRestore();
  });

  it("should log an error if the tweet fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const mockApiResponse = {
      json: vi.fn().mockResolvedValue({
        crypto: "BTC",
        price: 50000,
      }),
    };

    (fetchPrices as Mock).mockResolvedValue(mockApiResponse);
    (readWriteClient.v2.tweet as Mock).mockRejectedValue(new Error("Tweet error"));

    await tweetCryptoInfo();

    expect(fetchPrices).toHaveBeenCalledOnce();
    expect(mockApiResponse.json).toHaveBeenCalledOnce();
    expect(tweetParser).toHaveBeenCalledWith({ crypto: "BTC", price: 50000 });
    expect(readWriteClient.v2.tweet).toHaveBeenCalledWith("Parsed tweet for BTC: $50000");
    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Tweet error"));

    consoleErrorSpy.mockRestore();
  });
});
