// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
    interface Platform {
      env: {
        DB: D1Database;
      };
      caches: CacheStorage & { default: Cache };
    }
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
