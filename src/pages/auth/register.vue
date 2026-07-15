<script setup lang="ts">
import { register } from '@/cloud-functions/auth/register'
import InputPassword from '@/components/form/InputPassword.vue'
import InputPhone from '@/components/form/inputPhone.vue'
import ServerSelection from '@/components/form/ServerSelection.vue'
import { router } from '@/router'
import { CircleUserRound, AtSign } from '@lucide/vue'
import { Button, FloatLabel, IconField, InputIcon, InputText, Message } from 'primevue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const firstName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const selection = ref('')

const submitted = ref(false)
const creating = ref(false)
const errored = ref<false | number>(false)
const created = ref(false)

const emailError = computed(() => {
  const emailPattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if (submitted.value && email.value.trim() === '') {
    return true
  }
  if (submitted.value && !emailPattern.test(email.value)) {
    return true
  }
  return false
})

async function createAccount() {
  submitted.value = true
  created.value = false

  if (
    firstName.value.trim() === '' ||
    email.value.trim() === '' ||
    phone.value.trim() === '' ||
    password.value.trim() === '' ||
    phone.value.trim().length !== 14
  ) {
    return
  }

  errored.value = false
  creating.value = true

  try {
    const result = register(
      {
        phone: phone.value,
        password: password.value,
        name: firstName.value,
        email: email.value,
      },
      false,
    )

    await result.doFetch()
    errored.value = result.errorCode.value ?? false
    created.value = errored.value === false
  } finally {
    creating.value = false
  }

  if (created.value) {
    router.replace('/auth/login')
  }
}
</script>

<template>
  <div
    class="relative p-6 sm:p-10 border border-gray-300 rounded-3xl flex flex-col gap-2 overflow-scroll bg-white m-auto"
  >
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
    >
      {{ t('login.create-account.title') }}
    </h1>
    <p class="mt-6 text-lg/8 text-gray-700">{{ t('login.create-account.subtitle') }}</p>

    <FloatLabel variant="on">
      <IconField>
        <InputIcon>
          <CircleUserRound :size="15" />
        </InputIcon>
        <InputText
          id="firstName"
          v-model="firstName"
          :invalid="submitted && firstName.trim() === ''"
          :disabled="creating"
          fluid
        />
      </IconField>
      <label for="firstName">{{ t('input.firstName') }}</label>
    </FloatLabel>

    <FloatLabel variant="on">
      <IconField>
        <InputIcon>
          <AtSign :size="15" />
        </InputIcon>
        <InputText id="email" v-model="email" :invalid="emailError" :disabled="creating" fluid />
      </IconField>
      <label for="email">{{ t('input.email') }}</label>
    </FloatLabel>

    <InputPhone
      v-model:phone="phone"
      :disabled="creating"
      :invalid="submitted && (phone.trim() === '' || phone.trim().length != 14)"
    />
    <InputPassword
      v-model:password="password"
      :disabled="creating"
      :invalid="submitted && password.trim() === ''"
    />

    <ServerSelection v-model="selection" :disabled="creating" />

    <div class="gap-spacer" />
    <div class="gap-spacer" />

    <Message v-if="errored !== false && errored == 409" severity="error">
      {{ t('error.duplicate-user') }}
    </Message>
    <Message v-else-if="errored !== false" severity="error">
      {{ t('error.server-error', { code: errored }) }}
    </Message>
    <Button
      type="button"
      :label="t('button.create-account')"
      :loading="creating"
      @click="createAccount"
    />
    <Button variant="outlined" :link="false" :disabled="creating">
      <RouterLink to="/auth/login" class="w-full">
        {{ t('button.allready-an-account') }}
      </RouterLink>
    </Button>
  </div>
</template>
