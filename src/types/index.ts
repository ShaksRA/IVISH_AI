export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  translated?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  language: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  lastEdited: Date;
  editors: string[];
}