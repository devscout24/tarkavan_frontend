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
  id: string;
  sender_id: number;
  receiver_id: number;
  conversation_id: string;
  is_read: number;
  message: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  image_url: string | null;
  image_id: number | null;
  chatimage: string | null; 
  file?: string
  sender_image: string
  receiver_image: string
}
