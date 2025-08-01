import React from 'react';
import Layout from '../components/Layout';

function ClientPanel() {
  return (
    <Layout>
      <div className="min-h-screen bg-transparent p-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Client Panel</h1>
        <p className="text-white">Welcome to the client panel. Access insights, portfolios, and exclusive services.</p>
      </div>
    </Layout>
  );
}

export default ClientPanel;
