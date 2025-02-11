// types/messages.ts
export type Message = {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  eventTitle?: string;
  online?: boolean;
};
