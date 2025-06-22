<template>
  <main class="container">
    <h1>Hola desde Vue + Pico.css + Element Plus</h1>
    <el-button type="primary">Botón Primario de Element Plus</el-button>
    <button class="contrast">Botón de Pico.css</button>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus'; // Importación individual (opcional)

export default defineComponent({
  name: 'HelloWorld',
  components: {
    ElButton, // Registro local (opcional si se instaló globalmente)
  },
});
</script>

<style scoped>
/* Tus estilos locales */
</style>