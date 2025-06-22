<template>
    <div>
        <h1>Pacientes</h1>
        <el-divider />
        <el-table :data="patients" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="Nombre"></el-table-column>
            <el-table-column prop="lastName" label="Apellido"></el-table-column>
            <el-table-column prop="birthDate" label="Fecha de Nacimiento"></el-table-column>
            <el-table-column prop="age" label="Edad"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="phone" label="Teléfono"></el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

const patients = ref([
  {
    id: 1,
    name: 'Ana',
    lastName: 'Perez',
    birthDate: '1985-03-15',
    age: 24,
    email: 'ana.perez@email.com',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Carlos',
    lastName: 'Lopez',
    birthDate: '1992-11-20',
    age: 33,
    email: 'carlos.lopez@email.com',
    phone: '987-654-3210',
  },
  {
    id: 3,
    name: 'Sofía',
    lastName: 'Comez',
    birthDate: '1978-06-01',
    age: 53,
    email: 'sofia.gomez@email.com',
    phone: '555-123-4567',
  },
  // ... más pacientes
]);
</script>

<style scoped>
/* Estilos específicos para esta vista si los necesitas */
.el-table {
    background-color: var(--background-primary-color);
    --el-table-border-color: var(--line-color);
    --el-table-tr-bg-color: var(--background-secondary-color);
    --el-table-header-bg-color: var(--background-secondary-color);
    --el-table-row-hover-bg-color: var(--primary-color);
}
</style>