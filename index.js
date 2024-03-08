import { fetch } from "@whatwg-node/fetch";

class Client {
	/**
	 * @param {string} username
	 * @param {string} apiKey
	 */
	constructor(username, apiKey) {
		/** @private */
		this.username = username;
		/** @private */
		this.apiKey = apiKey;
	}

	/**
	 * Returns value of a single key in the database
	 * @param {string} key
	 * @returns {string}
	 */
	async get(key) {
		try {
			const url = new URL("https://database.nahcrof.com/getKey");
			url.searchParams.set("location", this.username);
			url.searchParams.set("token", this.apiKey);
			url.searchParams.set("keyname", key);
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const data = await res.json();

			if (data.keycontent === "Key not found") {
				throw new Error("Key does not exist");
			} else {
				return data.keycontent;
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Returns the specitifed keys in the database
	 * @param {...string} keyNames
	 * @returns {Record<string, string>}
	 */
	async getKeys(...keyNames) {
		try {
			const url = new URL("https://database.nahcrof.com/getKeys");
			url.searchParams.set("location", this.username);
			url.searchParams.set("token", this.apiKey);
			url.searchParams.set("keynamenum", keyNames.length);

			const result = keyNames.map((key, index) => {
				url.searchParams.set(`key_${index}`, key);
			});

			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const data = await res.json();

			return data;
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Returns all keys in the database
	 * @returns {Record<string, string>}
	 */
	async getAll() {
		try {
			const url = new URL("https://database.nahcrof.com/getAll");
			url.searchParams.set("location", this.username);
			url.searchParams.set("token", this.apiKey);

			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const data = await res.json();

			return data;
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Creates a new key
	 * @param {string} key
	 * @param {string} value
	 * @returns {boolean}
	 */
	async create(key, value) {
		try {
			const res = await fetch(`https://database.nahcrof.com/makeKey`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					location: this.username,
					token: this.apiKey,
					keyname: key,
					keycontent: value,
				}),
			});

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const data = await res.text();

			if (data == "success") {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Deletes a key from the database
	 * @param {string} key
	 * @returns {boolean}
	 */
	async delete(key) {
		try {
			const res = await fetch(`https://database.nahcrof.com/delKey`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					location: this.username,
					token: this.apiKey,
					keyname: key,
				}),
			});

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const data = await res.text();

			if (data == "success") {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			throw new Error(err);
		}
	}

	/**
	 * Resets the database
	 * @returns {boolean}
	 */
	async reset() {
		try {
			const res = await fetch(`https://database.nahcrof.com/resetDB`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					location: this.username,
					token: this.apiKey,
				}),
			});

			if (!res.ok) {
				throw new Error(await res.text());
			}

			const data = await res.text();

			if (data == "success") {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

export default Client;
