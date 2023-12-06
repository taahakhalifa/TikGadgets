import { CollectionConfig, Access } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === "admin") return true;
    return {
        user: {
            equals: user.id,
        },
    };
};

export const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        useAsTitle: "Your Orders",
        description: "A summary of all your orders on TikGadgets",
    },
    access: {
        read: yourOwn,
        update: ({ req }) => req.user.role === "admin",
        delete: ({ req }) => req.user.role === "admin",
        create: ({ req }) => req.user.role === "admin",
    },
    fields: [
        {
            name: "_isPaid",
            type: "checkbox",
            required: true,
            access: {
                read: ({ req }) => req.user.role === "admin",
                create: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                hidden: true,
            },
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: true,
        },
    ],
};
