import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { AccountSetup } from './pages/AccountSetup';
import { ForcespaceSetup } from './pages/ForcespaceSetup';
import { Apps } from './pages/Apps';
import { Responses } from './pages/Responses';
import { ResponseTemplates } from './pages/ResponseTemplates';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { KnowledgeBaseArticle } from './pages/KnowledgeBaseArticle';
import { Settings } from './pages/Settings';
import { Team } from './pages/Team';
import { AccessControl } from './pages/AccessControl';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/account-setup" replace />} />
        <Route path="/account-setup" element={<AccountSetup />} />
        <Route path="/forcespace" element={<ForcespaceSetup />} />
        <Route
          path="/dashboard"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Dashboard />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/apps"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Apps />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/responses"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Responses />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/responses/templates"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <ResponseTemplates />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/knowledge-base"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <KnowledgeBase />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/knowledge-base/article/:articleId"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <KnowledgeBaseArticle />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/settings"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Settings />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/team"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <Team />
                </main>
              </div>
            </div>
          }
        />
        <Route
          path="/access-control"
          element={
            <div className="flex min-h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1">
                  <AccessControl />
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;