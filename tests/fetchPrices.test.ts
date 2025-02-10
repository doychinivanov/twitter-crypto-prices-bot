import type { Mock } from 'vitest';
import fetch, { Response } from 'node-fetch';
import fetchPrices from '../src/services/cryptoService';
import { vi, describe, it, expect } from 'vitest';

vi.mock('node-fetch', async () => {
  const actual = await vi.importActual('node-fetch');
  return {
    ...actual,
    default: vi.fn(),
  };
});

vi.mock('../src/config/envVars', () => ({
  env: {
    apiEndpoint: 'https://mock-api-endpoint.com',
  },
}));

describe('fetchPrices', () => {
  it('should call fetch with the mocked API endpoint', async () => {
    const mockResponse = new Response(JSON.stringify({ bitcoin: { usd: 42000 } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    (fetch as unknown as Mock).mockResolvedValueOnce(mockResponse);

    const result = await fetchPrices();

    expect(fetch).toHaveBeenCalledWith('https://mock-api-endpoint.com');
    expect(result).toBe(mockResponse);
  });
});
