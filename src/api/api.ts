import { ProfileType } from './../types/types'
import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    'API-KEY': '72c36d3b-7f53-42fd-846b-d7ab7dcf97a8',
  },
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data
      })
  },
  getProfile(userId: number) {
    console.warn('Obsolete.method. Please profileAPI object.')
    return profileAPI.getProfile(userId)
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`)
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  },
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId).then((response) => {
      return response.data
    })
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId).then((response) => {
      return response.data
    })
  },
  updateStatus(status: string) {
    return instance
      .put(`profile/status`, {
        status: status,
      })
      .then((response) => {
        return response.data
      })
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance
      .put(
        `profile/photo`,
        formData
        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }
      )
      .then((response) => {
        return response.data
      })
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile).then((response) => {
      return response.data
    })
  },
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodeForCaptcha
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((response) => {
      return response.data
    })
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => {
        return response.data
      })
  },
  logout() {
    return instance.delete(`auth/login`).then((response) => {
      return response.data
    })
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`).then((response) => {
      return response.data
    })
  },
}
