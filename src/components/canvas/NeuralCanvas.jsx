import React, { useEffect, useRef } from 'react';

export default function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Handle high DPI
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking with inertia
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Generate nodes & neural clusters
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 42 : 88;
    const nodes = [];

    const colors = [
      'rgba(0, 242, 254, ',   // Cyan
      'rgba(99, 102, 241, ',  // Indigo
      'rgba(139, 92, 246, ',  // Violet
      'rgba(56, 189, 248, '   // Sky blue
    ];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = Math.random() * 2.2 + 1.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: baseRadius,
        baseRadius,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        isHub: Math.random() > 0.85
      });
    }

    // Data pulses traveling across connections
    const dataPackets = [];
    const maxPackets = isMobile ? 6 : 14;

    // Intersection observer to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Main animation loop
    let lastTime = performance.now();

    const render = (time) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Soft mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Movement
        node.x += node.vx;
        node.y += node.vy;

        // Bounce from walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Pulse size
        node.pulse += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.6;

        // Mouse interactive repulsion / attraction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          node.x -= (dx / dist) * force;
          node.y -= (dy / dist) * force;
        }

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = node.x - other.x;
          const ndy = node.y - other.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);
          const maxDist = node.isHub || other.isHub ? 140 : 100;

          if (nDist < maxDist) {
            const alpha = (1 - nDist / maxDist) * 0.28;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `${node.colorBase}${alpha})`;
            ctx.lineWidth = node.isHub || other.isHub ? 1.2 : 0.7;
            ctx.stroke();

            // Spawn data packet occasionally
            if (dataPackets.length < maxPackets && Math.random() < 0.003) {
              dataPackets.push({
                from: node,
                to: other,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                color: node.colorBase
              });
            }
          }
        }

        // Draw node body
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${node.colorBase}0.85)`;
        ctx.shadowBlur = node.isHub ? 12 : 6;
        ctx.shadowColor = `${node.colorBase}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Update and render data packets
      for (let p = dataPackets.length - 1; p >= 0; p--) {
        const pkt = dataPackets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          dataPackets.splice(p, 1);
          continue;
        }

        const px = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.progress;
        const py = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${pkt.color}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 pointer-events-auto"
        style={{ touchAction: 'none' }}
      />
      {/* Subtle bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/40 to-dark-950 pointer-events-none" />
      {/* Central subtle radial lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
