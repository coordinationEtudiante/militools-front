<template>
  <Toast />
  <Card
    class="h-full w-full overflow-hidden"
    :pt="{
      body: { class: 'h-full flex flex-col min-h-0' },
      content: { class: 'h-full flex flex-col min-h-0 overflow-hidden' },
    }"
  >
    <template #title>{{ t('create-contacts.review') }}</template>
    <template #header>
      <!-- progress bar -->
      <div class="row flex h-2 w-full gap-4 p-2">
        <div class="h-2 w-full rounded-full bg-sky-500"></div>
        <div class="h-2 w-full rounded-full bg-sky-500"></div>
        <div class="h-2 w-full rounded-full bg-sky-50"></div>
      </div>
    </template>
    <template #content>
      <div class="flex h-full min-h-0 flex-col gap-3 overflow-auto">
        <div
          v-if="totalNb === 0"
          class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500"
        >
          <Users class="h-5 w-5" />
          {{ t('create-contacts.no-contact') }}
        </div>
        <template v-else>
          <!-- stats -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600"
              >
                <Users class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <div class="text-2xl font-bold text-gray-900">{{ totalNb }}</div>
                <div class="truncate text-sm text-gray-500">
                  {{ t('create-contacts.review-total') }}
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600"
              >
                <TriangleAlert class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <div class="text-2xl font-bold text-red-600">{{ errorNb }}</div>
                <div class="truncate text-sm text-red-500">
                  {{ t('create-contacts.review-error') }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3"
            >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
              >
                <CircleCheck class="h-5 w-5" />
              </span>
              <div class="min-w-0">
                <div class="text-2xl font-bold text-emerald-600">{{ validNb }}</div>
                <div class="truncate text-sm text-emerald-500">
                  {{ t('create-contacts.review-valid') }}
                </div>
              </div>
            </div>
          </div>

          <Tabs
            lazy
            :value="activeTab"
            @update:value="(value) => (activeTab = value as 'error' | 'valid')"
          >
            <TabList class="shrink-0">
              <Tab value="error">
                <span class="flex items-center gap-2">
                  <TriangleAlert class="h-4 w-4" />
                  {{ t('create-contacts.review-error') }}
                  <Tag severity="danger" :value="errorNb" />
                </span>
              </Tab>
              <Tab value="valid">
                <span class="flex items-center gap-2">
                  <CircleCheck class="h-4 w-4" />
                  {{ t('create-contacts.review-valid') }}
                  <Tag severity="success" :value="validNb" />
                </span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="error">
                <div
                  v-if="errorNb === 0"
                  class="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500"
                >
                  <CircleCheck class="h-5 w-5 text-emerald-500" />
                  {{ t('create-contacts.review-error-empty') }}
                </div>
                <div v-else class="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  <ContactReviewCard
                    v-for="contact in errorContacts"
                    :key="contact.rowId"
                    :index="contact.rowId"
                    :errored="true"
                    :fields="fields"
                    :contact="contact.data"
                    @update:value="(name, value) => onFieldUpdate(contact, name, value)"
                  />
                </div>
              </TabPanel>
              <TabPanel value="valid">
                <div
                  v-if="validNb === 0"
                  class="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500"
                >
                  <Users class="h-5 w-5" />
                  {{ t('create-contacts.review-valid-empty') }}
                </div>
                <div v-else class="grid grid-cols-1 gap-3 xl:grid-cols-2">
                  <ContactReviewCard
                    v-for="contact in validContacts"
                    :key="contact.rowId"
                    :index="contact.rowId"
                    :errored="false"
                    :fields="fields"
                    :contact="contact.data"
                    @update:value="(name, value) => onFieldUpdate(contact, name, value)"
                  />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </template>
      </div>
    </template>
    <template #footer>
      <div class="flex w-full items-center justify-between gap-2">
        <Message v-if="errorNb > 0" severity="warn" variant="simple" size="small" class="min-w-0">
          {{ t('create-contacts.review-remaining-error', { nb: errorNb }) }}
        </Message>
        <span v-else />
        <Button severity="success" @click="goToMerge">{{ t('next') }}</Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import ContactReviewCard from '@/components/contacts/ContactReviewCard.vue'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { usePermStore } from '@/stores/perm.store'
import { isContactValid } from '@/tools/contactValidation.utils'
import { CircleCheck, TriangleAlert, Users } from '@lucide/vue'
import {
  Button,
  Card,
  Message,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Toast,
  useToast,
} from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

type ReviewContact = {
  rowId: number
  data: Record<string, string>
  valid: boolean
}

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const { getPerms } = usePermStore()

getPerms([
  ':area/contact/creates',
  ':area/contact/edits',
  ':area/contact/getContactFields',
  ':area/contact/getDuplicate',
])

const fields = ref<{ name: string; type: string }[]>([])
const contacts = ref<ReviewContact[]>([])
const activeTab = ref<'error' | 'valid'>('error')

const errorContacts = computed(() => contacts.value.filter((contact) => !contact.valid))
const validContacts = computed(() => contacts.value.filter((contact) => contact.valid))

const totalNb = computed(() => contacts.value.length)
const errorNb = computed(() => errorContacts.value.length)
const validNb = computed(() => validContacts.value.length)

onMounted(() => {
  fields.value = DataStorage.getType()
  contacts.value = DataStorage.getValue().map((data, index) => ({
    rowId: index,
    data: { ...data },
    valid: isContactValid(fields.value, data),
  }))

  if (errorNb.value === 0) activeTab.value = 'valid'
})

function onFieldUpdate(contact: ReviewContact, name: string, value: string) {
  const wasValid = contact.valid
  contact.data[name] = value
  contact.valid = isContactValid(fields.value, contact.data)

  if (wasValid !== contact.valid) {
    toast.add({
      severity: contact.valid ? 'success' : 'error',
      summary: contact.valid ? t('create-contacts.moved-valid') : t('create-contacts.moved-error'),
      life: 3000,
    })
  }
}

function goToMerge() {
  DataStorage.setArray(
    contacts.value.map((contact) => contact.data),
    DataStorage.getType(),
  )

  router.push({ name: '/user/contact/creates/merge' })
}
</script>
