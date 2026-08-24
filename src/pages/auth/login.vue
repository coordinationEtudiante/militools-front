<script setup lang="ts">
import { Button, Message } from 'primevue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ServerSelection from '@/components/form/ServerSelection.vue'
import { useUserStore } from '@/stores/user.store'
import { router } from '@/router'
import InputPhone from '@/components/form/inputPhone.vue'
import InputPassword from '@/components/form/InputPassword.vue'
import { login } from '@/cloud-functions/auth/login'

const { t } = useI18n()
const userStore = useUserStore()

const phone = ref('')
const password = ref('')

const submitted = ref(false)
const connecting = ref(false)
const errored = ref<number>(200)

async function loginUser() {
  submitted.value = true

  if (
    phone.value.trim() === '' ||
    password.value.trim() === '' ||
    phone.value.trim().length !== 14
  ) {
    return
  }

  errored.value = 400
  connecting.value = true

  try {
    const result = login(
      {
        phone: phone.value,
        password: password.value,
      },
      false,
    )

    await result.doFetch()
    errored.value = result.errorCode.value ?? 200
    if (errored.value == 200 && result.data.value !== undefined) {
      const { token, ...user } = result.data.value
      userStore.login(user, token)
      router.push('/user/')
    }
  } finally {
    submitted.value = false
    connecting.value = false
  }

  if (errored.value !== 200) {
    console.error('error on login')
    router.replace('/auth/login')
  }
}
</script>

<template>
  <div
    class="relative m-auto flex max-h-fit max-w-fit flex-col gap-2 overflow-scroll rounded-3xl border border-gray-300 bg-white p-6 sm:p-10"
  >
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
    >
      {{ t('login.title') }}
    </h1>
    <p class="mt-6 text-lg/8 text-gray-700">{{ t('login.subtitle') }}</p>

    <InputPhone
      v-model:phone="phone"
      :disabled="connecting"
      :invalid="submitted && (phone.trim() === '' || phone.trim().length != 14)"
    />
    <InputPassword
      v-model:password="password"
      :disabled="connecting"
      :invalid="submitted && password.trim() === ''"
    />

    <ServerSelection :disabled="userStore.loading" />

    <div class="gap-spacer" />
    <div class="gap-spacer" />

    <Message v-if="userStore.errored" severity="error">
      {{ t('error.login.error') }}
    </Message>
    <Button type="submit" @click="loginUser" :disabled="userStore.loading">{{
      t('button.connect')
    }}</Button>
    <Button variant="outlined" :link="false" :disabled="userStore.loading">
      <RouterLink to="/auth/register" class="w-full">
        {{ t('button.create-accont') }}
      </RouterLink>
    </Button>
  </div>
</template>
