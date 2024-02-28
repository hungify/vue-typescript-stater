import type { FETCH_STATUS } from '#/constants'

export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS]
