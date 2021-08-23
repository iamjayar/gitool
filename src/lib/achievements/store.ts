import { browser } from "$app/env";
import { writable } from "svelte/store";

export const completed = (() => {
  const { set, subscribe, update } = writable({});

  if (browser) {
    const STORAGE_NAME = "achievements";
    const init = (() => {
      let data = localStorage.getItem(STORAGE_NAME);
      if (!data) return {};
      return JSON.parse(data);
    })();

    set(init);
    subscribe((state) => {
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
    });

    window.addEventListener("storage", ({ key, newValue }) => {
      if (key !== STORAGE_NAME) return;
      set(JSON.parse(newValue));
    });
  }

  return {
    subscribe,
    reset: () => set({}),
    update: (category: number, item: number, value: number) => {
      return update((state) => {
        if (!state[category]) state[category] = {};
        state[category][item] = value;
        return state;
      });
    },
  };
})();
