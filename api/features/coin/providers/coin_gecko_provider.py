import httpx
from ..coin_provider import CoinDataProvider
from features.coin.models.coin_data import CoinData
from typing import List
from features.trading_service import TradingService


COINGECKO_API_URL = (
    "https://api.coingecko.com/api/v3/coins/{}"
)
COINGECKO_MARKETS_URL = (
    "https://api.coingecko.com/api/v3/coins/markets"
)
COINGECKO_MARKET_CHART_URL = (
    "https://api.coingecko.com/api/v3/coins/{}/market_chart"
)


class CoinGeckoProvider(CoinDataProvider):
    def __init__(self):
        self.trading_service = TradingService()

    async def fetch_coin_data(self, coin_id: str) -> CoinData:
        url = COINGECKO_API_URL.format(coin_id)
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params={"localization": "false"})
            response.raise_for_status()
            data = response.json()

        market_data = data.get("market_data", {})
        # Try to use historical data from the main response if available
        historical_data = await self.get_normalized_historical_data(coin_id, data)
        forecasts = self.trading_service.calculate_forecasts(historical_data)
        return CoinData(
            id=data.get("id", ""),
            symbol=data.get("symbol", "").upper(),
            name=data.get("name", ""),
            image=data.get("image", {}).get("large"),
            price_usd=market_data.get("current_price", {}).get("usd"),
            percent_change_24h=market_data.get("price_change_percentage_24h"),
            market_cap_usd=market_data.get("market_cap", {}).get("usd"),
            volume_24h_usd=market_data.get("total_volume", {}).get("usd"),
            circulating_supply=market_data.get("circulating_supply"),
            total_supply=market_data.get("total_supply"),
            max_supply=market_data.get("max_supply"),
            rank=data.get("market_cap_rank"),
            last_updated=data.get("last_updated"),
            forecast24h=forecasts['forecast24h'],
            forecast7d=forecasts['forecast7d'],
            investment=forecasts.get('investment'),
            gain=forecasts.get('gain'),
        )

    async def fetch_top_coins(self, count: int) -> List[CoinData]:
        params = {
            "vs_currency": "usd",
            "order": "market_cap_desc",
            "per_page": count,
            "page": 1,
            "sparkline": "true"
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(
                COINGECKO_MARKETS_URL, params=params
            )
            response.raise_for_status()
            coins = response.json()
        result = []
        for coin in coins:
            # Use sparkline_7d.price for normalization/forecast
            prices = coin.get("sparkline_in_7d", {}).get("price", [])
            forecasts = self.trading_service.calculate_forecasts(prices)
            result.append(CoinData(
                id=coin.get("id", ""),
                symbol=coin.get("symbol", "").upper(),
                name=coin.get("name", ""),
                image=coin.get("image"),
                price_usd=coin.get("current_price"),
                percent_change_24h=coin.get("price_change_percentage_24h"),
                market_cap_usd=coin.get("market_cap"),
                volume_24h_usd=coin.get("total_volume"),
                circulating_supply=coin.get("circulating_supply"),
                total_supply=coin.get("total_supply"),
                max_supply=coin.get("max_supply"),
                rank=coin.get("market_cap_rank"),
                last_updated=coin.get("last_updated"),
                forecast24h=forecasts['forecast24h'],
                forecast7d=forecasts['forecast7d'],
                investment=forecasts.get('investment'),
                gain=forecasts.get('gain'),
            ))
        return result

    async def get_normalized_historical_data(self, coin_id: str, data=None) -> list[float]:
        # Try to use historical data from the provided data if available
        if data and "market_data" in data and "sparkline_7d" in data["market_data"]:
            # Example: use sparkline_7d or similar if available
            prices = data["market_data"]["sparkline_7d"].get("price", [])
            if prices:
                return prices
        # Otherwise, fetch from CoinGecko
        url = COINGECKO_MARKET_CHART_URL.format(coin_id)
        params = {"vs_currency": "usd", "days": 90, "interval": "daily"}
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
        prices = [point[1] for point in data.get("prices", [])]
        return prices
