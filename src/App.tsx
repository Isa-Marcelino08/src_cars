import './App.css';
import { useState, useEffect} from 'react';
import GLBViewer from './components/GLBViewer';

function App() {

  const models =["mcqueen.glb", "sally.glb", "cruz.glb"]
  const colors =["#970700", "#8089d2", "#ffd238"]

  const [index, setIndex] = useState (0);
  
  useEffect(() => {
    const handleKeyDown =(e: KeyboardEvent) => {
      if(e.code === "Space") {
        setIndex((prev) => (prev+1)% models.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener ("keydown", handleKeyDown);

  }, [])

  return(
  <div className='app'>
    <GLBViewer 
    modelUrl= {models[index]}
    backgroundColor={colors[index]}
    height='864px'
    width='1536px'
    scale={0.9}
    position={[0, -1, 0]}
    autoRotate={true}
    enableControls={true}
    showEnviroment={true}
    />
  </div>
  );
}

export default App;

