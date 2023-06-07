import { API_URL } from "@/api-constants";
import { CoinDetailInterface } from "@/interfaces/coinDetailInterface";
import { CoinInterface } from "@/interfaces/coinInterfaces";

export default {
  async getCoinsList(): Promise<{ chunkedCoinsList: CoinInterface[], coinsList: CoinInterface[] }> {
    const response = await fetch(`${API_URL}/coins/list`);
    const coinsList = await response.json();
    const chunkedCoinsList = this.chunk(coinsList, 10);
    return { chunkedCoinsList, coinsList };
  },

  chunk(arr: any, n: any) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += n) {
      const chunk = arr.slice(i, i + n);
      chunks.push(chunk);
    }
    return chunks;
  },

  async getCoinDetail(cryptoId: string): Promise<CoinDetailInterface> {
    const response = await fetch(`${API_URL}/coins/list`);
    return await response.json();;
  }
}