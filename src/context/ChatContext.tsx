import { createContext, useContext, useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { Props, ChatReducerState, ChatReducerAction } from '../interface/main'

export const ChatContext = createContext({})

export const ChatContextProvider = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext)
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  }

  const chatReducer = (state: ChatReducerState, action: ChatReducerAction) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>
}
