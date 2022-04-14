<script setup lang="ts">
defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:isEditing'])
</script>

<template>
  <q-card-section>
    <div class="row items-center no-wrap">
      <div class="col">
        <div class="text-h5">
          <q-icon name="fa fa-user" class="q-mr-md" />
          <span>Meu perfil</span>
        </div>
      </div>

      <div class="col-auto">
        <q-btn
          :icon="isEditing ? 'fa fa-times' : 'fa fa-pencil-alt'"
          :color="isEditing ? 'red-5' : 'grey-7'"
          round
          flat
          style="font-size: 1em"
          @click="$emit('update:isEditing', !isEditing)"
        >
          <q-tooltip
            style="font-size: 15px"
            :offset="[0, 10]"
            anchor="top middle"
            self="center middle"
          >
            {{ isEditing ? 'Cancelar edição' : 'Editar' }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-card-section>
</template>
