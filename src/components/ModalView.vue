<template>
    <dialog ref="myDialogRef">
        <article>
            <header>
                <slot name="header">
                    <p>
                        <strong>🗓️ Thank You for Registering!</strong>
                    </p>
                </slot>
            </header>

            <slot>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, exercitationem. Culpa ullam dolorum
                    qui cum ipsa impedit reiciendis itaque sed doloremque! Voluptates neque nam illum assumenda natus
                    laborum unde cumque?</p>
            </slot>

            <footer>
                <slot name="footer">
                    <form method="dialog">
                        <button @click="closeModal">Cerrar</button>
                    </form>
                </slot>
            </footer>
        </article>
    </dialog>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

export default {
    // Define las propiedades que este componente aceptará de su padre
    props: {
        isVisible: {
            type: Boolean,
            default: false // Por defecto, el modal no es visible
        }
    },
    setup(props, { emit }) {
        // Crea una referencia reactiva para el elemento <dialog>
        const myDialogRef = ref(null);

        // Observa los cambios en la prop 'isVisible'
        watch(() => props.isVisible, (newVal) => {
            if (newVal) {
                // Si isVisible es true, muestra el modal usando el método nativo del dialog
                myDialogRef.value.showModal();
            } else {
                // Si isVisible es false, cierra el modal
                myDialogRef.value.close();
            }
        });

        // Escucha el evento 'close' nativo del <dialog> (ej. al presionar Escape o usar form method="dialog")
        // y emite el evento 'close' de Vue al padre para mantener el estado sincronizado.
        onMounted(() => {
            if (myDialogRef.value) {
                myDialogRef.value.addEventListener('close', () => {
                    emit('close');
                });
            }
        });

        // Método para cerrar el modal desde un botón interno (si se usa un @click)
        const closeModal = () => {
            myDialogRef.value.close(); // Cierra el <dialog> nativo
            emit('close');             // Emite el evento para que el padre actualice su estado
        };

        // Expone la referencia y el método para que estén disponibles en el template
        return {
            myDialogRef,
            closeModal
        };
    }
};
</script>

<style scoped>
/*
    Este bloque de estilos está vacío para que Pico.css aplique sus estilos por defecto.
    Asegúrate de que Pico.css esté correctamente enlazado en tu proyecto (ej. en public/index.html
    o importado en main.js) para que los estilos se apliquen.
  */
</style>