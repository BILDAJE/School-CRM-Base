import type {
    Asistencia,
    Sancion,
    RegistroHorario,
    EstadoAsistencia,
    TipoSancion,
    FranjaHoraria
} from '../models/interfaces';

import { StorageService } from '../services/storage.service';

export class CRMController {
    // Inicialización de los almacenes persistentes
    private asistenciaStorage = new StorageService<Asistencia>('crm_asistencias');
    private sancionesStorage = new StorageService<Sancion>('crm_sanciones');
    private horariosStorage = new StorageService<RegistroHorario>('crm_horarios');

    /**
     * Registra una falta, retraso o asistencia en el sistema de forma asíncrona.
     */
    public async registrarAsistencia(
        alumnoId: string,
        profesorId: string,
        franja: string,
        estado: EstadoAsistencia
    ): Promise<boolean> {

        return new Promise((resolve) => {

            setTimeout(() => {

                const nuevaAsistencia: Asistencia = {
                    id: crypto.randomUUID(),
                    alumnoId: alumnoId,
                    profesorId: profesorId,
                    fecha: new Date().toISOString().split('T')[0],
                    franja: franja as FranjaHoraria,
                    estado: estado
                };

                this.asistenciaStorage.add(nuevaAsistencia);

                resolve(true);

            }, 2000);

        });
    }

    /**
     * Registra una sanción disciplinaria.
     */
    public async registrarSancion(
        alumnoId: string,
        profesorId: string,
        tipo: TipoSancion,
        descripcion: string
    ): Promise<void> {

        return new Promise((resolve) => {

            setTimeout(() => {

                const nuevaSancion: Sancion = {
                    id: crypto.randomUUID(),
                    alumnoId: alumnoId,
                    profesorId: profesorId,
                    fecha: new Date().toISOString().split('T')[0],
                    tipo: tipo,
                    descripcion: descripcion
                };

                this.sancionesStorage.add(nuevaSancion);

                resolve();

            }, 2000);

        });
    }

    /**
     * VERIFICACIÓN CRÍTICA: Comprueba si un profesor ya tiene una clase asignada en el mismo día y hora.
     * Devuelve true si hay conflicto (el profesor está duplicado) o false si está libre.
     */
    public async comprobarConflictoProfesor(
        profesorId: string,
        dia: string,
        franja: string
    ): Promise<boolean> {

        return new Promise((resolve) => {

            setTimeout(() => {

                const horarios = this.horariosStorage.getAll();

                const existeConflicto = horarios.some(
                    (horario) =>
                        horario.profesorId === profesorId &&
                        horario.dia === dia &&
                        horario.franja === franja
                );

                resolve(existeConflicto);

            }, 2000);

        });
    }

    /**
     * Genera un informe resumido con el total de faltas y retrasos de un alumno concreto.
     */
    public async obtenerInformeAlumno(
        alumnoId: string
    ): Promise<{ faltas: number; retrasos: number; sanciones: number }> {

        void alumnoId;

        // TODO: Filtrar asistencias y sanciones del alumno para devolver el objeto con los contadores.
        throw new Error('Método no implementado');
    }
}