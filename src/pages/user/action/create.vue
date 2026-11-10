<script setup lang="ts">
import { createAction } from '@/cloud-functions/actions/create'
import { createImage } from '@/cloud-functions/image/create'
import LocationPicker from '@/components/form/LocationPicker.vue'
import Map from '@/components/maps/Map.vue'
import MCard from '@/components/MCard.vue'
import { useActionStore } from '@/stores/action.store'
import { usePermStore } from '@/stores/perm.store'
import { X } from '@lucide/vue'
import { Form } from '@primevue/forms'
import { DatePicker } from 'primevue'
import { useToast } from '@nuxt/ui/composables/useToast'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()
const permStore = usePermStore()
const actionStore = useActionStore()

const title = ref<string>('')
const dateStart = ref<Date>(new Date())
const dateEnd = ref<Date>(new Date())
const locationName = ref<string>('')
const location = ref<{ x: number; y: number } | undefined>(undefined)
const image = ref<string | null>(null)
const imageName = ref<string>('')
const descriptionEvent = ref<string>('')
const description = ref<string>('')
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)

const locationPicked = ref<{
  address: string
  lat: number
  lng: number
}>()

const imagePerm = computed(() => permStore.getPerm(':area/image/create', false))

watch(locationPicked, (picked) => {
  location.value = { x: picked?.lat ?? 0, y: picked?.lng ?? 0 }
  locationName.value = picked?.address ?? locationName.value
})

function onFileSelect(event) {
  const file: File = event.files[0]
  if (!file) return
  selectedFile.value = file
  imageName.value = file.name
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (typeof result === 'string') {
      image.value = result
    }
  }
  reader.readAsDataURL(file)
}

async function handleCreateAction() {
  if (!title.value.trim()) {
    toast.add({
      color: 'error',
      title: t('action.error'),
      description: `${t('input.title')} ${t('is-empty')}`,
      duration: 3000,
    })
    return
  }

  if (dateStart.value >= dateEnd.value) {
    toast.add({
      color: 'error',
      title: t('action.error'),
      description: t('action.error.date-start-greater-date-end'),
      duration: 3000,
    })
    return
  }

  isLoading.value = true

  try {
    let imageId: number | null = null

    if (selectedFile.value) {
      const upload = createImage(selectedFile.value, title.value, false)
      await upload.doFetch()

      const uploadError = upload.errorCode.value ?? 200

      if (uploadError === 413) {
        toast.add({
          color: 'error',
          title: t('image-too-big'),
          description: t('image-too-big.max-10mo'),
          duration: 3000,
        })
        isLoading.value = false
        return
      }

      if (uploadError !== 200 || !upload.data.value?.id) {
        toast.add({
          color: 'error',
          title: t('action.error'),
          description: t('action.error.upload'),
          duration: 3000,
        })
        isLoading.value = false
        return
      }

      imageId = upload.data.value.id
    }

    const action = createAction(
      {
        title: title.value,
        dateStart: dateStart.value,
        dateEnd: dateEnd.value,
        description: description.value,
        descriptionEvent: descriptionEvent.value,
        location: location.value,
        locationName: locationName.value,
        image: imageId !== null ? String(imageId) : undefined,
      },
      false,
    )

    await action.doFetch()

    const actionError = action.errorCode.value ?? 200

    if (actionError !== 200) {
      toast.add({
        color: 'error',
        title: t('action.error'),
        description: t('action.error.creation'),
        duration: 3000,
      })
      isLoading.value = false
      return
    }

    toast.add({
      color: 'success',
      title: t('action.created'),
      description: `"${title.value}" ${t('action.created')}`,
      duration: 3000,
    })

    title.value = ''
    description.value = ''
    descriptionEvent.value = ''
    locationName.value = ''
    location.value = undefined
    image.value = null
    imageName.value = ''
    selectedFile.value = null
    locationPicked.value = undefined
    dateStart.value = new Date()
    dateEnd.value = new Date()
    actionStore.reloadActions()
  } catch (error) {
    console.error('Error creating action:', error)
    toast.add({
      color: 'error',
      title: t('action.error'),
      description: t('action.error.creation'),
      duration: 3000,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex w-full flex-col gap-2 overflow-y-auto lg:flex-row lg:overflow-hidden">
    <MCard class="w-full" :title="t('action.creation')">
      <Form class="flex w-full flex-col gap-4">
        <span class="flex flex-col gap-1">
          <label for="action.title">{{ t('input.title') }}</label>
          <UInput id="action.title" v-model="title" />
        </span>
        <fieldset class="flex flex-col gap-4 rounded-lg border border-default p-4">
          <legend class="px-2 text-sm font-medium text-default">{{ t('input.date-set') }}</legend>
          <span class="flex flex-col gap-4">
            <span class="flex flex-col gap-1">
              <label for="action.dateStart">{{ t('input.date-start') }}</label>
              <DatePicker
                id="action.dateStart"
                :minDate="new Date()"
                v-model="dateStart"
                showTime
                hourFormat="24"
                showIcon
                fluid
              />
            </span>
            <span class="flex flex-col gap-1">
              <label for="action.dateEnd">{{ t('input.date-end') }}</label>
              <DatePicker
                id="action.dateEnd"
                :minDate="new Date()"
                v-model="dateEnd"
                showTime
                hourFormat="24"
                showIcon
                fluid
              />
            </span>
          </span>
        </fieldset>
        <span class="flex flex-col gap-1">
          <label for="action.description">{{ t('input.description') }}</label>
          <UInput id="action.description" v-model="description" />
        </span>
        <UFormField :label="t('input.descriptionEvent')">
          <UTextarea
            id="action.descriptionEvent"
            v-model="descriptionEvent"
            :rows="6"
            autoresize
          />
        </UFormField>
        <span class="flex flex-col gap-1">
          <label for="action.locationName">{{ t('input.location-name') }}</label>
          <UInput id="action.locationName" v-model="locationName" />
        </span>
        <span class="flex flex-col gap-1">
          <label for="action.adress">{{ t('input.location-adress') }}</label>
          <LocationPicker @change="(value) => (locationPicked = value)" />
        </span>
        <span class="flex flex-col gap-1" v-if="imagePerm">
          <UAlert color="warning">{{ t('input.image.warn') }}</UAlert>
          <span class="flex items-center gap-2">
            <label for="action.image">{{ t('input.image') }}</label>
            <UFileUpload
              accept="image/png, image/jpeg, image/gif, image/jpg"
              :disabled="isLoading"
              @change="onFileSelect"
            />
            <span v-if="imageName != ''">
              {{ imageName }}
            </span>
            <UButton v-if="imageName != ''" variant="outline" color="neutral"><X :size="18" /></UButton>
          </span>
        </span>
        <span v-else>
          <UAlert color="neutral">{{ t('input.image.no-perm') }}</UAlert>
        </span>
      </Form>
      <template #footer>
        <UButton :loading="isLoading" @click="handleCreateAction" class="w-full">{{
          t('create-action')
        }}</UButton>
      </template>
    </MCard>
    <MCard class="w-full" :title="t('action.render')">
      <div class="flex flex-col gap-6">
        <div
          v-if="image"
          class="h-64 w-full rounded-lg bg-cover bg-center"
          :style="{ 'background-image': `url(${image})` }"
        />
        <div v-if="title" class="flex flex-col gap-2">
          <h2 class="text-3xl font-bold">{{ title }}</h2>
          <p v-if="description" class="text-muted">{{ description }}</p>
        </div>
        <div v-if="dateStart || dateEnd" class="flex flex-col gap-3 rounded-lg bg-elevated p-4">
          <h3 class="text-lg font-semibold">{{ t('input.date-set') }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-if="dateStart">
              <p class="text-sm text-muted">{{ t('input.date-start') }}</p>
              <p class="font-medium">{{ dateStart.toLocaleString() }}</p>
            </div>
            <div v-if="dateEnd">
              <p class="text-sm text-muted">{{ t('input.date-end') }}</p>
              <p class="font-medium">{{ dateEnd.toLocaleString() }}</p>
            </div>
          </div>
        </div>
        <div v-if="locationName || location" class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">{{ t('input.location-name') }}</h3>
          <p v-if="locationName" class="text-default">{{ locationName }}</p>
          <Map v-if="location" :label="locationName" :geo="location" />
        </div>
        <div v-if="descriptionEvent" class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">{{ t('input.descriptionEvent') }}</h3>
          <p class="whitespace-pre-wrap text-default">{{ descriptionEvent }}</p>
        </div>
      </div>
    </MCard>
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  :deep(section) {
    overflow: visible;
  }
}
</style>
