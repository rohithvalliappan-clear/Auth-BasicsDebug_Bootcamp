export interface CartItem {
    productId: number;
    quantity: number;
}

// In-memory cart store: username -> CartItem[]
const carts: Record<string, CartItem[]> = {};

export const getCart = (username: string): CartItem[] => {
    return carts[username] || [];
};

export const addToCart = (username: string, productId: number): void => {
    if (!carts[username]) {
        carts[username] = [];
    }

    const existingItem = carts[username].find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        carts[username].push({ productId, quantity: 1 });
    }
};
