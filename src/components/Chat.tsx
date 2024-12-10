import React, { useState } from 'react';
import { Send } from 'lucide-react';
import type { Message, User } from '../types';

const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello team! How is everyone doing today?',
    sender: 'Alice',
    timestamp: new Date(),
  },
  {
    id: '2',
    content: '¡Hola! Todo bien, gracias.',
    sender: 'Carlos',
    timestamp: new Date(),
    translated: true,
  },
];

const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Alice',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'online',
    language: 'en',
  },
  {
    id: '2',
    name: 'Carlos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'online',
    language: 'es',
  },
];

export function Chat() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-white">Team Chat</h2>
        <div className="flex space-x-2 mt-2">
          {DEMO_USERS.map((user) => (
            <div key={user.id} className="flex items-center space-x-1">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm dark:text-gray-300">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {DEMO_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'Alice' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender === 'Alice'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
              }`}
            >
              <p className="text-sm font-semibold">{msg.sender}</p>
              <p>{msg.content}</p>
              {msg.translated && (
                <p className="text-xs mt-1 opacity-75">Translated from Spanish</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}