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

export interface Orders {
    id: number,
    total: number,
    payment_detail: {
        id: number,
        amount: number,
        payment: number,
        provider: string,
        status: string,

    },
    orderItems: [
        id: number,
        quantity: number,
        totalPrice: number,
        product: Products
    ]
}