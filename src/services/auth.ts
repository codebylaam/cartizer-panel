import { ApiService } from './api'
import type { UserProfile } from '@/context/auth'
import type { LoginFormData } from '@/pages/login/login.zod'
import type { SignupFormData } from '@/pages/signup/signup.zod'

class AuthServiceClass {
  signup(payload: SignupFormData) {
    return ApiService.post({
      url: '/auth/signup',
      payload,
    })
  }

  login(payload: LoginFormData) {
    return ApiService.post({
      url: '/auth/seller/login',
      payload: {
        identifier: payload.identifier,
        password: payload.password,
      },
    })
  }

  getMe() {
    return ApiService.get<UserProfile>({
      url: '/auth/me',
    })
  }

  logout() {
    return ApiService.post<null>({
      url: '/auth/logout',
    })
  }
}

export const AuthService = new AuthServiceClass()
