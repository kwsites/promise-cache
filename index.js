"use strict";

function PromiseCache (ttl) {

   const store = new Map();

   return {

      set (key, value) {
         store.set(key, value);

         if (value && typeof value.catch === 'function') {
            value.catch(purge);
         }

         setTimeout(purge, ttl);
         return value;

         function purge () {
            if (store.get(key) === value) {
               store.delete(key);
            }
         }
      },

      get (key) {
         return store.get(key);
      },

      has (key) {
         return store.has(key);
      }

   };

}

PromiseCache.FIVE_MINUTES = 1000 * 60 * 5;

Object.defineProperty(PromiseCache, "__esModule", {
   value: true
});

module.exports = PromiseCache.default = PromiseCache;
