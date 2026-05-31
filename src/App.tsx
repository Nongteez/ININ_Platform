import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Studio from '@/pages/Studio';
import StudioEditor from '@/pages/StudioEditor';
import Contact from '@/pages/Contact';
import PuppyLove from '@/pages/PuppyLove';
import PuppyLovePlay from '@/pages/PuppyLovePlay';
import NovelPage from '@/pages/NovelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel" element={<NovelPage />} />
        <Route path="/studio-intro" element={<Studio />} />
        <Route path="/studio" element={<StudioEditor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/game/puppy-love" element={<PuppyLove />} />
        <Route path="/game/puppy-love/play" element={<PuppyLovePlay />} />
      </Routes>
    </Router>
  );
}

export default App;
