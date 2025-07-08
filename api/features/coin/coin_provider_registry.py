from .providers.coin_gecko_provider import CoinGeckoProvider
# from .providers.coin_marketcap_provider import (
#     CoinMarketCapProvider  # Example for future
# )

PROVIDER_REGISTRY = {
    "coingecko": CoinGeckoProvider,
    # "coinmarketcap": CoinMarketCapProvider,
}
