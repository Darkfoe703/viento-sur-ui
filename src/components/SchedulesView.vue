<template>
    <div>
        <h1>Horarios Disponibles</h1>
        <el-divider />
        <el-segmented v-model="value" :options="options" block />
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="start_time" label="Inicio" width="250" />
          <el-table-column prop="end_time" label="Fin" width="250" />
          <el-table-column prop="is_available" label="Disponible" width="250" />
          <el-table-column prop="is_reserved" label="Reservado" width="250">
            <el-switch
              v-model="value4"
              class="ml-2"
              inline-prompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-text="Sí"
              inactive-text="No"
            />
          </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value4 = ref(true)
const value = ref('Mon')

const options = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]
const tableData = [
  {
    start_time: '14:00',
    end_time: '14:40',
    is_available: 'Sí',
    is_reserved: 'No',
  },
  {
    start_time: '14:40',
    end_time: '15:10',
    is_available: 'No',
    is_reserved: 'Sí',
  },
  {
    start_time: '15:10',
    end_time: '16:50',
    is_available: 'Sí',
    is_reserved: 'No',
  },
  {
    start_time: '17:00',
    end_time: '17:40',
    is_available: 'Sí',
    is_reserved: 'No',
  },
]
</script>
