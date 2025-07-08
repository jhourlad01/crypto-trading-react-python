from .coin_provider import CoinDataProvider
from shared.models import CoinData
from typing import List


class CoinService:
    def __init__(self, provider: CoinDataProvider):
        self.provider = provider

    def compute_forecast(self, coin: CoinData, period: str = "24h") -> float:
        """
        Compute the forecast value for a coin for the given period.
        The real functionality is redacted for proprietary concerns.
        Currently, this returns zero.
        """
        return 0.0

    async def get_coin_data(self, coin_id: str) -> CoinData:
        coin = await self.provider.fetch_coin_data(coin_id)
        coin.forecast24h = self.compute_forecast(coin, period="24h")
        coin.forecast7d = self.compute_forecast(coin, period="7d")
        return coin

    async def get_top_coins(self, count: int) -> List[CoinData]:
        coins = await self.provider.fetch_top_coins(count)
        for coin in coins:
            coin.forecast24h = self.compute_forecast(coin, period="24h")
            coin.forecast7d = self.compute_forecast(coin, period="7d")
        return coins
