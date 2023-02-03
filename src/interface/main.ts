import { ReactNode } from 'react'

export interface Props {
  children?: ReactNode
}
export interface MessageType {
  date: {
    seconds: number
    nanoseconds: number
  }
  senderId: string
  id: string
  text: string
  img?: string
}

export interface UserType {
  displayName: string
  uid: string
  photoURL: string
}

export interface Chat {
  lastMessage?: {
    text: string
  }
  date: {
    seconds: number
    nanoseconds: number
  }
  userInfo: UserType
}
export interface Chats {
  [key: string]: Chat
}

export interface ChatReducerState {
  user: UserType
  chatId: string
}

export interface ChatReducerAction {
  type: string
  payload: UserType
}
