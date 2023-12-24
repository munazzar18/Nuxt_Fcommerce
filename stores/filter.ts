// pinia.ts
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {

    state: () => ({
        search: '',
        categoryId: 0,
    }),

    actions: {
        setSearch(value: string) {
            this.search = value;
        },

        setCategory(value: number) {
            this.categoryId = value
        },

        getSearch() {
            return this.search;
        },

        getCategoryId() {
            return this.categoryId
        }
    },
});

