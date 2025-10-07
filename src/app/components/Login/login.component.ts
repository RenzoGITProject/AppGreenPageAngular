import { Component, OnInit , EventEmitter, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/login.servivio";
import { LoginModel, PassModel, UserModel } from "../../model/login.model";
import Swal from "sweetalert2";
import { debug } from "node:console";
import { response } from "express";
import { responseInterceptor } from "http-proxy-middleware";
import { resolve } from "node:path"; 
import { RecaptchaComponent } from "ng-recaptcha";  // 👈 IMPORTANTE




@Component({
    selector: 'app-paglogin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class PagLoginComponent implements OnInit{
  @ViewChild('captchaElem') recaptchaRef!: RecaptchaComponent;  // 👈 REFERENCIA    
  isLoggedIn: boolean = false;  
  loginInput: string = 'wcmore.93@gmail.com';
  passwordInput: string = 'Miclave24';
  NewpassInput: string = '';
  captchaResponse: string | null = null;

    

    // Propiedades para el formulario de registro7
    nomUsuario: string = '';
    nomApellido: string = '';
    dni: string = '';
    regLogin: string = '';
    regPassword: string = '';
    regPregunta: string = '';
    regRespuesta: string = '';  


    constructor(
        private authService: AuthService, private router: Router,
      )  { }




        ngOnInit(): void {
               

        }

      resolved(captchaResponse: string | null) {
        this.captchaResponse = captchaResponse;
        //console.log("Token captcha:", captchaResponse);
      }

      resetCaptcha() {
        this.captchaResponse = null;
        if (this.recaptchaRef) {
          this.recaptchaRef.reset();  // 👈 Reinicia el captcha
        }
      }      

        recuperaUser(){
          const usertxt = this.loginInput;

          const userModel:UserModel = {user: usertxt}
          this,this.authService.recuperauser(userModel).subscribe(
            response => {

              this.regPregunta = response.userlogger.pregunta;
              console.log(response.message); // "Login exitoso"
              console.log(response.userlogger);
              console.log(response.userlogger.pregunta);
            }
          )
        }

        cambiaPass(){
          const usertxt = this.loginInput;
          const pregunta = this.regPregunta;
          const respuesta = this.regRespuesta;
          const nuevopass = this.NewpassInput;

          const passmodel : PassModel = {user: usertxt, pregunta: pregunta, respuesta:respuesta, pass: nuevopass};
          console.log('Enviando datos de cambio de pass...', passmodel)

          this.authService.cambiapass(passmodel).subscribe(
            response => {
              console.log(response.message)
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text:  response.message ||'El usuario ha sido registrado satisfactoriamente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            });   
            this.closeRecuperaModal();
            //this.loginInput='';
            this.regPregunta='';
            this.regRespuesta='';
            this.NewpassInput='';               

            }
            ,
            error => {
              console.error('Error al actualizar la contraseña:', error);
              Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Algo pasó!",
                    text: error.error || "errores",
                    showConfirmButton: true,
                    showCloseButton: true,
                    showCancelButton: false,
                    timer: 5000 // en milisegundos
                  });
            }            
          )          
          
        }
    
        onLogin() {

        if (!this.captchaResponse) {
          alert("Debes completar el CAPTCHA");
          return;
        }          
          
          // Aquí puedes utilizar localStorage
          
          console.log('Estad de isAuthenticated: ',this.authService.isAuthenticated())
          console.log('Estado de IsLoggedId: ' , this.authService.isLoggedIn)


          const usertxt = this.loginInput;
          const passtxt = this.passwordInput;
          const captchatoken = this.captchaResponse
        
          const loginModel: LoginModel = { user: usertxt, pass: passtxt , captchatoken: captchatoken};
          console.log('Enviando datos de login...', loginModel);
        
          this.authService.login(loginModel).subscribe(
            response => {

              this.authService.isLoggedIn = true;
              const userName = response.userlogger.nomUsuario;
              const userFound = response.userlogger
              console.log('Usuario:', response.userlogger);  
              this.authService.setUserData(response.userlogger);//////--------------------
              console.log('data',this.authService.getUserData())////////---------------
              if(response.userlogger.idPerfil== 1)/** */
                {
                  this.authService.isOferta = true
                }else{
                  this.authService.isOferta = false/** */
                }              
              console.log('Estad de isAuthenticated: ',this.authService.isAuthenticated())
              console.log('Estado de IsLoggedId: ' , this.authService.isLoggedIn)
              //console.log('Login exitoso:', response);
              console.log(response.message); // "Login exitoso"

            /*  Swal.fire({
                position:"center",
                icon:"info",
                title:"Bienvenido",
                html: `
                <strong>Bienvenido: </strong> ${userName}`<br><br>
                <strong>Perfil: </strong> ${response.userlogger.perfilNombre}
               `,                
                //text: response.message || "Usuario correcto",
                showCancelButton: true            
              }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirige a la ruta /RegistroLibros
                    }
                });*/
                this.router.navigate(['/RegistroLibros']);

             
              //this.router.navigate(['/RegistroLibros'])     

         
               //Navega solo después de la respuesta exitosa del backend
            /*  this.router.navigate(['/RegistroLibros']).then(success => {
                console.log('Navegación exitosa:', success);
              }).catch(err => {
                console.error('Error en la navegación:', err);
              });*/
            }
            ,
            error => {
              console.error('Error en el login:', error);
              Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Algo pasó!",
                    text: error.error || "Usuario o contraseña incorrecta",
                    showConfirmButton: true,
                    showCloseButton: true,
                    showCancelButton: false,
                    timer: 5000 // en milisegundos
                  });
                          this.resetCaptcha(); // 👈 reiniciar captcha si falla login
            }
            
          );    
   
        }




    registerUser() {

      const userData = {
          nomUsuario: this.nomUsuario,
          apeUsuario: this.nomApellido,
          dni: this.dni,
          Login: this.regLogin,
          Pass: this.regPassword,
          Pregunta: this.regPregunta,
          Respuesta: this.regRespuesta
      };

      console.log('Datos a enviar:', userData); // Verifica que todos los campos están presentes


      this.authService.register(userData).subscribe(
        
          response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Registro exitoso',
                  text: 'El usuario ha sido registrado satisfactoriamente',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                  //position: 'top-end',  // Cambia la posición del modal
                  toast: true,                     
              });
              this.closeRegisterModal();
              this.nomUsuario = '';
              this.nomApellido = '';
              this.dni = '';
              this.regLogin = '';
              this.regPassword = '';
              this.regPregunta = '';
              this.regRespuesta  = '';         
              
          },
          error => {
              Swal.fire({
                  icon: 'error',
                  title: 'Error de registro',
                  text: error.error || 'No se pudo registrar el usuario',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Cerrar',
                 // position: 'top-end',  // Cambia la posición del modal
                  toast: true,                     
              });
              console.log(error.error)
              console.error('Validation errors:', error.error.errors);

          }
          
      );

      
      console.log('Registering user with data:', userData);

  }

    isRegisterModalOpen = false;

    openRegisterModal() {
      this.isRegisterModalOpen = true;
    }
  
    closeRegisterModal() {
      this.isRegisterModalOpen = false;
    }

    isRecuperarModalOpen = false;

    openRecuperaModal(){
      this.isRecuperarModalOpen = true;
      this.recuperaUser();

    }

    closeRecuperaModal(){
      this.isRecuperarModalOpen = false;
    }

      register() {
      // Lógica de registro aquí
      console.log('Registro exitoso');
      this.closeRegisterModal(); // Cierra el modal después de registrar
    }
}