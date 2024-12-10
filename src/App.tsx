import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Chat } from './components/Chat';
import { DocumentEditor } from './components/DocumentEditor';
import { Auth } from './components/Auth';
import { useAuthStore } from './store/authStore';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'document'>('chat');
  const { isAuthenticated, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar onTabChange={setActiveTab} activeTab={activeTab} />
      <main className="flex-1">
        <div className="h-full">
          {activeTab === 'chat' ? <Chat /> : <DocumentEditor />}
        </div>
      </main>
    </div>
  );
}

export default App;