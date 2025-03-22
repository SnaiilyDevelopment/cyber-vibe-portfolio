
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

const VibeCoding: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [visualizer, setVisualizer] = useState<any>(null);

  // Initialize audio visualizer when section comes into view
  useEffect(() => {
    if (isInView && canvasRef.current && audioRef.current && !visualizer) {
      const createVisualizer = () => {
        const audio = audioRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        // Create audio context and analyzer
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        
        // Connect audio element to analyzer
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        // Set up buffer for frequency data
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Set canvas dimensions
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Create the visualization
        const draw = () => {
          requestAnimationFrame(draw);
          
          analyser.getByteFrequencyData(dataArray);
          
          // Clear canvas
          ctx.fillStyle = 'rgba(15, 14, 23, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;
          
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 1.5;
            
            // Create gradient color based on frequency
            const h = i * 360 / bufferLength;
            const s = '100%';
            const l = '50%';
            ctx.fillStyle = `hsl(${h}, ${s}, ${l})`;
            
            // Draw bar
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
          }
        };
        
        draw();
        
        return {
          audioContext,
          analyser,
          source
        };
      };
      
      const viz = createVisualizer();
      setVisualizer(viz);
      
      return () => {
        if (viz && viz.audioContext) {
          viz.source.disconnect();
          viz.analyser.disconnect();
          viz.audioContext.close();
        }
      };
    }
  }, [isInView, visualizer]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Audio playback error:', error);
          // Most browsers require user interaction before audio can play
          toast.error('Click play again after the page loads to start audio');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <section 
      id="vibe-coding" 
      ref={sectionRef}
      className="section-padding relative bg-cyber-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyber-pink/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
            Interactive Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Audiovisual Experiments</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Where code becomes art — interactive audiovisual experiments that merge programming with creativity.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism rounded-lg overflow-hidden cyberpunk-border"
          >
            <div className="relative aspect-video">
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full" 
              />
              <audio
                ref={audioRef}
                src="/assets/ambient.mp3"
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-black/50 text-white hover:text-cyber-neon transition-colors"
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 text-white hover:text-cyber-neon transition-colors"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold text-white">Audio Reactive Visualization</h3>
            <p className="text-white/70">
              This audiovisual experiment uses the Web Audio API to analyze frequency data from the audio stream and creates dynamic visualizations that respond to the music in real-time.
            </p>
            <p className="text-white/70">
              The amplitude and frequency of each sound determine the height and color of the bars, creating a direct correlation between what you hear and what you see.
            </p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-purple/20 hover:bg-cyber-purple/30 text-white hover:text-cyber-neon transition-all"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? "Pause Visualization" : "Play Visualization"}</span>
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Interactive Programming</h3>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Exploring the intersection of code, art, and sound to create immersive experiences that engage multiple senses simultaneously.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Algorithmic Patterns",
              description: "Generating complex visual patterns using mathematical algorithms and code."
            },
            {
              title: "Real-time Audio Processing",
              description: "Manipulating sound waves and audio data to create interactive musical experiences."
            },
            {
              title: "Generative Design",
              description: "Using code to create art that evolves and changes based on predefined rules."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-morphism p-6 rounded-lg cyberpunk-border"
            >
              <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
              <p className="text-white/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VibeCoding;
