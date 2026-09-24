import type {Usuario, Rol} from '../models/interfaces';


export class CRMController {
    // Propiedades
    private usuariosDelCentro: Usuario[] = [];
    private readonly CLAVE_STORAGE = 'school-crm-usuarios'; //Constante privada , no se puede modificar, solo leer

 // Constructor
    constructor( ) {
        const datosLocales = localStorage.getItem(this.CLAVE_STORAGE);
        if (datosLocales) {
            this.usuariosDelCentro = JSON.parse(datosLocales);
        }else {
        this.usuariosDelCentro = [
    { id: 1, nombre: 'Ana Martínez', rol: 'profesor', activo: true, tieneCoche: 'Toyota' },
    { id: 2, nombre: 'Carlos Soler', rol: 'alumno', activo: true },
    { id: 3, nombre: 'Lucía Gómez', rol: 'admin', activo: false },
    { id: 4, nombre: 'María López', rol: 'profesor', activo: true },
    { id: 5, nombre: 'Javier Torres', rol: 'alumno', activo: false },
    { id: 6, nombre: 'Laura Fernández', rol: 'alumno', activo: true },
];
    }
}
    // Métodos: Es la funcion de ayer, que estaba en counter, convertida en un método o habilidad de la clase CRMController
    filtrarUsuariosPorRol ( rolBuscado: Rol,): Usuario[] {
       // Usamos this para referirnos a la propiedad de esta misma clase
       return this.usuariosDelCentro.filter(usuario => usuario.rol === rolBuscado );
    }
    actulizaVersion(nuevaVersion: string): void {
    this.version = nuevaVersion;  
}
    verVersion(): string {
    return this.version; 
}
    // Agregar usuario, recibe un nuevo usuario y lo agrego a la lista de usuarios comprobando que el id no exista ya en el array
    agregarUsuario(nuevoUsuario: Usuario): void {
        const usuarioExistente = this.usuariosDelCentro.find(usuario => usuario.id === nuevoUsuario.id);
        if (usuarioExistente) {
            console.log(`El usuario con id ${nuevoUsuario.id} ya existe.`);
            return; //Cortamos la ejecución oara no añadirlo
        } else {
            //2. si no esta duplicado, lo añadimos de forma segura
            this.usuariosDelCentro.push(nuevoUsuario);
            console.log(`Usuario con id ${nuevoUsuario.id} agregado correctamente.`);
            this.guardarEnDisco(); // Guardamos los cambios en localStorage
        }          
}

    private guardarEnDisco(): void {
        localStorage.setItem(this.CLAVE_STORAGE, JSON.stringify(this.usuariosDelCentro));
}
}

