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
}