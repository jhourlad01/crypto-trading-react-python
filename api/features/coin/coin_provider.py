from abc import ABC, abstractmethod
from typing import List
from features.coin.models.coin_data import CoinData


class CoinDataProvider(ABC):

    @abstractmethod
    async def fetch_coin_data(self, coin_id: str) -> CoinData:
        """
        Fetch data for a given coin by its ID.
        Returns a CoinData object.
        """
        pass

    @abstractmethod
    async def fetch_top_coins(self, count: int) -> List[CoinData]:
        """
        Fetch data for the top N coins by market cap.
        Returns a list of CoinData objects.
        """
        pass

    @abstractmethod
    async def get_normalized_historical_data(self, coin_id: str) -> List[float]:
        """
        Fetch and normalize historical price data for a given coin.
        Returns a list of floats (prices) or a standard format agreed upon.
        """
        pass
