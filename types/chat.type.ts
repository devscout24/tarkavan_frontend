export type TMessage = {
  id: number
  text: string
  media: string | File
}

export type TChatItem = {
  chat_id: number
  conversation_id: string
  latest_time: string
  message: string
  user_name: string
  receiver_id: number
  user_image: string
  my_image: string
  chat_image: string
  image_id: string
  unread_count: number
}

export type TChatMessage = {
  id: string
  message?: string
  time: string
  is_me: boolean
  file?: string
}
