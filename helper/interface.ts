export interface Categories {
    id: number,
    category: string,
}

export interface Products {
    id: number,
    title: string,
    description: string,
    quantity: number,
    price: number,
    images: string[],
    category: {
        id: number;
        category: string
    }
}