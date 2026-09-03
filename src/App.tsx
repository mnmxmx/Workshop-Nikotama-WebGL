import { useEffect, useRef } from 'react';
import Artwork from './modules/Artwork';
import './scss/App.scss';

const App: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !canvasRef.current) return;

    const artwork = new Artwork({
      wrapper: wrapperRef.current,
      canvas: canvasRef.current,
    });

    return () => artwork.dispose();
  }, []);

  return (
    <div ref={wrapperRef} className="wrapper">
      <canvas ref={canvasRef} className="canvas" />
    </div>
  );
}

export default App;