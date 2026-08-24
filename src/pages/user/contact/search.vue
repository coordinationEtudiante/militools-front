<template>
  <div class="h-full w-full">
    <Message v-if="isAdmin" severity="success" class="m-2">{{ t('serach-admin') }}</Message>
    <CreditStakedBar v-else />
    <Message severity="warn" class="m-2">
      {{ t('search-log-warn', { credit: areaStore.getArea().searchCredit }) }}
    </Message>
    <MCard
      v-if="contacts === undefined"
      :title="t('seach-in-nb-field', { nb: statsStore.isReady ? '...' : statsStore.getnbValue })"
      class="m-2 flex flex-col justify-center gap-2"
    >
      <form class="flex flex-col justify-center gap-2">
        <Accordion value="primary-field">
          <AccordionPanel value="primary-field" :disabled="areaStore.primaryFields.length == 0">
            <AccordionHeader>{{ t('primary-field') }}</AccordionHeader>
            <AccordionContent>
              <div class="flex flex-wrap gap-1">
                <FieldInput
                  v-for="field in areaStore.primaryFields"
                  :field="field"
                  :key="field.id"
                  :validation="false"
                  @update:model-value="(value) => fieldValue.set(field.name, value)"
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="indexed-field" :disabled="areaStore.indexedFields.length == 0">
            <AccordionHeader>{{ t('indexed-field') }}</AccordionHeader>
            <AccordionContent>
              <div class="flex flex-wrap gap-1">
                <FieldInput
                  v-for="field in areaStore.indexedFields"
                  :field="field"
                  :key="field.id"
                  :validation="false"
                  @update:model-value="(value) => fieldValue.set(field.name, value)"
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
          <AccordionPanel value="other-field" :disabled="areaStore.otherFields.length == 0">
            <AccordionHeader>{{ t('other-field') }}</AccordionHeader>
            <AccordionContent>
              <div class="flex flex-wrap gap-1">
                <FieldInput
                  v-for="field in areaStore.otherFields"
                  :field="field"
                  :key="field.id"
                  :validation="false"
                  @update:model-value="(value) => fieldValue.set(field.name, value)"
                />
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
        <Message v-if="tooSmallValue" severity="info">{{ t('search-min-3-lenght') }}</Message>
        <Message v-if="errorCode == 404" severity="error">{{ t('search-error-404') }}</Message>
        <Message v-else-if="errorCode != 200" severity="error">
          {{ t('search-error', { code: errorCode }) }}
        </Message>
        <Button :disabled="nbField == 0" @click="search">{{
          t('search-on-nb-fields', { nb: nbField })
        }}</Button>
      </form>
    </MCard>
    <MCard
      v-else
      :title="t('search-result', { nb: contacts.length })"
      class="m-2 flex flex-col justify-center gap-2"
    >
      <Accordion class="Accordion">
        <AccordionPanel v-for="contact in contacts" :value="contact.id" :key="contact.id">
          <AccordionHeader>
            <Dicebear :size="32" :seed="String(contact.id)" />
            {{ getPresentationField(contact) }}</AccordionHeader
          >
          <AccordionContent>
            <div
              class="flex justify-between gap-1"
              v-for="field in contact.fields"
              :key="field.name"
            >
              <span class="text-gray-950">
                {{ field.name }}
              </span>
              <span>
                {{ field.value }}
              </span>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <Button @click="newSearch">{{ t('new-search') }}</Button>
    </MCard>
  </div>
</template>

<script setup lang="ts">
import CreditStakedBar from '@/components/CreditStakedBar.vue'
import Dicebear from '@/components/Dicebear.vue'
import FieldInput from '@/components/form/fieldInput.vue'
import MCard from '@/components/MCard.vue'
import { fetchError } from '@/errors/fetch.error'
import { useAreaStore } from '@/stores/area.store'
import { usePermStore } from '@/stores/perm.store'
import { useSearchCreditStore } from '@/stores/searchCredit.store'
import { useStatsStore } from '@/stores/stats.store'
import { fetchResource } from '@/tools/fetch.utils'
import type { GetContactsResponse } from '@/types/cloud-functions/contacts/getContacts'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
  Message,
} from 'primevue'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const areaStore = useAreaStore()
const statsStore = useStatsStore()
const permStore = usePermStore()
const searchCreditStore = useSearchCreditStore()

const isAdmin = permStore.getPerm(':area/contact/getContacts') === 'admin'

const contacts = ref<GetContactsResponse['value']>()
const errorCode = ref<number>(200)
const fields = ref<GetContactsResponse['fields']>()

const fieldValue = reactive(new Map<string, string>())

const tooSmallValue = computed(() => {
  let notValid = false
  fieldValue.forEach((v) => {
    if (v.trim() != '' && v.trim().length < 3) notValid = true
  })
  return notValid
})

const nbField = computed(() => {
  let nbNotNull = 0
  fieldValue.forEach((v) => {
    if (v.trim() != '' && v.trim().length > 2) nbNotNull++
  })
  return nbNotNull
})

function getPresentationField(contact: GetContactsResponse['value'][number]) {
  //prensentation field is the fisrt field of area.indexedFields on the response ?? fisrt field of area.primaryFields on the response ?? first field of the response
  let prensentation: string | undefined
  for (const globalField of areaStore.indexedFields) {
    if (prensentation) continue
    const field = contact.fields.find((f) => f.name === globalField.name)
    if (field) {
      prensentation = field.value
    }
  }
  if (!prensentation) {
    for (const globalField of areaStore.primaryFields) {
      if (prensentation) continue
      const field = contact.fields.find((f) => f.name === globalField.name)
      if (field) {
        prensentation = field.value
      }
    }
  }

  if (!prensentation) {
    prensentation = contact.fields[0]?.value ?? ''
  }
  return prensentation
}

async function search() {
  const validFilters = Array.from(fieldValue)
    .map(([name, value]) => [name.trim(), value.trim()] as const)
    .filter(([, value]) => value.length >= 3)

  try {
    const res = await fetchResource(':area/contact/getContacts', {
      query: { filters: validFilters.map((vf) => vf.join(':')).join(',') },
    })

    fields.value = res.fields.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name && t.name === value.name),
    )

    contacts.value = res.value

    searchCreditStore.consumeNewCredit()
  } catch (error: unknown) {
    errorCode.value = error instanceof fetchError ? error.status : 400
  }
}

function newSearch() {
  contacts.value = undefined
  fields.value = undefined
  errorCode.value = 200
}
</script>
