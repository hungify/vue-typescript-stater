import { useCookies } from '@vueuse/integrations/useCookies'
import type { AuthOutput } from '#/types/auth'
import type { AppError } from '#/types/error'
import type { FetchStatus } from '#/types/fetching'
import { FETCH_STATUS } from '#/enums/fetching'
import { client } from '#/api/client'

type FormError = Record<
  keyof Partial<AuthOutput['loginRequest']>,
  string
> | null

export const useAuthMutation = () => {
  const fetchStatus = ref<FetchStatus>(FETCH_STATUS.IDLE)
  const formError = ref<FormError>(null)
  const router = useRouter()
  const route = useRoute()
  const cookies = useCookies(['accessToken'])

  const handleErrorResponse = (err: AppError) => {
    console.log('### :: file: useAuthMutation.ts:20 :: err:', err)
    formError.value = {
      email: 'Email or password is incorrect.',
      password: 'Email or password is incorrect.',
    }
  }

  const onLogin = async ({ email, password }: AuthOutput['loginRequest']) => {
    fetchStatus.value = FETCH_STATUS.LOADING

    const { error, data } = await client.POST('/auth/login', {
      body: {
        email,
        password,
      },
    })

    if (error) {
      fetchStatus.value = FETCH_STATUS.ERROR
      handleErrorResponse(error)
    } else {
      fetchStatus.value = FETCH_STATUS.SUCCESS

      const { accessToken } = data

      cookies.set('accessToken', accessToken)

      await nextTick(() => {
        router.replace(route.query.to ? String(route.query.to) : '/')
      })
    }

    fetchStatus.value = FETCH_STATUS.IDLE
  }

  const onLogout = async () => {
    cookies.remove('accessToken')
    await router.push('/login')
  }

  const isPending = computed(() => {
    return fetchStatus.value === FETCH_STATUS.LOADING
  })

  const isError = computed(() => {
    return fetchStatus.value === FETCH_STATUS.ERROR
  })

  const isSuccess = computed(() => {
    return fetchStatus.value === FETCH_STATUS.SUCCESS
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
