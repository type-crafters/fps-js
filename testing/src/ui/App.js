import { SoundManager } from "@/scripts/sound/index";
import { useState, useEffect, useRef } from "react";

// export default function App() {

//     const sound = useRef(new SoundManager()); // Se crea solo una vez
//     sound.loadSoundConfig();
//     const [volume, setVol] = useState(1.0);

//     const increaseVolume = () => {
//         setVol(prevVolume => {
//             const newVolume = Math.min(prevVolume + 0.1, 4.0); // Limita a 1.0
//             sound.current.setVolume('song', newVolume);
//             //return newVolume;
//         });
//     };

//     // useEffect(() => {
//     // // Cargar la configuración de sonidos al montar el componente
//     //     sound.loadSoundConfig();
//     // }, []);
    
//     // const Play = () => {
//     //     sound.play('menu_scroll');
//     // };

//     return(
//         <div style={{
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "#262626",
//             color: "white",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             fontSize: "3rem",
//             fontWeight: "500"
//         }}>
//             <button onClick={() => sound.play('song')}>
//                 Play
//             </button>
//             <button onClick={() => sound.pause('song')}>
//                 Pause
//             </button>
//             <button onClick={() => sound.stop('song')}>
//                 Stop
//             </button>
//             <button onClick={() => sound.mute('song')}>
//                 Mute
//             </button>
//             <button onClick={increaseVolume}>
//                 Volume
//             </button>
//             <button onClick={() => sound.rate('song', 2.0)}>
//                 Rate
//             </button>
//         </div>
//     );
// }

export default function App() {
    const [volume, setVolume] = useState(0.1);
    const [isMuted, setIsMuted] = useState(false);
    const [rate, setRate] = useState(0.5);
    const soundRef = useRef(null);
  
    useEffect(() => {
      // Initialize sound manager only once when component mounts
      soundRef.current = new SoundManager();
      soundRef.current.loadSoundConfig();
  
      // Cleanup on unmount
      return () => {
        if (soundRef.current) {
          soundRef.current.stop('song');
        }
      };
    }, []);
  
    const handlePlay = () => {
      soundRef.current?.play('song');
    };
  
    const handlePause = () => {
      soundRef.current?.pause('song');
    };
  
    const handleStop = () => {
      soundRef.current?.stop('song');
    };
  
    const handleMute = () => {
      if (soundRef.current) {
        soundRef.current.mute('song', !isMuted);
        setIsMuted(!isMuted);
      }
    };
  
    const handleVolumeIncrease = () => {
      setVolume(prevVolume => {
        const newVolume = Math.min(prevVolume + 0.1, 1.0);
        soundRef.current?.setVolume('song', newVolume);
        return newVolume;
      });
    };

    const handleRateChange = () => {
        setRate(prevRate => {
          const newRate = Math.min(prevRate * 2.0, 4.0);
          alert(newRate)
          soundRef.current?.rate('song', newRate);
          return newRate;
        });
      };
  
    return (
      <div className="w-screen h-screen bg-neutral-800 text-white flex justify-center items-center">
        <div className="flex gap-4">
          <button 
            onClick={handlePlay}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Play
          </button>
          <button 
            onClick={handlePause}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Pause
          </button>
          <button 
            onClick={handleStop}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Stop
          </button>
          <button 
            onClick={handleMute}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button 
            onClick={handleVolumeIncrease}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Volume + ({volume.toFixed(1)})
          </button>
          {/* <button 
            onClick={handleRateChange}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            2x Speed
          </button> */}
        </div>
      </div>
    );
  };
    
export default function App() {
    return (
        <>
        
        </>
    );
}

