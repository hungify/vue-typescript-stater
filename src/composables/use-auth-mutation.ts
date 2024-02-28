import { useCookies } from '@vueuse/integrations/useCookies'
import type { AuthOutput } from '#/types/auth'
import type { FetchStatus } from '#/types/fetching'
import { FETCH_STATUS } from '#/constants'
import { client } from '#/api/client'

type FormError = Record<
  keyof Partial<AuthOutput['loginRequest']>,
  string
> | null

export const useAuthMutation = () => {
  const fetchStatus = ref<FetchStatus>(FETCH_STATUS.Idle)
  const formError = ref<FormError>(null)
  const router = useRouter()
  const route = useRoute()
  const cookies = useCookies(['accessToken'])

  const onLogin = async ({ email, password }: AuthOutput['loginRequest']) => {
    fetchStatus.value = FETCH_STATUS.Loading

    const { error, data } = await client.POST('/auth/login', {
      body: {
        email,
        password,
      },
    })

    if (error) {
      fetchStatus.value = FETCH_STATUS.Error
      formError.value = {
        email: 'Email or password is incorrect.',
        password: 'Email or password is incorrect.',
      }
    } else {
      fetchStatus.value = FETCH_STATUS.Success

      const { accessToken } = data

      cookies.set('accessToken', accessToken)

      await nextTick(() => {
        router.replace(route.query.to ? String(route.query.to) : '/')
      })
    }

    fetchStatus.value = FETCH_STATUS.Idle
  }

  const onLogout = async () => {
    cookies.remove('accessToken')
    await router.push('/login')
  }

  const isPending = computed(() => {
    return fetchStatus.value === FETCH_STATUS.Loading
  })

  const isError = computed(() => {
    return fetchStatus.value === FETCH_STATUS.Error
  })

  const isSuccess = computed(() => {
    return fetchStatus.value === FETCH_STATUS.Success
  })

  const isAuthenticated = computed(
    () => cookies.get('accessToken') !== undefined,
  )

  return {
    isAuthenticated,
    isPending,
    isError,
    isSuccess,
    error: formError.value,

    onLogin,
    onLogout,
  }
}
