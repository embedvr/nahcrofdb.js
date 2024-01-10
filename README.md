# nahcrofdb.js

A simple client for [NahcrofDB](https://database.nahcrof.com).

## How do I use it?

First, import the package.

```js
import NahcrofDB from "nahcrofdb.js";
```

Second, initialize the database with your username & API key.

```js
const database = new NahcrofDB("username", "api_key");
```

Finally, do something with it!

```js
await database.create("hello", "world!");
```
