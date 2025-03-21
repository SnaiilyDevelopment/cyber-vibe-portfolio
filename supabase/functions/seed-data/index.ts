
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Sample skills data
    const skills = [
      { name: 'JavaScript', category: 'Programming', proficiency: 90, icon: 'Code' },
      { name: 'React', category: 'Frontend', proficiency: 85, icon: 'Atom' },
      { name: 'Node.js', category: 'Backend', proficiency: 80, icon: 'Server' },
      { name: 'Three.js', category: '3D', proficiency: 75, icon: 'Cube' },
      { name: 'TypeScript', category: 'Programming', proficiency: 85, icon: 'FileCode' },
      { name: 'WebGL', category: '3D', proficiency: 70, icon: 'PenTool' },
      { name: 'GSAP', category: 'Animation', proficiency: 80, icon: 'Zap' },
      { name: 'Supabase', category: 'Backend', proficiency: 75, icon: 'Database' },
    ];
    
    // Sample projects data
    const projects = [
      {
        title: 'Audio Visualizer',
        description: 'Real-time audio visualization using WebGL and the Web Audio API, creating dynamic visuals that react to music.',
        image_url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop',
        live_demo_url: 'https://example.com/project1',
        github_url: 'https://github.com/example/project1',
        featured: true,
      },
      {
        title: 'Neural Network Visualization',
        description: 'Interactive 3D visualization of neural networks that helps explain machine learning concepts in an intuitive way.',
        image_url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=500&auto=format&fit=crop',
        live_demo_url: 'https://example.com/project2',
        github_url: 'https://github.com/example/project2',
        featured: true,
      },
      {
        title: 'Interactive Data Dashboard',
        description: 'Real-time data visualization dashboard with customizable charts and filters for business intelligence.',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop',
        live_demo_url: 'https://example.com/project3',
        github_url: 'https://github.com/example/project3',
        featured: false,
      },
      {
        title: 'Algorithmic Art Generator',
        description: 'Procedurally generated art using custom algorithms and randomization to create unique visual patterns.',
        image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop',
        live_demo_url: 'https://example.com/project4',
        featured: false,
      },
    ];
    
    // Sample code snippets
    const codeSnippets = [
      {
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
      },
    ];
    
    // Associate technologies with projects
    const projectTechnologies = [
      { project_id: null, technology: 'WebGL' },
      { project_id: null, technology: 'JavaScript' },
      { project_id: null, technology: 'Web Audio API' },
      { project_id: null, technology: 'Three.js' },
      { project_id: null, technology: 'React' },
      { project_id: null, technology: 'ML' },
      { project_id: null, technology: 'React' },
      { project_id: null, technology: 'D3.js' },
      { project_id: null, technology: 'Node.js' },
      { project_id: null, technology: 'Canvas API' },
      { project_id: null, technology: 'JavaScript' },
      { project_id: null, technology: 'Algorithms' },
    ];
    
    // Clear existing data (optional)
    await supabaseClient.from('project_technologies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('code_snippets').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Insert skills
    await supabaseClient.from('skills').insert(skills);
    
    // Insert projects and get their IDs
    const { data: projectsData } = await supabaseClient.from('projects').insert(projects).select();
    
    // Associate technologies with project IDs
    if (projectsData) {
      let techIndex = 0;
      for (let i = 0; i < projectsData.length; i++) {
        // Assign first 3 technologies to first project, next 3 to second project, etc.
        for (let j = 0; j < 3; j++) {
          if (techIndex < projectTechnologies.length) {
            projectTechnologies[techIndex].project_id = projectsData[i].id;
            techIndex++;
          }
        }
      }
      
      // Insert project technologies
      await supabaseClient.from('project_technologies').insert(projectTechnologies);
    }
    
    // Insert code snippets
    await supabaseClient.from('code_snippets').insert(codeSnippets);
    
    return new Response(
      JSON.stringify({ success: true, message: 'Data seeded successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error seeding data:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
