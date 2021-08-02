import { browser } from "$app/env";
import { writable } from "svelte/store";

export const completed = (() => {
  const { set, subscribe, update } = writable([]);

  if (browser) {
    const STORAGE_NAME = "completed_achievements";

    const init: number[] = (() => {
      let data = localStorage.getItem(STORAGE_NAME);

      if (!data) return [];

      return JSON.parse(data);
    })();

    set(init);

    subscribe((state) => {
      localStorage.setItem(STORAGE_NAME, JSON.stringify(state));
    });

    window.addEventListener("storage", ({ newValue }) => {
      set(JSON.parse(newValue));
    });
  }

  return {
    subscribe,
    reset: () => set([]),
    update: (uniqId: number) =>
      update((state) => (state.includes(uniqId) ? state.filter((id) => id !== uniqId) : [...state, uniqId])),
  };
})();

export const useState = (() => {
  const { subscribe, update } = writable({
    filterText: "",
    isHideComplete: false,
    isSettingsOpen: false,
  });

  return {
    subscribe,
    setFilterText: (text: string) => update((state) => ({ ...state, filterText: text })),
    toggleHideComplete: () => update((state) => ({ ...state, isHideComplete: !state.isHideComplete })),
    toggleSettings: () => update((state) => ({ ...state, isSettingsOpen: !state.isSettingsOpen })),
  };
})();
