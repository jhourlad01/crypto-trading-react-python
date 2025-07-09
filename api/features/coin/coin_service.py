from features.coin.models.coin_data import CoinData
from .coin_provider import CoinDataProvider
from typing import List


class CoinService:
    def __init__(self, provider: CoinDataProvider):
        self.provider = provider

    async def get_coin_data(self, coin_id: str) -> CoinData:
        coin = await self.provider.fetch_coin_data(coin_id)
        return coin

    async def get_top_coins(self, count: int) -> List[CoinData]:
        coins = await self.provider.fetch_top_coins(count)
        return coins
