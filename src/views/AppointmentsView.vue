<template>
    <article>
        <h3>Turnos por Día</h3>
        <div class="turnos-grid">
            <div class="turno-card" v-for="dia in turnosPorDia" :key="dia.nombre">
                <h4>{{ dia.nombre }}</h4>
                <p class="fecha">{{ dia.fecha }}</p>
                <ul class="turnos-list">
                    <li v-for="turno in dia.turnos" :key="turno.hora" class="turno-item">
                        <span class="hora">{{ turno.hora }}</span>
                        <span class="paciente">{{ turno.paciente }}</span>
                    </li>
                </ul>
                <small class="total-turnos">{{ dia.turnos.length }} turnos programados</small>
            </div>
        </div>
    </article>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Turno {
    hora: string
    paciente: string
}

interface TurnoDia {
    nombre: string
    fecha: string
    turnos: Turno[]
}

const turnosPorDia = ref<TurnoDia[]>([
    {
        nombre: 'Lunes',
        fecha: '15 Enero 2024',
        turnos: [
            { hora: '09:00', paciente: 'Carlos Mendez' },
            { hora: '09:40', paciente: 'Ana Rodriguez' },
            { hora: '10:20', paciente: 'Luis Fernandez' }
        ]
    },
    {
        nombre: 'Martes',
        fecha: '16 Enero 2024',
        turnos: [
            { hora: '14:00', paciente: 'Zaira' },
            { hora: '14:40', paciente: 'Lourdes' },
            { hora: '15:20', paciente: 'Valentina' }
        ]
    },
    {
        nombre: 'Miércoles',
        fecha: '17 Enero 2024',
        turnos: [
            { hora: '08:30', paciente: 'Roberto Silva' },
            { hora: '11:00', paciente: 'Patricia Lopez' }
        ]
    },
    {
        nombre: 'Jueves',
        fecha: '18 Enero 2024',
        turnos: [
            { hora: '16:00', paciente: 'Miguel Torres' },
            { hora: '16:40', paciente: 'Sofia Gutierrez' },
            { hora: '17:20', paciente: 'Diego Morales' },
            { hora: '18:00', paciente: 'Carmen Vega' }
        ]
    }
])
</script>

<style scoped>
.turnos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
}

.turno-card {
    background-color: var(--pico-card-background-color);
    border: 1px solid var(--pico-border-color);
    border-radius: var(--pico-border-radius);
    padding: 1.5rem;
}

.turno-card h4 {
    margin-bottom: 0.5rem;
    color: var(--pico-primary);
    font-size: 1.2rem;
}

.fecha {
    color: var(--pico-muted-color);
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.turnos-list {
    list-style: none;
    padding: 0;
    margin-bottom: 1rem;
}

.turno-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--pico-border-color);
}

.turno-item:last-child {
    border-bottom: none;
}

.hora {
    font-weight: 600;
    color: var(--pico-primary);
    font-family: monospace;
}

.paciente {
    color: var(--pico-color);
}

.total-turnos {
    color: var(--pico-muted-color);
    font-style: italic;
}

@media (max-width: 768px) {
    .turnos-grid {
        grid-template-columns: 1fr;
    }
}
</style>  
