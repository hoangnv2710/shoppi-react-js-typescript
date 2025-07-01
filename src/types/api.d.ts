interface ILogin {
    access_token: string;
    user: IUser;
}

interface IRegister {
    _id: string,
    email: string,
    fullName: string
}

interface IPageginate<T> {
    meta: {
        current: string,
        pageSize: string,
        pages: number,
        total: number
    },
    result: T;
}

export { ILogin, IRegister, IPageginate }