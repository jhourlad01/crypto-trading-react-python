from abc import ABC, abstractmethod
from typing import Any, Dict, List


class CoinDataProvider(ABC):

    @abstractmethod
    async def fetch_coin_data(self, coin_id: str) -> Dict[str, Any]:
        """
        Fetch data for a given coin by its ID.
        Returns a dictionary with coin data.
        """
        pass

    @abstractmethod
    async def fetch_top_coins(self, count: int) -> List[Dict[str, Any]]:
        """
        Fetch data for the top N coins by market cap.
        Returns a list of dictionaries with coin data.
        """
        pass
