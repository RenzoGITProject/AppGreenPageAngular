import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/login.servivio';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';




@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{ 
  title = 'app-ventas';
  userData: any;/** */ 
  nombre: string = '';/** */
  userName: string | null = '';/** */
  serverTime: Date = new Date(); // Inicialización con un valor por defecto
  hubConnection: HubConnection;// = new HubConnectionBuilder().withUrl("http://localhost:5048/timeHub").build(); // Inicialización de la conexión  


  constructor(public authService: AuthService, private router: Router) {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:5048/timeHub') // URL del backend con SignalR
    .build();
  }



   ngOnInit(): void {/** */
    this.startConnection();
    // Suscribirse a los cambios en userData$
    this.authService.userData$.subscribe(data => 
      {
      this.userData = data; // Actualiza userData cuando cambia 
      });/** */
      

      
   }



     // Inicia la conexión SignalR
     startConnection() {
      this.hubConnection
        .start()
        .then(() => {
          console.log('Conexión establecida');
         // this.hubConnection.invoke("SendServerTime"); // Solicita la hora del servidor
        })
        .catch(err => console.log('Error al conectar con el hub: ', err));

      // Escucha el evento "ReceiveServerTime" para recibir la hora desde el backend
      this.hubConnection.on("ReceiveServerTime", (time: string) => {
        this.serverTime = new Date(time); // Actualiza la propiedad serverTime
        //console.log('Server Time:', this.serverTime); // Verifica la hora recibida
      });
    }

    toggleSidebar() {
      const sidebar = document.getElementById('sidebarToggle');
      sidebar?.classList.toggle('collapsed');
    }


    ngOnClear(){
    }

  logout(): void {
    //if (typeof window !== 'undefined') {
      //sessionStorage.removeItem('userName'); // Elimina el nombre del usuario de localStorage
   // }
   this.userName = null; // Limpia el nombre de usuario

      this.router.navigate(['']); // Redirige al usuario a la página de login
  }
  
  onSubmit() {
    this.router.navigate(['/RegistroLibros']);
  }

  suSubmit() {
    this.router.navigate(['/RegistroSubasta']);
  }

  ofSubmit() {
    this.router.navigate(['/nuevaOferta']);
  }

  geSubmit() {
    this.router.navigate(['/GestionUsuario']);
  }

  usSubmit(){
    this.router.navigate(['/VerUsuarios']);
  }

}
