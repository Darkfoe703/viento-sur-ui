<template>
    <main class="container">
        <h1>Hola desde Vue + Pico.css + Element Plus</h1>
        <hr>
        <button @click="openModal">Abrir Modal</button>

        <ModalView :isVisible="showModal" @close="showModal = false">
            <template v-slot:header>
                <button aria-label="Close" rel="prev" @click="showModal = false"></button>
                <p>
                    <strong>🎉 ¡Bienvenido al Evento Especial!</strong>
                </p>
            </template>

            <p>
                Este es el **contenido dinámico** que viene desde el componente padre.
                Podemos poner cualquier texto, listas o incluso otros componentes aquí.
            </p>
            <ul>
                <li>Detalle 1: Conferencia de apertura</li>
                <li>Detalle 2: Taller interactivo de Vue.js</li>
                <li>Detalle 3: Networking y café</li>
            </ul>

            <template v-slot:footer>
                <button @click="confirmAction">Confirmar Asistencia</button>
                <button @click="showModal = false" class="secondary">Quizás Más Tarde</button>
            </template>
        </ModalView>

    </main>
</template>

<script>
import ModalView from './ModalView.vue'; // Asegurate de que la ruta sea correcta

export default {
    components: {
        ModalView // Registra el componente para poder usarlo en este template
    },
    data() {
        return {
            showModal: false // Esta variable controla si el modal está visible o no
        };
    },
    methods: {
        // Método para cambiar el estado y mostrar el modal
        openModal() {
            this.showModal = true;
        },
        // Un ejemplo de método que se ejecutaría al hacer clic en un botón dentro del modal
        confirmAction() {
            alert('¡Asistencia confirmada! Gracias.');
            this.showModal = false; // Cierra el modal después de la acción
        }
    }
};
</script>

<style scoped>
/* Tus estilos locales */
.secondary {
    /* Aplica estilos de Pico.css para un botón secundario */
    background-color: var(--pico-secondary-background-color, #e0e0e0);
    color: var(--pico-secondary-color, #333);
}

.secondary:hover {
    background-color: var(--pico-secondary-hover-background-color, #d0d0d0);
}
</style>