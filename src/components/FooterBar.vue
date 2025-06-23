<template>
  <footer class="app-footer">
    <small>&copy; {{ currentYear }} Viento Sur. Todos los derechos reservados.</small>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--pico-secondary-background);
  /* Fondo coherente con Pico */
  border-top: 1px solid var(--pico-border-color);
  font-size: 0.875rem;
  color: var(--pico-muted-color);
  max-height: 70px;
}

.footer-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--pico-muted-color);
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}
</style>
