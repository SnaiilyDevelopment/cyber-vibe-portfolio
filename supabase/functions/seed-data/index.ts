
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.22.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        ...corsHeaders,
      },
      status: 204,
    });
  }

  try {
    // Create Supabase client for authenticated requests
    const supabase = createClient(
      // Supabase API URL
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase service role key
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Clear existing data
    console.log('Clearing existing data...');
    await supabase.from('project_technologies').delete().neq('id', '');
    await supabase.from('projects').delete().neq('id', '');
    await supabase.from('code_snippets').delete().neq('id', '');
    await supabase.from('skills').delete().neq('id', '');
    
    console.log('Seeding projects...');
    
    // Add projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .insert([
        {
          title: 'Neural Network Visualizer',
          description: 'An interactive 3D visualization of neural networks that helps explain machine learning concepts in an intuitive and engaging way. Users can adjust parameters and see how the network responds in real-time.',
          image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
          github_url: 'https://github.com/example/neural-viz',
          live_demo_url: 'https://example.com/neural-viz',
          featured: true
        },
        {
          title: 'Audio Reactive Installation',
          description: 'A WebGL-based audio visualization that reacts to music in real-time. This project uses the Web Audio API to analyze frequency data and creates stunning visual effects synchronized with the music.',
          image_url: 'https://images.unsplash.com/photo-1614149162883-504ce46d75a4?q=80&w=2070&auto=format&fit=crop',
          github_url: 'https://github.com/example/audio-viz',
          live_demo_url: 'https://example.com/audio-viz',
          featured: true
        },
        {
          title: 'Particle Physics Simulation',
          description: 'A real-time physics simulation using WebGL that models particle interactions with realistic forces. Users can manipulate gravity, friction, and other parameters to create unique particle behaviors.',
          image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
          github_url: 'https://github.com/example/particles',
          live_demo_url: 'https://example.com/particles',
          featured: false
        },
        {
          title: 'Interactive Data Dashboard',
          description: 'A responsive dashboard for visualizing complex datasets with interactive charts, filters, and real-time updates. Built with React and D3.js for seamless data manipulation and display.',
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
          github_url: 'https://github.com/example/dashboard',
          live_demo_url: 'https://example.com/dashboard',
          featured: true
        },
        {
          title: 'Generative Art Creator',
          description: 'An algorithmic art generator that creates unique visual compositions based on mathematical principles and randomization. Users can export high-resolution images of their creations.',
          image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
          github_url: 'https://github.com/example/gen-art',
          live_demo_url: 'https://example.com/gen-art',
          featured: false
        },
        {
          title: 'WebXR Experience',
          description: 'An immersive virtual reality experience built with WebXR that allows users to explore a procedurally generated environment with interactive elements and spatial audio.',
          image_url: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop',
          github_url: 'https://github.com/example/webxr',
          live_demo_url: 'https://example.com/webxr',
          featured: false
        }
      ])
      .select('id');
      
    if (projectsError) {
      throw projectsError;
    }
      
    console.log('Projects seeded:', projects.length);
    
    // Add technologies to projects
    if (projects) {
      const technologiesData = [];
      const projectTechnologies = {
        'Neural Network Visualizer': ['React', 'Three.js', 'TensorFlow.js', 'WebGL'],
        'Audio Reactive Installation': ['Web Audio API', 'WebGL', 'JavaScript', 'GLSL'],
        'Particle Physics Simulation': ['WebGL', 'JavaScript', 'Physics', 'Canvas API'],
        'Interactive Data Dashboard': ['React', 'D3.js', 'Node.js', 'GraphQL'],
        'Generative Art Creator': ['Canvas API', 'JavaScript', 'P5.js', 'Algorithms'],
        'WebXR Experience': ['WebXR', 'Three.js', 'Spatial Audio', 'JavaScript']
      };
      
      // Add project technologies
      for (const project of projects) {
        const projectTitle = (await supabase.from('projects').select('title').eq('id', project.id).single()).data?.title;
        
        if (projectTitle && projectTechnologies[projectTitle]) {
          for (const tech of projectTechnologies[projectTitle]) {
            technologiesData.push({
              project_id: project.id,
              technology: tech
            });
          }
        }
      }
      
      const { data: technologies, error: techError } = await supabase
        .from('project_technologies')
        .insert(technologiesData);
        
      if (techError) {
        throw techError;
      }
      
      console.log('Project technologies seeded');
    }
    
    console.log('Seeding code snippets...');
    
    // Add code snippets
    const { error: snippetsError } = await supabase
      .from('code_snippets')
      .insert([
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
        {
          title: 'Shader Animation',
          description: 'A GLSL fragment shader that creates mesmerizing animated patterns.',
          language: 'glsl',
          code: `precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0.416, 0.557);
  
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);
  
  for (float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 1.5) - 0.5;
    
    float d = length(uv) * exp(-length(uv0));
    
    vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
    
    d = sin(d * 8.0 + u_time) / 8.0;
    d = abs(d);
    d = pow(0.01 / d, 1.2);
    
    finalColor += col * d;
  }
  
  gl_FragColor = vec4(finalColor, 1.0);
}`
        },
        {
          title: 'Neural Network',
          description: 'A simple implementation of a neural network with backpropagation.',
          language: 'javascript',
          code: `class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    
    // Initialize weights with random values
    this.weightsIH = Matrix.random(this.hiddenNodes, this.inputNodes);
    this.weightsHO = Matrix.random(this.outputNodes, this.hiddenNodes);
    
    // Initialize biases
    this.biasH = Matrix.random(this.hiddenNodes, 1);
    this.biasO = Matrix.random(this.outputNodes, 1);
    
    // Set learning rate
    this.learningRate = 0.1;
  }
  
  // Activation function (sigmoid)
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  // Derivative of sigmoid for backpropagation
  dsigmoid(y) {
    return y * (1 - y);
  }
  
  // Feed forward algorithm
  predict(inputArray) {
    // Convert input to matrix
    let inputs = Matrix.fromArray(inputArray);
    
    // Generate hidden outputs
    let hidden = Matrix.multiply(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(this.sigmoid);
    
    // Generate output
    let output = Matrix.multiply(this.weightsHO, hidden);
    output.add(this.biasO);
    output.map(this.sigmoid);
    
    return output.toArray();
  }
  
  // Train the network with backpropagation
  train(inputArray, targetArray) {
    // Feed forward
    let inputs = Matrix.fromArray(inputArray);
    
    // Hidden layer
    let hidden = Matrix.multiply(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(this.sigmoid);
    
    // Output layer
    let outputs = Matrix.multiply(this.weightsHO, hidden);
    outputs.add(this.biasO);
    outputs.map(this.sigmoid);
    
    // Convert target to matrix
    let targets = Matrix.fromArray(targetArray);
    
    // Calculate output layer errors
    let outputErrors = Matrix.subtract(targets, outputs);
    
    // Calculate output gradient
    let gradients = Matrix.map(outputs, this.dsigmoid);
    gradients.multiply(outputErrors);
    gradients.multiply(this.learningRate);
    
    // Calculate hidden -> output deltas
    let hiddenT = Matrix.transpose(hidden);
    let weightHODeltas = Matrix.multiply(gradients, hiddenT);
    
    // Adjust weights and bias
    this.weightsHO.add(weightHODeltas);
    this.biasO.add(gradients);
    
    // Calculate hidden layer errors
    let whoT = Matrix.transpose(this.weightsHO);
    let hiddenErrors = Matrix.multiply(whoT, outputErrors);
    
    // Calculate hidden gradient
    let hiddenGradient = Matrix.map(hidden, this.dsigmoid);
    hiddenGradient.multiply(hiddenErrors);
    hiddenGradient.multiply(this.learningRate);
    
    // Calculate input -> hidden deltas
    let inputsT = Matrix.transpose(inputs);
    let weightIHDeltas = Matrix.multiply(hiddenGradient, inputsT);
    
    // Adjust weights and bias
    this.weightsIH.add(weightIHDeltas);
    this.biasH.add(hiddenGradient);
  }
}`
        }
      ]);
      
    if (snippetsError) {
      throw snippetsError;
    }
    
    console.log('Code snippets seeded');
    
    console.log('Seeding skills...');
    
    // Add skills
    const { error: skillsError } = await supabase
      .from('skills')
      .insert([
        { name: 'JavaScript', category: 'programming', proficiency: 90 },
        { name: 'TypeScript', category: 'programming', proficiency: 85 },
        { name: 'React', category: 'frontend', proficiency: 92 },
        { name: 'Node.js', category: 'backend', proficiency: 80 },
        { name: 'Three.js', category: '3d', proficiency: 78 },
        { name: 'WebGL', category: '3d', proficiency: 75 },
        { name: 'CSS/SCSS', category: 'frontend', proficiency: 88 },
        { name: 'GraphQL', category: 'backend', proficiency: 70 },
        { name: 'MongoDB', category: 'backend', proficiency: 82 },
        { name: 'GLSL Shaders', category: '3d', proficiency: 65 },
        { name: 'WebXR', category: '3d', proficiency: 60 },
        { name: 'GSAP', category: 'animation', proficiency: 85 },
        { name: 'Framer Motion', category: 'animation', proficiency: 80 },
        { name: 'UI/UX Design', category: 'frontend', proficiency: 75 },
        { name: 'TensorFlow.js', category: 'programming', proficiency: 68 }
      ]);
      
    if (skillsError) {
      throw skillsError;
    }
    
    console.log('Skills seeded');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Data seeded successfully!' }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        status: 200,
      },
    );
    
  } catch (error) {
    console.error('Error in seed-data function:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
        status: 400,
      },
    );
  }
});
