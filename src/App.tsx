import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Artwork from './modules/Artwork';
import './scss/App.scss';

const App: React.FC = () => {
  const [navOpen, setNavOpen] = useState(true);

  useEffect (() => {
    const artwork = new Artwork({
      $wrapper: document.querySelector('.wrapper') as HTMLElement,
      $canvas: document.querySelector('.canvas') as HTMLCanvasElement
    });

    return () => {
      artwork.dispose();
    }
  }, [])
  return (
    <Router>
      <div className="wrapper">
        <canvas className="canvas" />
      </div>
    </Router>
  );
}

export default App;