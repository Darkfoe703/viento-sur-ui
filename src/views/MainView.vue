<template>
    <div class="main-layout">
        <SideBar :is-collapsed="isCollapsed" :active-menu="activeMenu" @toggle-sidebar="isCollapsed = !isCollapsed"
            @set-active-menu="handleMenuChange" />

        <main :class="{ collapsed: isCollapsed }">
            <router-view />
        </main>
    </div>

    <FooterBar />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import SideBar from '@/components/SideBar.vue'
import FooterBar from '@/components/FooterBar.vue'

const isCollapsed = ref(false)
const activeMenu = ref('inicio')

const router = useRouter()
const route = useRoute()

watch(
    () => route.path,
    (newPath) => {
        const map: Record<string, string> = {
            '/': 'inicio',
            '/calendar': 'turnos',
            '/patients': 'pacientes',
            '/schedules': 'horarios'
        }
        activeMenu.value = map[newPath] || 'inicio'
    },
    { immediate: true }
)

function handleMenuChange(menuKey: string) {
    const pathMap: Record<string, string> = {
        inicio: '/',
        turnos: '/calendar',
        pacientes: '/patients',
        horarios: '/schedules'
    }

    const path = pathMap[menuKey] || '/'
    if (route.path !== path) {
        router.push(path)
    }
}
</script>

<style scoped>
.main-layout {
    display: flex;
}

main {
    flex: 1;
    margin-left: 280px;
    padding: 1rem;
    transition: margin-left 0.3s ease;
}

main.collapsed {
    margin-left: 70px;
}
</style>

