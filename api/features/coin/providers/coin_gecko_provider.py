import httpx
from ..coin_provider import CoinDataProvider
from shared.models import CoinData
from typing import List


COINGECKO_API_URL = "https://api.coingecko.com/api/v3/coins/{}"
COINGECKO_MARKETS_URL = "https://api.coingecko.com/api/v3/coins/markets"


class CoinGeckoProvider(CoinDataProvider):
    async def fetch_coin_data(self, coin_id: str) -> CoinData:
        url = COINGECKO_API_URL.format(coin_id)
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params={"localization": "false"})
            response.raise_for_status()
            data = response.json()

        market_data = data.get("market_data", {})
        return CoinData(
            id=data.get("id", ""),
            symbol=data.get("symbol", "").upper(),
            name=data.get("name", ""),
            price_usd=market_data.get("current_price", {}).get("usd"),
            percent_change_24h=market_data.get("price_change_percentage_24h"),
            market_cap_usd=market_data.get("market_cap", {}).get("usd"),
            volume_24h_usd=market_data.get("total_volume", {}).get("usd"),
            circulating_supply=market_data.get("circulating_supply"),
            total_supply=market_data.get("total_supply"),
            max_supply=market_data.get("max_supply"),
            rank=data.get("market_cap_rank"),
            last_updated=data.get("last_updated"),
            forecast24h=None,
            forecast7d=None,
        )

    async def fetch_top_coins(self, count: int) -> List[CoinData]:
        params = {
            "vs_currency": "usd",
            "order": "market_cap_desc",
            "per_page": count,
            "page": 1,
            "sparkline": "false"
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(COINGECKO_MARKETS_URL, params=params)
            response.raise_for_status()
            coins = response.json()
        return [
            CoinData(
                id=coin.get("id", ""),
                symbol=coin.get("symbol", "").upper(),
                name=coin.get("name", ""),
                price_usd=coin.get("current_price"),
                percent_change_24h=coin.get("price_change_percentage_24h"),
                market_cap_usd=coin.get("market_cap"),
                volume_24h_usd=coin.get("total_volume"),
                circulating_supply=coin.get("circulating_supply"),
                total_supply=coin.get("total_supply"),
                max_supply=coin.get("max_supply"),
                rank=coin.get("market_cap_rank"),
                last_updated=coin.get("last_updated"),
                forecast24h=None,
                forecast7d=None,
            ) for coin in coins
        ]
