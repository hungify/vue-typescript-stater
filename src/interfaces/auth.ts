import type { z } from 'zod';
import type { authSchemaRequest } from '~/schemas/auth';

export type LoginRequest = z.infer<typeof authSchemaRequest.login>;
export type RegisterRequest = z.infer<typeof authSchemaRequest.register>;
export type RefreshRequest = z.infer<typeof authSchemaRequest.refresh>;
export type LogoutRequest = z.infer<typeof authSchemaRequest.logout>;
