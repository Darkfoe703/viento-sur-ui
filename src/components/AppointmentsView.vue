<template>
    <div>
        <h1>Turnos Asignados</h1>
        <el-divider />
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column label="Lunes" >
                <el-table-column prop="schedule0" label="Turno" />
                <el-table-column prop="patient0" label="Paciente" />
            </el-table-column>
            <el-table-column label="Martes" >
                <el-table-column prop="schedule1" label="Turno" />
                <el-table-column prop="patient1" label="Paciente" />
            </el-table-column>
            <el-table-column label="Miércoles" >
                <el-table-column prop="schedule2" label="Turno" />
                <el-table-column prop="patient2" label="Paciente" />
            </el-table-column>
            <el-table-column label="Jueves" >
                <el-table-column prop="schedule3" label="Turno" />
                <el-table-column prop="patient3" label="Paciente" />
            </el-table-column>
            <el-table-column label="Viernes" >
                <el-table-column prop="schedule4" label="Turno" />
                <el-table-column prop="patient4" label="Paciente" />
            </el-table-column>
            <el-table-column label="Sábado" >
                <el-table-column prop="schedule5" label="Turno" />
                <el-table-column prop="patient5" label="Paciente" />
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
const tableData = [
    {
        schedule0: '09:00 - 10:00',
        patient0: 'Ana Perez',
        schedule1: '09:00 - 10:00',
        patient1: 'Juan Perez',
        schedule2: '09:00 - 10:00',
        patient2: 'María Lopez',
        schedule3: '09:00 - 10:00',
        patient3: 'Pedro Martinez',
        schedule4: '09:00 - 10:00',
        patient4: 'Lucía Fernández',
        schedule5: '09:00 - 10:00',
        patient5: 'Javier García',
    },
    {
        schedule0: '10:00 - 11:00',
        patient0: 'Carlos Lopez',
    },
    {
        schedule0: '11:00 - 12:00',
        patient0: 'Sofía Gomez',
    },
    {
        schedule0: '12:00 - 13:00',
        patient0: 'Juan Martinez',
    },
    {
        schedule0: '13:00 - 14:00',
        patient0: 'María Fernández',
    },
    {
        schedule0: '14:00 - 15:00',
        patient0: 'Luis García',
    },
]
</script>