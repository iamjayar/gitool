import { writable } from "svelte/store";

export const store = (() => {
  const data = writable({});
  const counter = writable({});

  return {
    data: { subscribe: data.subscribe },
    counter: { subscribe: counter.subscribe },
    reset: () => {
      data.set({});
      counter.set({});
    },
    update: (category: number, id: number, value: number) => {
      let change = 0;

      data.update((state) => {
        if (!state[category]) state[category] = {};
        change = value - (state[category][id] || 0);
        state[category][id] = value;
        return state;
      });

      counter.update((state) => {
        if (!state[category]) state[category] = 0;
        state[category] += change;
        return state;
      });
    },
  };
})();
