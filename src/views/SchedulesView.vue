<template>
    <article>
        <h3>Gestión de Horarios</h3>
        <div class="table-actions">
            <button class="btn-small" @click="mostrarModal = true">Nuevo Horario</button>
        </div>

        <div class="table-container">
            <table class="striped">
                <thead>
                    <tr>
                        <th>Día</th>
                        <th>Horario</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="horario in horarios.results" :key="horario.id">
                        <td>{{ horario.dia }}</td>
                        <td>{{ horario.hora }}</td>
                        <td>
                            <span class="badge" :class="horario.disponible ? 'success' : 'danger'">
                                {{ horario.disponible ? 'Disponible' : 'Ocupado' }}
                            </span>
                        </td>
                        <td class="actions-cell">
                            <button class="btn-small secondary" @click="editarHorario(horario.id)">
                                <SquarePen class="icon-table" />
                                Editar
                            </button>
                            <button class="btn-small danger" @click="eliminarHorario(horario.id)">
                                <Trash2 class="icon-table" />
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <PaginationBar :previous="horarios.previous" :next="horarios.next" :current-page="currentPage"
            :total-pages="totalPages" @go-previous="goToPrevious" @go-next="goToNext" @go-to-page="goToPage" />
    </article>
    <ModalView :is-visible="mostrarModal" @close="mostrarModal = false">
        <template #header>
            <h3>Nuevo Horario</h3>
        </template>

        <template #default>
            <form @submit.prevent="crearHorario">
                <fieldset class="grid">
                    <label for="nombre"> Día:
                        <select name="select" aria-label="Select" v-model="nuevoHorario.day_of_week" required>
                            <option selected disabled value="Seleccione">Select</option>
                            <option :value="0">Lunes</option>
                            <option :value="1">Martes</option>
                            <option :value="2">Miércoles</option>
                            <option :value="3">Jueves</option>
                            <option :value="4">Viernes</option>
                            <option :value="5">Sábado</option>
                            <option :value="6">Domingo</option>
                        </select>
                    </label>

                    <label for="apellido"> Hora de Inicio:
                        <input type="time" id="time-start" name="time-start" aria-label="Time"
                            v-model="nuevoHorario.start_time" required />
                    </label>
                </fieldset>
                <fieldset class="grid">
                    <fieldset>
                        <label>
                            <input name="ocupado" type="checkbox" role="switch" v-model="nuevoHorario.is_available"
                                checked />
                            Disponible
                        </label>
                        <label>
                            <input name="permanente" type="checkbox" role="switch" v-model="nuevoHorario.is_reserved" />
                            Permanente
                        </label>
                    </fieldset>

                    <label for="fechaNacimiento">Hora de Fin:
                        <input type="time" id="time-end" name="time-end" aria-label="Time" required
                            v-model="nuevoHorario.end_time" />
                    </label>
                </fieldset>
            </form>
        </template>

        <template #footer>
            <form method="dialog">
                <button type="submit" @click="guardarHorario" class="button-form">Guardar</button>
                <button type="button" @click="mostrarModal = false" class="secondary button-form">Cancelar</button>
            </form>
        </template>
    </ModalView>
    <!--
    TODO: mensaje de exito y de error
    TODO: validación de horarios
    TODO: validación de horarios superpuestos
    TODO: edición de horarios 
    -->
</template>

<script lang="ts" setup>
import ModalView from '@/components/ModalView.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import { ref, onMounted } from 'vue'
import { SquarePen, Trash2 } from 'lucide-vue-next'
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '@/services/schedulesService'

const mostrarModal = ref(false)
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const horarios = ref({
    count: 0,
    next: null,
    previous: null,
    results: []
})
const modoEdicion = ref(false)
const horarioEditandoId = ref<number | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)

onMounted(cargarHorarios)

function transformarRespuesta(data: any) {
    totalPages.value = Math.ceil(data.count / 5); // Suponemos 10 por página
    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results.map((item: any) => ({
            id: item.id,
            dia: diasSemana[item.day_of_week] ?? 'Desconocido',
            hora: `${item.start_time.slice(0, 5)} - ${item.end_time.slice(0, 5)}`,
            disponible: item.is_available,
            permanente: item.is_reserved
        }))
    }
}

async function cargarHorarios(url?: string) {
    try {
        const datos = await getSchedules(url);
        horarios.value = transformarRespuesta(datos);
    } catch (error) {
        console.error('Error al obtener los horarios:', error);
    }
}

function goToNext() {
    if (horarios.value.next) {
        currentPage.value++;
        cargarHorarios(horarios.value.next);
    }
}

function goToPrevious() {
    if (horarios.value.previous) {
        currentPage.value--;
        cargarHorarios(horarios.value.previous);
    }
}

function goToPage(page: number) {
    currentPage.value = page;
    const url = `schedules/?page=${page}`;
    cargarHorarios(url);
}



const nuevoHorario = ref({
    day_of_week: null,
    start_time: '',
    end_time: '',
    is_available: true,
    is_reserved: false
})

const guardarHorario = async () => {
    const payload = {
        day_of_week: parseInt(nuevoHorario.value.day_of_week),
        start_time: nuevoHorario.value.start_time + ':00Z',
        end_time: nuevoHorario.value.end_time + ':00Z',
        is_available: nuevoHorario.value.is_available,
        is_reserved: nuevoHorario.value.is_reserved
    }

    try {
        if (modoEdicion.value && horarioEditandoId.value !== null) {
            await updateSchedule(horarioEditandoId.value, payload)
            console.log("Horario actualizado")
        } else {
            await createSchedule(payload)
            console.log("Horario creado")
        }

        mostrarModal.value = false
        modoEdicion.value = false
        horarioEditandoId.value = null

        const datos = await getSchedules()
        horarios.value = transformarRespuesta(datos)
    } catch (error) {
        console.error("Error al guardar horario:", error)
    }
}

const editarHorario = (id: number) => {
    const horario = horarios.value.results.find(h => h.id === id)
    if (!horario) return

    modoEdicion.value = true
    horarioEditandoId.value = id

    // Convertir formato para campos del formulario
    const horaInicio = horario.hora.split(' - ')[0]
    const horaFin = horario.hora.split(' - ')[1]
    const dayIndex = diasSemana.indexOf(horario.dia)

    nuevoHorario.value = {
        day_of_week: dayIndex.toString(),
        start_time: horaInicio,
        end_time: horaFin,
        is_available: horario.disponible,
        is_reserved: horario.permanente
    }

    mostrarModal.value = true
}

const eliminarHorario = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de que querés eliminar este horario?");
    if (!confirmar) return;

    try {
        await deleteSchedule(id);
        horarios.value.results = horarios.value.results.filter(h => h.id !== id);
        console.log('Horario eliminado:', id);
    } catch (error: any) {
        console.error('Error al eliminar horario:', error);
        alert(error?.response?.data?.detail || "Ocurrió un error al eliminar el horario.");
    }
}
</script>


<style scoped>
/* Badges */
.badge {
    padding: 0.25rem 0.5rem;
    border-radius: var(--pico-border-radius);
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.badge.success {
    background-color: #d4edda;
    color: #155724;
}

.badge.warning {
    background-color: #fff3cd;
    color: #856404;
}

/* Table improvements */
table {
    margin-top: 1rem;
}

/* Estilos para tablas */
.table-container {
    overflow-x: auto;
    margin-top: 1rem;
}

.table-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
}

.search-input {
    max-width: 300px;
    margin: 0;
}

table.striped tbody tr:nth-child(even) {
    background-color: var(--pico-table-border-color);
}

.actions-cell {
    white-space: nowrap;
}

.btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: 1px solid var(--pico-primary);
    background-color: var(--pico-primary);
    color: var(--pico-primary-inverse);
    text-decoration: none;
    border-radius: var(--pico-border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-small:hover {
    background-color: var(--pico-primary-hover);
    border-color: var(--pico-primary-hover);
}

.btn-small.secondary {
    background-color: var(--pico-secondary);
    border-color: var(--pico-secondary);
    color: var(--pico-secondary-inverse);
}

.btn-small.secondary:hover {
    background-color: var(--pico-secondary-hover);
    border-color: var(--pico-secondary-hover);
}

.btn-small.danger {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}

.btn-small.danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}
.button-form {
    width: 130px;
}
.badge.danger {
    background-color: #f8d7da;
    color: #721c24;
}
.icon-table {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}

/* Responsive para turnos */
@media (max-width: 768px) {
    .table-actions {
        flex-direction: column;
        align-items: stretch;
    }

    .search-input {
        max-width: 100%;
    }

    .actions-cell {
        white-space: normal;
    }

    .btn-small {
        margin-bottom: 0.25rem;
        display: block;
        text-align: center;
    }
}
</style>