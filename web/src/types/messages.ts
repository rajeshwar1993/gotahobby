// types/messages.ts
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  eventTitle?: string;
  online?: boolean;
}
