import { API_URL } from "@/api-constants";
import { CoinDetailInterface } from "@/interfaces/coinDetailInterface";
import { CoinInterface } from "@/interfaces/coinInterfaces";
import moment from "moment";

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
    const response = await fetch(`${API_URL}/coins/${cryptoId}`);
    return await response.json();;
  },

  async getCoinHisto(cryptoId: string): Promise<any> {
    let histo: string[] = []
    for(let i = 0; i <= 7; i++){
      histo.push(moment().subtract(i, 'days').format("DD-MM-YYYY"))
    }
    histo = await Promise.all(histo.map(async date => {
      console.log(`${API_URL}/coins/${cryptoId}/history?date=${date}`)
        const response = await fetch(`${API_URL}/coins/${cryptoId}/history?date=${date}`);
        return date + " : " +(await response.json()).market_data.current_price.eur + " €"?? "";

    }))
    
    return histo;
  },
}