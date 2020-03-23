export const MenuItems: MenuItem[] = [
    {
        id: 1,
        name: "Gheyme",
        description: "Gheyme",
        price: 12,
    },
    {
        id: 2,
        name: "Ghormeh Sabzi",
        description: "Ghormeh Sabzi",
        price: 14,
    },
    {
        id: 3,
        name: "Koobideh",
        description: "Koobideh",
        price: 13,
    },
    {
        id: 4,
        name: "Barg",
        description: "Barg",
        price: 14,
    },
    {
        id: 5,
        name: "Lamb Shanks",
        description: "Labm Shanks",
        price: 13,
    },
    {
        id: 6,
        name: "Fesenjan",
        description: "Fesenjan",
        price: 14,
    },
];

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default MenuItem;
