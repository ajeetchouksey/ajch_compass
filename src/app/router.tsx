import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('@/features/home/pages/Home'));
const TrackDetail = lazy(() => import('@/features/tracks/pages/TrackDetail'));
const TrackArticle = lazy(() => import('@/features/tracks/pages/TrackArticle'));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* /tracks is an alias of Home — the original Discovery page had one
          entry point (hero + full track list), not a separate list view. */}
      <Route path="/tracks" element={<Home />} />
      <Route path="/tracks/:trackId" element={<TrackDetail />} />
      <Route path="/tracks/:trackId/:slug" element={<TrackArticle />} />
    </Routes>
  );
}
