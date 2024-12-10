import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Document } from '../types';

const DEMO_DOCUMENT: Document = {
  id: '1',
  title: 'Project Proposal',
  content: 'This is a collaborative document that can be edited in real-time...',
  lastEdited: new Date(),
  editors: ['Alice', 'Carlos'],
};

export function DocumentEditor() {
  const [document, setDocument] = useState(DEMO_DOCUMENT);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={document.title}
            onChange={(e) =>
              setDocument({ ...document, title: e.target.value })
            }
            className="text-xl font-semibold bg-transparent dark:text-white"
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
        <div className="flex space-x-2 mt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Editing with: {document.editors.join(', ')}
          </span>
        </div>
      </div>

      <div className="flex-1 p-4">
        <textarea
          value={document.content}
          onChange={(e) =>
            setDocument({ ...document, content: e.target.value })
          }
          className="w-full h-full p-4 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
        />
      </div>
    </div>
  );
}