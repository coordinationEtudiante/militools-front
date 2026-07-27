<template>
  <div class="flex w-full gap-2">
    <Toast />
    <MCard class="w-full" :title="t('action.creation')">
      <Form class="flex w-full flex-col gap-4">
        <span class="flex flex-col gap-1">
          <label for="action.title">{{ t('input.title') }}</label>
          <InputText id="action.title" v-model="title" />
        </span>
        <Fieldset :legend="t('input.date-set')">
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
        </Fieldset>
        <span class="flex flex-col gap-1">
          <label for="action.description">{{ t('input.description') }}</label>
          <InputText id="action.description" v-model="description" />
        </span>
        <span class="flex flex-col gap-1">
          <label for="action.descriptionEvent">{{ t('input.descriptionEvent') }}</label>
          <Editor id="action.descriptionEvent" v-model="descriptionEvent" />
        </span>
        <span class="flex flex-col gap-1">
          <label for="action.locationName">{{ t('input.location-name') }}</label>
          <InputText id="action.locationName" v-model="locationName" />
        </span>
        <span class="flex flex-col gap-1">
          <label for="action.adress">{{ t('input.location-adress') }}</label>
          <LocationPicker @change="(value) => (locationPicked = value)" />
        </span>
        <span class="flex items-center gap-1">
          <label for="action.image">{{ t('input.image') }}</label>
          <FileUpload
            id="action.image"
            mode="basic"
            @select="onFileSelect"
            customUpload
            accept="image/png, image/jpeg, image/gif, image/jpg"
            severity="secondary"
            class="p-button-outlined"
          />
          <span v-if="imageName != ''">
            {{ imageName }}
          </span>
        </span>
      </Form>
      <template #footer>
        <Button fluid :loading="isLoading" @click="handleCreateAction">{{
          t('create-action')
        }}</Button>
      </template>
    </MCard>
    <MCard class="w-full" :title="t('action.render')">
      <div class="flex flex-col gap-6">
        <!-- Image Hero -->
        <div
          v-if="image"
          class="h-64 w-full rounded-lg bg-cover bg-center"
          :style="{ 'background-image': `url(${image})` }"
        />

        <!-- Title -->
        <div v-if="title" class="flex flex-col gap-2">
          <h2 class="text-3xl font-bold">{{ title }}</h2>
          <p v-if="description" class="text-gray-600">{{ description }}</p>
        </div>

        <!-- Dates -->
        <div v-if="dateStart || dateEnd" class="flex flex-col gap-3 rounded-lg bg-gray-50 p-4">
          <h3 class="text-lg font-semibold">{{ t('input.date-set') }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-if="dateStart">
              <p class="text-sm text-gray-600">{{ t('input.date-start') }}</p>
              <p class="font-medium">{{ dateStart.toLocaleString() }}</p>
            </div>
            <div v-if="dateEnd">
              <p class="text-sm text-gray-600">{{ t('input.date-end') }}</p>
              <p class="font-medium">{{ dateEnd.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Location -->
        <div v-if="locationName || location" class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">{{ t('input.location-name') }}</h3>
          <p v-if="locationName" class="text-gray-700">{{ locationName }}</p>
          <Map v-if="location" :label="locationName" :geo="location" />
        </div>

        <!-- Event Description -->
        <div v-if="descriptionEvent" class="flex flex-col gap-3">
          <h3 class="text-lg font-semibold">{{ t('input.descriptionEvent') }}</h3>
          <Editor
            v-model="descriptionEvent"
            readonly
            :pt="{
              toolbar: { style: { display: 'none' } },
              editorElement: { style: { padding: '1rem', backgroundColor: '#f9fafb' } },
            }"
            class="editor"
          />
        </div>
      </div>
    </MCard>
  </div>
</template>

<script setup lang="ts">
import { createAction } from '@/cloud-functions/actions/create'
import { createImage } from '@/cloud-functions/image/create'
import LocationPicker from '@/components/form/LocationPicker.vue'
import MCard from '@/components/MCard.vue'
import Map from '@/components/Map.vue'
import { Button, DatePicker, Fieldset, FileUpload, InputText, Toast } from 'primevue'
import Editor from 'primevue/editor'
import { useToast } from 'primevue/usetoast'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Form } from '@primevue/forms'

const { t } = useI18n()
const toast = useToast()

const title = ref<string>('')
const dateStart = ref<Date>(new Date())
const dateEnd = ref<Date>(new Date())
const locationName = ref<string>('')
const location = ref<{ x: number; y: number } | undefined>(undefined)
const image = ref<string | null>(null)
const imageName = ref<string>('')
const descriptionEvent = ref<string>('')
const description = ref<string>('')
const locationPicked = ref<{
  address: string
  lat: number
  lng: number
}>()
const selectedFile = ref<File | null>(null)
const isLoading = ref(false)

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
      severity: 'error',
      summary: t('action.error'),
      detail: `${t('input.title')} ${t('is-empty')}`,
      life: 3000,
    })
    return
  }

  if (dateStart.value >= dateEnd.value) {
    toast.add({
      severity: 'error',
      summary: t('action.error'),
      detail: t('action.error.date-start-greater-date-end'),
      life: 3000,
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
          severity: 'error',
          summary: t('immage-too-big'),
          detail: t('immage-too-big.max-10mo'),
          life: 3000,
        })
        isLoading.value = false
        return
      }

      if (uploadError !== 200 || !upload.data.value?.id) {
        toast.add({
          severity: 'error',
          summary: t('action.error'),
          detail: t('action.error.upload'),
          life: 3000,
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
        severity: 'error',
        summary: t('action.error'),
        detail: t('action.error.creation'),
        life: 3000,
      })
      isLoading.value = false
      return
    }

    toast.add({
      severity: 'success',
      summary: t('action.created'),
      detail: `"${title.value}" ${t('action.created')}`,
      life: 3000,
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
  } catch (error) {
    console.error('Error creating action:', error)
    toast.add({
      severity: 'error',
      summary: t('action.error'),
      detail: t('action.error.creation'),
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
}
</script>
