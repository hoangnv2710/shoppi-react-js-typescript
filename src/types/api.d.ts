interface ILogin {
    access_token: string;
    user: IUser;
}

interface IRegister {
    _id: string,
    email: string,
    fullName: string
}

export { ILogin, IRegister }