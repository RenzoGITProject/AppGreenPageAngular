    import { Injectable } from "@angular/core";
    import { HttpClient,HttpHeaders } from "@angular/common/http";
    import { Router } from "@angular/router";
    import { Observable } from "rxjs";
    import { LoginModel } from "../model/login.model";
    import { tap } from 'rxjs/operators';



    @Injectable({
        providedIn: 'root'
    })
    export class AuthService {

        isLoggedIn: boolean = false;
        email: string = '';
        
        //private baseUrl = 'http://localhost:8080/api/usuarios';
        //private apiUrl = 'https://localhost:7204/login';
        //private apiUrl = 'https://localhost:44373/login';
        private apiUrl = 'http://localhost:5048/login';
        //private registerUrl = 'http://localhost:5030/api/Auth/register';
        private registerUrl = 'http://localhost:5048/register';



            
        private authHeader = 'Basic amFtZXM6amFtZXMxMjM=';

        constructor(
            private http: HttpClient, 
            private router: Router) 
        { }

        
        login(model: LoginModel): Observable<any> {
            return this.http.post<any>(this.apiUrl, model)                        
        }

        register(userData: any): Observable<any> {
            return this.http.post<any>(this.registerUrl, userData);
        }        

        // private getHttpOptions() {
        //     return {
        //       headers: new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Authorization': this.authHeader
        //       })
        //     };
        // }
        // login(usuario: Login) {
        //     //aquí se debe llamar a un servicio para verificar los datos del usuario en la BD

        //     //Aquí se puede aplicar la inserción de items en el sessionStorage, localStorage
        //     this.isLoggedIn = true;
        // }

        // login(usuario:String, password: String) {
        //     //aquí se debe llamar a un servicio para verificar los datos del usuario en la BD

        //     //Aquí se puede aplicar la inserción de items en el sessionStorage, localStorage
        //     this.isLoggedIn = true;
        // }

        // login2(user: string, pass: string): Observable<Login> {
        //     this.isLoggedIn = true;        
        //     const login = new Login(user, pass);
        //     console.log(login);
                
        //     return this.httpClient.post<Login>(`${this.baseUrl}/usuarios/3`, this.getHttpOptions());
        // }

        logout() {
            //Aquí se puede aplicar el borrado de items del sessionStorage, localStorage

            this.isLoggedIn = false;

        }

        isAuthenticated(): boolean {
            return this.isLoggedIn;
        }

    }
