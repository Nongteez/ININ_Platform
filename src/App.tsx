import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Studio from '@/pages/Studio';
import StudioEditor from '@/pages/StudioEditor';
import Contact from '@/pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio-intro" element={<Studio />} />
        <Route path="/studio" element={<StudioEditor />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
