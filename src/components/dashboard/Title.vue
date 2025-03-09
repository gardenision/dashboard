<template>
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
            <span class="text-xl font-medium">{{ title }}</span>
            <Button label="Add" icon="pi pi-plus" class="p-button-rounded p-button-outlined ml-4" v-if="typeof attrs.onAdd === 'function'" @click="attrs.onAdd()" />
        </div>
        <div class="flex items-center gap-4">
            <Button label="Refresh" icon="pi pi-refresh" class="p-button-rounded p-button-outlined" v-if="typeof attrs.onRefresh === 'function'" @click="attrs.onRefresh()" />
        </div>
    </div>
</template>

<script setup>
import { useAttrs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});

const attrs = useAttrs();
</script>
