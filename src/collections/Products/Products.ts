import { PRODUCT_CATEGORIES } from "../../config/index";
import { CollectionConfig } from "payload/types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Product } from "@/payload-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
    const user = req.user;

    return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {},
    hooks: {
        beforeChange: [
            addUser,
        ]
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Product Description",
            type: "textarea",
        },
        {
            name: "price",
            label: "Price (GBP)",
            type: "number",
            min: 0,
            max: 1000,
            required: true,
        },
        {
            name: "category",
            label: "Product Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
                label,
                value,
            })),
            required: true,
        },
        {
            name: "product_files",
            label: "Product File(s)",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false,
        },
        {
            name: "product_status",
            label: "Product Status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: ({ req }) => req.user.role === "admin",
                read: ({ req }) => req.user.role === "admin",
                update: ({ req }) => req.user.role === "admin",
            },
            options: [
                {
                    label: "Pending Verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "In Transit",
                    value: "in_transit",
                },
                {
                    label: "Delivered",
                    value: "delivered",
                },
                {
                    label: "Cancelled",
                    value: "cancelled",
                },
            ],
        },
        {
            name: "priceId",
            type: "text",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "stripeId",
            type: "text",
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product Images",
            minRows: 1,
            maxRows: 5,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
