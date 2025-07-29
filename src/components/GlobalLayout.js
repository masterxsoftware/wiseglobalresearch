import React from 'react';
import Topbar from '../pages/Topbar';  // reuse your Topbar
// ...import any common Footer component or define inline...

const GlobalLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-900">
    <Topbar />
    <main className="flex-1 container mx-auto py-6 px-4">
      {children}
    </main>
    <footer className="bg-gray-800 text-gray-400 text-sm text-center py-4">
      © {new Date().getFullYear()} Wise Global Research Pvt. Ltd.
    </footer>
  </div>
);

export default GlobalLayout;
