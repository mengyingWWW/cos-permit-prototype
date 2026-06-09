import { useState } from 'react';
import type { Screen } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import ReviewScreen from './components/ReviewScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const showShell = currentScreen === 'dashboard';

  if (showShell) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopBar />
          <Dashboard onNavigate={setCurrentScreen} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {currentScreen === 'form' && (
          <ApplicationForm onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'review' && (
          <ReviewScreen onNavigate={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}
