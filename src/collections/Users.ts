import { CollectionConfig, Access } from "payload/types";

const adminsAndUser: Access = ({req: {user}}) => {
    if (user.role === "admin") return true

    return {
        id: {
            equals: user.id
        }
    }
}

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return `<a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify account</a>`;
            },
        },
    },
    access: {
        read: adminsAndUser,
        create: () => true,
        update: ({req}) => req.user.role === "admin",
        delete: ({req}) => req.user.role === "admin"
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: () => true,
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "product_files",
            label: "Product Files",
            admin: {
                condition: () => true,
            },
            type: "relationship",
            relationTo: "product_files",
            hasMany: true,
        },
        {
            name: "role",
            defaultValue: "user",
            required: true,
            // admin: {
            //     condition: () => false
            // },
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
        },
    ],
};
