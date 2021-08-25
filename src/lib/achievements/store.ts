import { browser } from "$app/env";
import { writable } from "svelte/store";

export const completed = (() => {
  const store = writable({});

  if (browser) {
    const STORAGE_NAME = "achievements";
    const init = (() => {
      let data = localStorage.getItem(STORAGE_NAME);
      if (!data) return {};
      return JSON.parse(data);
    })();

    store.set(init);
    store.subscribe((state) => {
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
    });

    window.addEventListener("storage", ({ key, newValue }) => {
      if (key !== STORAGE_NAME) return;
      store.set(JSON.parse(newValue));
    });
  }

  return {
    subscribe: store.subscribe,
    reset: () => store.set({}),
    update: (category: number, id: number, value: number) =>
      store.update((state) => {
        if (!state[category]) state[category] = {};
        state[category][id] = value;
        return state;
      }),
  };
})();
