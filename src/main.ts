import { CRMController } from './controllers/crm.controller';

const crm = new CRMController();

async function ejecutarPrueba() {

    console.log("Registrando asistencia...");

    const asistenciaRegistrada = await crm.registrarAsistencia(
        "alumno-1",
        "profesor-1",
        "1ª Hora",
        "presente"
    );

    console.log("Asistencia registrada:", asistenciaRegistrada);


    console.log("Registrando sanción...");

    await crm.registrarSancion(
        "alumno-1",
        "profesor-1",
        "comportamiento",
        "Mal comportamiento en clase"
    );

    console.log("Sanción registrada.");


    console.log("Comprobando conflicto del profesor...");

    const conflicto = await crm.comprobarConflictoProfesor(
        "profesor-1",
        "Lunes",
        "1ª Hora"
    );

    console.log("¿Existe conflicto?:", conflicto);
}

ejecutarPrueba();