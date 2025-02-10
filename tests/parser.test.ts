import type { ApiResponse } from "../src/interface/ApiResponse";
import { describe, it, expect } from "vitest";
import { tweetParser } from "../src/utils/parser";

describe("tweetParser", () => {
  it("should correctly format the tweet with valid data", () => {
    const mockData: ApiResponse = {
      bitcoin: { usd: 25000 },
      ethereum: { usd: 1700 },
      solana: { usd: 25 },
    };

    const result = tweetParser(mockData);

    expect(result).toBe(
      "$BTC: $25000\n\n$ETH: $1700\n\n$SOL: $25\n\n\n"
    );
  });

  it("should handle edge case values like 0 or very small numbers", () => {
    const mockData: ApiResponse = {
      bitcoin: { usd: 0 },
      ethereum: { usd: 0.0001 },
      solana: { usd: 0.01 },
    };

    const result = tweetParser(mockData);

    expect(result).toBe(
      "$BTC: $0\n\n$ETH: $0.0001\n\n$SOL: $0.01\n\n\n"
    );
  });

  it("should handle negative values correctly", () => {
    const mockData: ApiResponse = {
      bitcoin: { usd: -1000 },
      ethereum: { usd: -50 },
      solana: { usd: -0.01 },
    };

    const result = tweetParser(mockData);

    expect(result).toBe(
      "$BTC: $-1000\n\n$ETH: $-50\n\n$SOL: $-0.01\n\n\n"
    );
  });
});
