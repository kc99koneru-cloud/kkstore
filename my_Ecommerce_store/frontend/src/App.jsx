import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import PageLoader from './components/common/PageLoader.jsx';
import ToastContainer from './components/ui/ToastContainer.jsx';

function App() {
  return (
    <>
      {/* Suspense supports lazy-loaded route bundles for better initial performance. */}
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
