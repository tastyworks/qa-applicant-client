import Watchlist from './watchlist';
import ls from 'local-storage';

const WATCHLISTS_KEY = 'tw-watchlists';

/**
 * Mock implementation of the tastyworks Watchlist API
 */
export default class WatchlistService {
    /**
     * Load any already-saved watchlists from a remote location.
     * @returns {Promise<Array<Watchlist>>} A list of `Watchlist` objects
     */
    static loadWatchlists() {
        return new Promise(resolve => {
            const currentWatchlists = ls(WATCHLISTS_KEY);
            if (currentWatchlists) {
                const lists = [];
                for (const [name, symbols] of Object.entries(currentWatchlists)) {
                    const newList = new Watchlist(name, WatchlistService._watchlistUpdated);
                    newList.symbols = symbols;
                    lists.push(newList);
                }
                resolve(lists);
            } else {
                resolve([]);
            }
        })
    }

    /**
     * Create an empty watchlist and save it
     * @param name {string} The name of the watchlist
     * @returns {Promise<Watchlist>} The new watchlist
     * @throws if the named watchlist already exists
     */
    static createWatchlist(name) {
        return new Promise((resolve, reject) => {
            const newWatchlist = new Watchlist(name, WatchlistService._watchlistUpdated);

            let currentWatchlists = ls(WATCHLISTS_KEY);
            if (!currentWatchlists) {
                currentWatchlists = {};
            }

            if (currentWatchlists.hasOwnProperty(name)) {
                reject(`A watchlist named ${name} already exists!`);
                return;
            }

            currentWatchlists[name] = [];
            ls(WATCHLISTS_KEY, currentWatchlists);

            resolve(newWatchlist);
        })
    }

    /**
     * Delete a watchlist with the given name
     * @param name {string} The name of the watchlist to delete
     * @returns {Promise<void>}
     */
    static deleteWatchlist(name) {
        return new Promise(resolve => {
            let currentWatchlists = ls(WATCHLISTS_KEY);
            if (currentWatchlists) {
                delete currentWatchlists[name];
                ls(WATCHLISTS_KEY, currentWatchlists);
            }
            resolve();
        });
    }

    static _watchlistUpdated(watchlist) {
        const currentWatchlists = ls(WATCHLISTS_KEY);
        if (currentWatchlists) {
            currentWatchlists[watchlist.name] = watchlist.symbols;
            ls(WATCHLISTS_KEY, currentWatchlists);
        }
    }
}
