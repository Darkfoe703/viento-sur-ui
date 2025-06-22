<template>
  <footer class="app-footer">
    <div class="copyright">
      &copy; {{ currentYear }} Viento Sur. Todos los derechos reservados.
    </div>
    <div class="links">
      <a href="/privacy">Política de Privacidad</a> |
      <a href="/terms">Términos de Uso</a>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
  background-color: var(--background-secondary-color); /* Un fondo claro para el footer */
  border-top: 1px solid var(--background-primary-color);
  font-size: 0.8rem;
  color: #6c757d;
}

.copyright {
  text-align: left;
}

.links {
  text-align: right;
}

.links a {
  color: #6c757d;
  text-decoration: none;
  margin-left: 1rem;
}

.links a:hover {
  text-decoration: underline;
}
</style>