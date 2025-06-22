<!-- TODO: Asegurarme que el sidebar se vea bien en dispositivos móviles
y que el menú colapsado funcione correctamente. -->
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
  >
    <el-menu-item @click="toggleCollapse">
      <el-icon @click="toggleCollapse"><Menu /></el-icon>
      <span v-if="!isCollapse" @click="toggleCollapse">Viento Sur Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/calendar">
      <el-icon @click="toggleCollapse"><Calendar /></el-icon>
      <span>Turnos</span>
    </el-menu-item>
    <el-menu-item index="/patients">
      <el-icon @click="toggleCollapse"><User /></el-icon>
      <span>Pacientes</span>
    </el-menu-item>
    <el-menu-item index="/schedules">
      <el-icon @click="toggleCollapse"><Clock /></el-icon>
      <span>Horarios</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { ref } from 'vue';
import { Menu, Calendar, User, Clock } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isCollapse = ref(false);
const activeIndex = ref(route.path);

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto; /* Ancho del menú desplegado */
  min-height: 400px;
  background-color: var(--background-secondary-color);
}

.el-menu--collapse {
  width: 60px; /* Ancho del menú colapsado */
  background-color: var(--background-secondary-color);
}

.el-menu-item [class*="el-icon"] {
  margin-right: 0 !important; /* Evita el margen del icono cuando el menú está colapsado */
  color: var(--font-primary-color);
}

.el-menu-item:hover{
  background-color: var(--background-primary-color);
}
.el-menu-item span {
  font-size: 1.2em;
  padding-left: 1em;
  color: var(--font-primary-color);
  /* Oculta el texto cuando el menú está colapsado */
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  transition: width 0.3s ease-in-out;
}

.el-menu--collapse .el-menu-item span {
  width: 0 !important;
}

.el-menu:not(.el-menu--collapse) .el-menu-item span {
  width: auto;
}
.el-menu-item.is-active {
	color: var(--accent-color);
}
</style>