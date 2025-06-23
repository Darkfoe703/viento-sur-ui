<template>
    <article>
        <h3>Gestión de Pacientes</h3>

        <div class="table-actions">
            <button class="btn-small" @click="mostrarModal = true">Nuevo Paciente</button>

            <input type="search" placeholder="Buscar paciente..." class="search-input" />
        </div>

        <div class="table-container">
            <table class="striped">
                <thead>
                    <tr>
                        <th>Nombre y Apellido</th>
                        <th>Celular</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in pacientes" :key="paciente.id">
                        <td>{{ paciente.nombre }} {{ paciente.apellido }}</td>
                        <td>{{ paciente.celular }}</td>
                        <td>{{ paciente.fechaNacimiento }}</td>
                        <td class="actions-cell">
                            <button class="btn-small secondary" @click="editarPaciente(paciente.id)">
                                <SquarePen class="icon-table" />
                                Editar
                            </button>
                            <button class="btn-small" @click="verDetalle(paciente.id)">
                                <Eye class="icon-table" />
                                Ver Detalle
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </article>
    <ModalView :is-visible="mostrarModal" @close="mostrarModal = false">
        <template #header>
            <h3>Nuevo Paciente</h3>
        </template>

        <template #default>
            <form action="">
                <fieldset class="grid">
                    <label for="nombre"> Nombres:
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" autocomplete="given-name"
                            required />
                    </label>

                    <label for="apellido"> Apellidos:
                        <input type="text" id="apellido" name="apellido" placeholder="Apellido"
                            autocomplete="family-name" required />
                    </label>
                </fieldset>
                <fieldset class="grid">
                    <label for="celular">Celular:
                        <input type="tel" id="celular" name="celular" placeholder="Celular" required />
                    </label>

                    <label for="fechaNacimiento">Fecha de Nacimiento:
                        <input type="date" id="fechaNacimiento" name="fechaNacimiento"
                            placeholder="Fecha de naciemiento" required />
                    </label>
                </fieldset>
            </form>
        </template>

        <template #footer>
            <form method="dialog">
                <button type="submit" @click="mostrarModal = false" class="button-form">Guardar</button>
                <button @click="mostrarModal = false" class="secondary button-form">Cancelar</button>
            </form>
        </template>
    </ModalView>

</template>

<script lang="ts" setup>
import ModalView from '@/components/ModalView.vue'
import { ref } from 'vue'
import { SquarePen, Eye } from 'lucide-vue-next'

const mostrarModal = ref(false)

interface Paciente {
    id: number
    nombre: string
    apellido: string
    celular: string
    fechaNacimiento: string
}

const pacientes = ref<Paciente[]>([
    {
        id: 1,
        nombre: 'María',
        apellido: 'García',
        celular: '+54 11 1234-5678',
        fechaNacimiento: '15/03/1985'
    },
    {
        id: 2,
        nombre: 'Juan',
        apellido: 'Pérez',
        celular: '+54 11 8765-4321',
        fechaNacimiento: '22/07/1990'
    },
    {
        id: 3,
        nombre: 'Ana',
        apellido: 'Rodriguez',
        celular: '+54 11 5555-1234',
        fechaNacimiento: '08/12/1978'
    },
    {
        id: 4,
        nombre: 'Carlos',
        apellido: 'Mendez',
        celular: '+54 11 9999-8888',
        fechaNacimiento: '30/05/1982'
    }
])

const editarPaciente = (id: number) => {
    console.log('Editar paciente:', id)
}

const verDetalle = (id: number) => {
    console.log('Ver detalle del paciente:', id)
}
</script>

<style scoped>
/* === Layout y Formularios === */
.table-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
}

.search-input {
    max-width: 300px;
}

/* === Tabla === */
.table-container {
    overflow-x: auto;
}

table {
    margin-top: 1rem;
}

table.striped tbody tr:nth-child(even) {
    background-color: var(--pico-table-border-color);
}

.actions-cell {
    white-space: nowrap;
}

/* === Botones === */
.btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    margin-right: 0.5rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: var(--pico-border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--pico-primary);
    border: 1px solid var(--pico-primary);
    color: var(--pico-primary-inverse);
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

.button-form {
    width: 130px;
}
/* === Iconos === */
.icon-table {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}

/* === Responsive === */
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

