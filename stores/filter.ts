// pinia.ts
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {

    state: () => ({
        search: '',
    }),

    actions: {
        setSearch(value: string) {
            this.search = value;
        },

        getSearch() {
            return this.search;
        },
    },
});
