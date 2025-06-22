<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-header">
        <button 
          class="toggle-btn" 
          @click="toggleSidebar"
          :aria-label="isCollapsed ? 'Expandir menú' : 'Contraer menú'"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        <h2 v-show="!isCollapsed" class="sidebar-title">Dashboard</h2>
      </div>
      
      <nav class="sidebar-nav">
        <ul>
          <li>
            <a 
              href="#" 
              class="nav-item" 
              :class="{ active: activeMenu === 'inicio' }"
              @click="setActiveMenu('inicio')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              <span v-show="!isCollapsed" class="nav-text">Inicio</span>
            </a>
          </li>
          
          <li>
            <a 
              href="#" 
              class="nav-item" 
              :class="{ active: activeMenu === 'turnos' }"
              @click="setActiveMenu('turnos')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span v-show="!isCollapsed" class="nav-text">Turnos</span>
            </a>
          </li>
          
          <li>
            <a 
              href="#" 
              class="nav-item" 
              :class="{ active: activeMenu === 'pacientes' }"
              @click="setActiveMenu('pacientes')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span v-show="!isCollapsed" class="nav-text">Pacientes</span>
            </a>
          </li>
          
          <li>
            <a 
              href="#" 
              class="nav-item" 
              :class="{ active: activeMenu === 'horarios' }"
              @click="setActiveMenu('horarios')"
            >
              <svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span v-show="!isCollapsed" class="nav-text">Horarios</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content" :class="{ 'sidebar-collapsed': isCollapsed }">
      <header class="main-header">
        <h1>{{ getPageTitle() }}</h1>
        <div class="header-actions">
          <button class="secondary">Configuración</button>
          <button>Perfil</button>
        </div>
      </header>

      <div class="content-area">
        <!-- Contenido dinámico basado en el menú activo -->
        <div v-if="activeMenu === 'inicio'" class="page-content">
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
        </div>

        <div v-else-if="activeMenu === 'turnos'" class="page-content">
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
        </div>

        <div v-else-if="activeMenu === 'pacientes'" class="page-content">
          <article>
            <h3>Gestión de Pacientes</h3>
            <div class="table-actions">
              <button>Nuevo Paciente</button>
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Editar
                      </button>
                      <button class="btn-small" @click="verDetalle(paciente.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <div v-else-if="activeMenu === 'horarios'" class="page-content">
          <article>
            <h3>Gestión de Horarios</h3>
            <div class="table-actions">
              <button>Nuevo Horario</button>
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
                  <tr v-for="horario in horarios" :key="horario.id">
                    <td>{{ horario.dia }}</td>
                    <td>{{ horario.hora }}</td>
                    <td>
                      <span class="badge" :class="horario.disponible ? 'success' : 'danger'">
                        {{ horario.disponible ? 'Disponible' : 'Ocupado' }}
                      </span>
                    </td>
                    <td class="actions-cell">
                      <button class="btn-small secondary" @click="editarHorario(horario.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Editar
                      </button>
                      <button class="btn-small danger" @click="eliminarHorario(horario.id)">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                        </svg>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isCollapsed = ref(false)
const activeMenu = ref('inicio')

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const setActiveMenu = (menu) => {
  activeMenu.value = menu
}

const getPageTitle = () => {
  const titles = {
    inicio: 'Dashboard - Inicio',
    turnos: 'Gestión de Turnos',
    pacientes: 'Gestión de Pacientes',
    horarios: 'Configuración de Horarios'
  }
  return titles[activeMenu.value] || 'Dashboard'
}

// Datos de ejemplo para turnos por día
const turnosPorDia = ref([
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

// Datos de ejemplo para pacientes
const pacientes = ref([
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

// Datos de ejemplo para horarios
const horarios = ref([
  { id: 1, dia: 'Martes', hora: '14:00', disponible: false },
  { id: 2, dia: 'Martes', hora: '14:40', disponible: false },
  { id: 3, dia: 'Martes', hora: '15:20', disponible: false },
  { id: 4, dia: 'Martes', hora: '16:00', disponible: true },
  { id: 5, dia: 'Miércoles', hora: '08:30', disponible: false },
  { id: 6, dia: 'Miércoles', hora: '09:10', disponible: true },
  { id: 7, dia: 'Miércoles', hora: '11:00', disponible: false },
  { id: 8, dia: 'Jueves', hora: '16:00', disponible: false },
  { id: 9, dia: 'Jueves', hora: '16:40', disponible: false },
  { id: 10, dia: 'Jueves', hora: '17:20', disponible: false }
])

// Funciones para manejar acciones
const editarPaciente = (id) => {
  console.log('Editar paciente:', id)
  // Aquí implementarías la lógica de edición
}

const verDetalle = (id) => {
  console.log('Ver detalle del paciente:', id)
  // Aquí implementarías la navegación al detalle
}

const editarHorario = (id) => {
  console.log('Editar horario:', id)
  // Aquí implementarías la lógica de edición
}

const eliminarHorario = (id) => {
  console.log('Eliminar horario:', id)
  // Aquí implementarías la lógica de eliminación
}
</script>

<style scoped>
/* Importar Pico.css */
@import url('https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css');

.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--pico-background-color);
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background-color: var(--pico-card-background-color);
  border-right: 1px solid var(--pico-border-color);
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow-x: hidden;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--pico-border-color);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--pico-border-radius);
  color: var(--pico-color);
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background-color: var(--pico-secondary-background);
}

.sidebar-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  color: var(--pico-color);
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0;
  margin: 0 0.5rem;
  border-radius: var(--pico-border-radius);
}

.nav-item:hover {
  background-color: var(--pico-secondary-background);
  color: var(--pico-primary);
}

.nav-item.active {
  background-color: var(--pico-primary);
  color: var(--pico-primary-inverse);
}

.nav-icon {
  min-width: 20px;
  flex-shrink: 0;
}

.nav-text {
  white-space: nowrap;
  overflow: hidden;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 280px;
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
  max-width: 1200px;
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