export const allCategories = ["Sporting Goods", "Electronics"] as const;

export type Category = (typeof allCategories)[number];

export type Product = {
    category: Category,
    price: string,
    stocked: boolean,
    name: string
};

export const sampleProducts: Product[] = [
    {
        category: "Sporting Goods",
        price: "$49.99",
        stocked: true,
        name: "Football",
    },
    {
        category: "Sporting Goods",
        price: "$9.99",
        stocked: true,
        name: "Baseball",
    },
    {
        category: "Sporting Goods",
        price: "$29.99",
        stocked: false,
        name: "Basketball",
    },
    {
        category: "Electronics",
        price: "$09.99",
        stocked: true,
        name: "iPad Touch",
    },
    {
        category: "Electronics",
        price: "$399.99",
        stocked: false,
        name: "iPhone 5",
    },
    {
        category: "Electronics",
        price: "$199.99",
        stocked: true,
        name: "Nexus 7",
    },
]
