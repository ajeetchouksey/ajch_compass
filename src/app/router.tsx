import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('@/features/home/pages/Home'));
const TracksHome = lazy(() => import('@/features/tracks/pages/TracksHome'));
const TrackDetail = lazy(() => import('@/features/tracks/pages/TrackDetail'));
const TrackArticle = lazy(() => import('@/features/tracks/pages/TrackArticle'));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tracks" element={<TracksHome />} />
      <Route path="/tracks/:trackId" element={<TrackDetail />} />
      <Route path="/tracks/:trackId/:slug" element={<TrackArticle />} />
    </Routes>
  );
}
