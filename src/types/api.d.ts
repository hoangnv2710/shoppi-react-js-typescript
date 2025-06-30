interface ILogin {
    access_token: string;
    user: {
        avatar: string;
        email: string;
        fullName: string;
        id: string;
        phone: string;
        role: string;
    }
}

interface IRegister {
    _id: string,
    email: string,
    fullName: string
}

export { ILogin, IRegister }