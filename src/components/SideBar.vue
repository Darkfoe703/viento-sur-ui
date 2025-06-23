<template>
  <aside class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <button class="toggle-btn" @click="$emit('toggle-sidebar')"
        :aria-label="isCollapsed ? 'Expandir menú' : 'Contraer menú'">
        <Menu class="nav-icon"/>
      </button>
      <h2 v-show="!isCollapsed" class="sidebar-title">Dashboard</h2>
    </div>

    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.key">
          <a href="#" class="nav-item" :class="{ active: activeMenu === item.key }"
            @click.prevent="$emit('set-active-menu', item.key)">
            <component :is="item.icon" class="nav-icon" :size="24" />
            <span v-show="!isCollapsed" class="nav-text">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
import { Menu, Home, CalendarDays, Users, Clock } from 'lucide-vue-next'

defineProps({
  isCollapsed: Boolean,
  activeMenu: String
})

defineEmits(['toggle-sidebar', 'set-active-menu'])

const menuItems = [
  { key: 'inicio', label: 'Inicio', icon: Home },
  { key: 'turnos', label: 'Turnos', icon: CalendarDays },
  { key: 'pacientes', label: 'Pacientes', icon: Users },
  { key: 'horarios', label: 'Horarios', icon: Clock }
]
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: var(--pico-card-background-color);
  border-right: 1px solid var(--pico-border-color);
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: .5rem;
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

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem .5rem;
  color: var(--pico-color);
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 0 0.1rem;
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
  flex-shrink: 0;
}

.nav-text {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.collapsed {
    transform: translateX(-100%);
  }
}
</style>