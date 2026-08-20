import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { AppRoutes } from '@/app/router';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={null}>
          <AppRoutes />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
