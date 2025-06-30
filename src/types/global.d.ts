export { }

declare global {
    interface IUser {
        id: string;
        email: string;
        avatar: string;
        fullName: string;
        phone: string;
        role: string;
    }
}