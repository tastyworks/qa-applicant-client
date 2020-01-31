# tastyworks QA applicant project client

This library mocks out a basic implementation of tastyworks' Watchlists API using `localStorage`.

The `WatchlistService` object will be your primary interface. It contains the following methods:

`loadWwatchlists()` – Simulate loading any existing watchlists from the server. Returns `Promise<Watchlist[]>`.

`createWatchlist(name)` – Create a new watchlist with the given name and no symbols. Throws an error if a watchlist with the given name already exists.

`deleteWatchlist(name)` – Delete the watchlist with the given name.

---

`Watchlist` objects themselves also have these methods:

`addSymbol(symbol)` – Add the given symbol to the watchlist. Throws an error if the symbol is already in the watchlist.

`removeSymbol(symbol)` – Remove the given symbol from the watchlist.

A watchlist's symbols can be accessed via the `symbols` property, and its name via the `name` property.

Changes made to the watchlist via the above methods will automatically be persisted. Note that if you modify `symbols` directly, the changes to the watchlist will not be saved.


All methods return a `Promise` to simulate communication with a server.

Explore the documentation attached to these classes and methods for more details.
