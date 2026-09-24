/* function calcularPorcentajeFaltas(totalHoras: number, faltasAsistidas: number) {
    return (faltasAsistidas / totalHoras) * 100;
}
console.log(calcularPorcentajeFaltas("30",5)); */
 

import {CRMController} from './controllers/crm.controller';

// Instanciamos el motor (creamos el objeto en memoria)
const miEscuelaCRM = new CRMController("1.0.0");

console.log("Versión del CRM: ", miEscuelaCRM.verVersion());
//Usamos sus métodos
const profesores = miEscuelaCRM.filtrarUsuariosPorRol("profesor");

console.log("Profesores del centro: ", profesores);

// llamamos al metodo agregarUsuario para mostrarlo por la web
miEscuelaCRM.agregarUsuario({ id: 7, nombre: 'Pedro Sánchez', rol: 'alumno', activo: true });
