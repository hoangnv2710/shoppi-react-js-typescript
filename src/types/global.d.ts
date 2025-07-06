export { }


declare global {
    type TRole = "ADMIN" | "USER";

    interface IUser {
        id: string;
        email: string;
        avatar: string;
        fullName: string;
        phone: string;
        role: TRole;
    }

    interface IProduct {
        thumbnail: string,
        slider: string[],
        mainText: string,
        author: string,
        price: number,
        quantity: number,
        category: string
    }

    interface IUserDetail {
        _id: string;
        email: string;
        avatar: string;
        fullName: string;
        phone: string;
        role: TRole;
        isActive: boolean,
        type: string,
        createdAt: date,
        updatedAt: date,
        __v: number
    }

    interface IProductDetail {
        _id: string;
        createdAt: date,
        updatedAt: date,
        __v: number
        thumbnail: string,
        slider: string[],
        mainText: string,
        author: string,
        price: number,
        sold: number,
        quantity: number,
        category: string,
    }
}