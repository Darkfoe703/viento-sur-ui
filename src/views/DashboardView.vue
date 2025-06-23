<template>

          <div class="grid">
            <div class="card">
              <h3>Turnos de Hoy</h3>
              <p class="metric">12</p>
              <small>3 pendientes</small>
            </div>
            <div class="card">
              <h3>Pacientes Activos</h3>
              <p class="metric">248</p>
              <small>+5 este mes</small>
            </div>
            <div class="card">
              <h3>Próximo Turno</h3>
              <p class="metric">14:30</p>
              <small>Juan Pérez</small>
            </div>
          </div>
          
          <article>
            <h3>Resumen del Día</h3>
            <p>Bienvenido al dashboard médico. Aquí puedes gestionar turnos, pacientes y horarios de manera eficiente.</p>
          </article>
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* Importar Pico.css */
/* @import url('https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css'); */

.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--pico-background-color);
}



/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 70px;
  transition: margin-left 0.3s ease;
  min-height: 100vh;
}

.main-content.sidebar-collapsed {
  margin-left: 70px;
}

.main-header {
  background-color: var(--pico-card-background-color);
  border-bottom: 1px solid var(--pico-border-color);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.content-area {
  padding: 2rem;
}

.page-content {
  max-width: 1500px;
}

/* Cards and Metrics */
.card {
  background-color: var(--pico-card-background-color);
  border: 1px solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  padding: 1.5rem;
  text-align: center;
}

.card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--pico-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric {
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: var(--pico-primary);
}

.card small {
  color: var(--pico-muted-color);
}

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

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 280px;
  }
  
  .sidebar.collapsed {
    transform: translateX(-100%);
  }
  
  .main-content,
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
  
  .main-header {
    padding: 1rem;
  }
  
  .content-area {
    padding: 1rem;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Grid improvements */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-bottom: 2rem;
}

/* Table improvements */
table {
  margin-top: 1rem;
}

/* Form improvements */
input[type="search"] {
  margin-bottom: 1rem;
  max-width: 300px;
}

/* Estilos para Turnos */
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
  margin: 0 0 0.5rem 0;
  color: var(--pico-primary);
  font-size: 1.2rem;
}

.fecha {
  color: var(--pico-muted-color);
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.turnos-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
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

.badge.danger {
  background-color: #f8d7da;
  color: #721c24;
}

/* Responsive para turnos */
@media (max-width: 768px) {
  .turnos-grid {
    grid-template-columns: 1fr;
  }
  
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