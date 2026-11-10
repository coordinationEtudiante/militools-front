<script setup lang="ts">
import { register } from '@/cloud-functions/auth/register'
import InputPassword from '@/components/form/InputPassword.vue'
import InputPhone from '@/components/form/inputPhone.vue'
import ServerSelection from '@/components/form/ServerSelection.vue'
import { router } from '@/router'
import { clearPhone } from '@/tools/phone.utils'
import { CircleUserRound, AtSign } from '@lucide/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

/* ---------- constants ---------- */
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

const phoneError = computed(() => {
  if (submitted.value && phone.value.trim() === '') return true
  if (submitted.value && !/^\+33[67]\d{8}$/.test(clearPhone(phone.value))) return true
  return false
})

const emailError = computed(() => {
  const emailPattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\\x21-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
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
    phoneError.value ||
    password.value.trim() === ''
  ) {
    return
  }

  errored.value = false
  creating.value = true

  try {
    const result = register(
      {
        phone: clearPhone(phone.value),
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
    class="relative m-auto flex max-h-fit max-w-fit flex-col gap-2 overflow-scroll rounded-3xl border border-default bg-default p-6 sm:p-10"
  >
    <!-- title -->
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-highlighted sm:text-5xl lg:text-balance"
    >
      {{ t('login.create-account.title') }}
    </h1>
    <p class="mt-6 text-lg/8 text-default">{{ t('login.create-account.subtitle') }}</p>
    <!-- form -->
    <form @submit.prevent="createAccount" autocomplete="on" class="flex flex-col gap-2">
      <!-- first name -->
    <UFormField 
      label="Prénom" 
      :error="submitted && firstName.trim() === '' ? 'Requis' : undefined"
    >
      <UInput 
        type="text" 
        id="firstName"
        name="firstName"
        autocomplete="given-name" 
        v-model="firstName" 
        :disabled="creating" 
        :invalid="submitted && firstName.trim() === ''" 
        fluid
      >
        <template #leading>
          <CircleUserRound :size="16" />
        </template>
      </UInput>
    </UFormField>

    <!-- email -->
    <UFormField 
      label="Email" 
      :error="emailError ? t('error.invalid-email') : undefined"
    >
      <UInput 
        type="email" 
        id="register-email"
        name="register-email"
        autocomplete="email" 
        v-model="email" 
        :disabled="creating" 
        :invalid="emailError" 
        fluid
      >
        <template #leading>
          <AtSign :size="16" />
        </template>
      </UInput>
    </UFormField>
    <InputPhone
      v-model:phone="phone"
      :disabled="creating"
      :invalid="phoneError"
    />
    <InputPassword
      v-model:password="password"
      :disabled="creating"
      :invalid="submitted && password.trim() === ''"
    />

    <ServerSelection v-model="selection" :disabled="creating" />

    <div class="gap-spacer" />
    <div class="gap-spacer" />

    <UAlert v-if="errored !== false && errored == 409" color="error">
      {{ t('error.duplicate-user') }}
    </UAlert>
    <UAlert v-else-if="errored !== false" color="error">
      {{ t('error.server-error', { code: errored }) }}
    </UAlert>
    <UButton
      type="submit"
      :label="t('button.create-account')"
      :loading="creating"
    />
    </form>
    <UButton variant="outlined" :link="false" :disabled="creating">
      <RouterLink to="/auth/login" class="w-full">
        {{ t('button.allready-an-account') }}
      </RouterLink>
    </UButton>
  </div>
</template>
