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

export { ILogin }