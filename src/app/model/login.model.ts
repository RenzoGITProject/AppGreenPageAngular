export interface LoginModel {
    user: string;
    pass: string;
    captchatoken: string;
}

export interface UserModel{
    user: string;
}

export interface PassModel{
    user: string;
    pregunta: string;
    respuesta: string;
    pass: string;
}