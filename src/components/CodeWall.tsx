
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useThree, useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Code, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import CodeBlock from './code/CodeBlock';
import FloatingText from './code/FloatingText';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
}

const CodeWall: React.FC = () => {
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const fetchCodeSnippets = async () => {
      try {
        const { data, error } = await supabase
          .from('code_snippets')
          .select('*');
        
        if (error) throw error;
        
        if (data) {
          setCodeSnippets(data);
        }
      } catch (error) {
        console.error('Error fetching code snippets:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCodeSnippets();
  }, []);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Fallback data if no snippets are fetched
  useEffect(() => {
    if (!loading && codeSnippets.length === 0) {
      setCodeSnippets([
        {
          id: '1',
          title: 'Particle System',
          description: 'A WebGL-based particle system that creates dynamic visual effects.',
          language: 'javascript',
          code: `class ParticleSystem {
  constructor(count = 1000) {
    this.particles = [];
    this.count = count;
    this.init();
  }
  
  init() {
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
        vx: Math.random() * 0.01 - 0.005,
        vy: Math.random() * 0.01 - 0.005,
        vz: Math.random() * 0.01 - 0.005,
      });
    }
  }
  
  update() {
    for (let i = 0; i < this.count; i++) {
      this.particles[i].x += this.particles[i].vx;
      this.particles[i].y += this.particles[i].vy;
      this.particles[i].z += this.particles[i].vz;
      
      // Reset particles that go out of bounds
      if (Math.abs(this.particles[i].x) > 1) this.particles[i].x *= -0.9;
      if (Math.abs(this.particles[i].y) > 1) this.particles[i].y *= -0.9;
      if (Math.abs(this.particles[i].z) > 1) this.particles[i].z *= -0.9;
    }
  }
  
  render(ctx) {
    // Rendering code here
  }
}`
        },
        {
          id: '2',
          title: 'Audio Reactive Visuals',
          description: 'Code that creates visuals that react to audio input in real-time.',
          language: 'javascript',
          code: `const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    
    // Start visualization
    visualize();
  })
  .catch(err => console.error('Error accessing audio:', err));

function visualize() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function draw() {
    requestAnimationFrame(draw);
    
    analyser.getByteFrequencyData(dataArray);
    
    // Use dataArray to drive visuals
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / 2;
      ctx.fillStyle = \`hsl(\${i * 360 / bufferLength}, 100%, 50%)\`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }
  
  draw();
}`
        }
      ]);
    }
  }, [loading, codeSnippets]);
  
  return (
    <section 
      id="code" 
      ref={sectionRef}
      className="section-padding relative bg-cyber-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyber-purple/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
            Code Samples
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Code Wall</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore snippets showcasing problem-solving skills and technical expertise.
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-cyber-neon/20 border-t-cyber-neon rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {codeSnippets.map((snippet) => (
              <CodeBlock 
                key={snippet.id} 
                snippet={snippet} 
                expanded={expandedId === snippet.id}
                toggleExpand={() => toggleExpand(snippet.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CodeWall;
