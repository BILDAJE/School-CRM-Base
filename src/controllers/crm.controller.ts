import type { Usuario, Rol } from "../models/interfaces";

export class CRMController {
  // Propiedades
  private usuariosDelCentro: Usuario[] = [];
  private readonly CLAVE_STORAGE = "school-crm-usuarios"; // Constante privada, no se puede cambiar desde fuera de la clase

  // Constructor se ejeuta al nacer el objeto
  constructor(private version: string) {
    // IInicializamo el array de usuarios si no existe en localStorage
    const datosLocales = localStorage.getItem(this.CLAVE_STORAGE);
    if (datosLocales) {
      this.usuariosDelCentro = JSON.parse(datosLocales);
    } else {
      this.usuariosDelCentro = [
        { id: 1, nombre: "Juan Pérez", rol: "admin", activo: true },
        { id: 2, nombre: "María López", rol: "profesor", activo: true },
        { id: 3, nombre: "Carlos García", rol: "alumno", activo: true },
      ]; // Inicializamos el array vacío si no hay datos en localStorage
      // Me falta guardar la lista en local Storage
      this.guardarEnDisco();
    }
  }

  public registrarUsuarioAsync(nuevoUsuario: Usuario): Promise<boolean> {
    return new Promise((resolve) => {
      console.log(
        `[NETWORK]: Conectando con el servidor escolar para registrar a ${nuevoUsuario.id}...`,
      );

      // Simulamos un retraso de red de 2 segundos (2000 milisegundos)
      setTimeout(() => {
        // 1. Validamos si el ID ya existe en nuestro array privado
        const idDuplicado = this.usuariosDelCentro.some(
          (user) => user.id === nuevoUsuario.id,
        );

        if (idDuplicado) {
          console.error(`❌ Error: El usuario con ID [${nuevoUsuario.id}] ya existe en el SchoolCRM.`);
          return; // Cortamos la ejecución para no añadirlo
        }


        this.usuariosDelCentro.push(nuevoUsuario);
        this.guardarEnDisco(); // Guardamos los cambios en localStorage

        // La operación ha terminado con éxito: resolvemos la promesa
        resolve(true);
      }, 2000);
    });
  }

public leerTodosAsync(): Promise<Usuario[]> {
  // Este método devuelve el listado completo de usuarios con un retardo de 2 segundos
  return new Promise((resolve) => {
    console.log("[NETWORK]: Recuperando todos los usuarios del servidor escolar...");

    setTimeout(() => {
      resolve(this.usuariosDelCentro);
    }, 2000);
  });
}
 /* // Métodos: La función de ayer, que estaba en counter, convertida en un método o habilidad de la clase
  filtrarUsuariosPorRol(rolBuscado: Rol): Usuario[] {
    // Usamos this para referirnos a la propiedad de esta misma clase
    return this.usuariosDelCentro.filter(
      (usuario) => usuario.rol === rolBuscado,
    );
  }*/
    filtrarUsuariosPorRol(rolBuscado: Rol): Promise<Usuario[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
    const usuariosFiltrados = this.usuariosDelCentro.filter(
      (usuario) => usuario.rol === rolBuscado,
    );
    resolve(usuariosFiltrados);
    }, 2000);
  });
}

  actualizaVersion(nuevaVersion: string): void {
    this.version = nuevaVersion;
  }

  verVersion(): string {
    return this.version;
  }
  // 🚀 RESOLUCIÓN DEL RETO EXPRESS
  /* public agregarUsuario(nuevoUsuario: Usuario): void {
    // 1. Validamos si el ID ya existe en nuestro array privado
    const idDuplicado = this.usuariosDelCentro.some(
      (user) => user.id === nuevoUsuario.id,
    );
    if (idDuplicado) {
      console.error(
        `❌ Error: El usuario con ID [${nuevoUsuario.id}] ya existe en el SchoolCRM.`,
      );
      return; // Cortamos la ejecución para no añadirlo
    }
    // 2. Si no está duplicado, lo añadimos de forma segura
    this.usuariosDelCentro.push(nuevoUsuario);
    console.log(`✅ Usuario ${nuevoUsuario.nombre} añadido correctamente.`);
    this.guardarEnDisco(); // Guardamos los cambios en localStorage
  } */

  private guardarEnDisco(): void {
    localStorage.setItem(
      this.CLAVE_STORAGE,
      JSON.stringify(this.usuariosDelCentro),
    );
  }
}