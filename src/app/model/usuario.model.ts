// usuario.model.ts
export interface Usuario {
    id?: number;             // ID del usuario (opcional, ya que se genera en el servidor)
    firstName: string;       // Nombre del usuario
    lastName: string;        // Apellido del usuario
    email: string;           // Correo electrónico
    password: string;        // Contraseña
    profile: string;         // Perfil del usuario, puede ser 'Ofertador' o 'Administrador'
  }

  
  // usuario.model.ts
export interface UsuarioUpdate {
    firstName?: string;      // Nombre (opcional en caso de actualización parcial)
    lastName?: string;       // Apellido
    email?: string;          // Correo electrónico
    profile?: string;        // Perfil
    // La contraseña puede omitirse si no se requiere en la actualización
  }
  