export type LoginFormType={
    email:string;
    password:string;
}

export type SignupForm = {
    name: string;
    email: string;
    password: string;
    // confirmPassword: string;
};

export type errorType = {
    [key: string]: string;
};