/**
 * A tastyworks watchlist
 *
 */
export default class Watchlist {
    /**
     * A function to be called when the watchlist is updated
     * @callback onUpdate
     * @param watchlist {Watchlist} This watchlist
     */

    /**
     * Create a new watchlist. <b>Do not use this constructor directly!</b>
     * @param name {string} The name of the watchlist
     * @param onUpdate {onUpdate} A function to be called when the watchlist is updated
     */
    constructor(name, onUpdate) {
        /**
         * The name of the watchlist
         * @type {string}
         */
        this.name = name;

        /**
         * This watchlist's symbols
         * @type {string[]}
         */
        this.symbols = [];

        this.onUpdate = onUpdate;
    }

    /**
     * Add a symbol to the watchlist
     * @param symbol {string} The symbol to add
     * @returns {Promise<void>}
     * @throws if the symbols is already in the list
     */
    addSymbol(symbol) {
        return new Promise((resolve, reject) => {
            if (this.symbols.indexOf(symbol) >= 0) {
                reject(`${symbol} is already in watchlist ${this.name}`);
                return;
            }

            this.symbols.push(symbol);
            this.onUpdate(this);
            resolve();
        });
    }

    /**
     * Remove a symbol from the watchlist
     * @param symbol {string} The symbol to remove
     * @returns {Promise<void>}
     */
    removeSymbol(symbol) {
        return new Promise(resolve => {
            const symbolIndex = this.symbols.indexOf(symbol);
            if (symbolIndex >= 0) {
                this.symbols.splice(symbolIndex, 1);
                this.onUpdate(this);
            }
            resolve();
        })
    }
}
