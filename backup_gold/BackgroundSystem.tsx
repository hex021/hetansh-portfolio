import React, { useEffect, useRef } from 'react';

interface Keyframe {
  scroll: number;
  gridAlign: number;      // 0 = random floating, 1 = snapped to grid
  pcbMode: number;        // 0 = straight lines, 1 = right-angle/45-deg traces
  speed: number;          // particle speed factor
  nodeOpacity: number;    // node opacity
  lineOpacity: number;    // line opacity
  waveIntensity: number;  // oscilloscope wave size
  pulseSpawnRate: number; // packet frequency
}

const keyframes: Keyframe[] = [
  { scroll: 0.0, gridAlign: 0.0, pcbMode: 0.0, speed: 0.20, nodeOpacity: 0.85, lineOpacity: 0.45, waveIntensity: 0.0, pulseSpawnRate: 0.035 }, // Hero (Visibility boosted, speed slowed for premium feel)
  { scroll: 1.2, gridAlign: 1.0, pcbMode: 0.0, speed: 0.04, nodeOpacity: 0.40, lineOpacity: 0.18, waveIntensity: 0.0, pulseSpawnRate: 0.010 }, // About (Structured communication grid)
  { scroll: 2.2, gridAlign: 0.8, pcbMode: 0.8, speed: 0.08, nodeOpacity: 0.45, lineOpacity: 0.20, waveIntensity: 0.0, pulseSpawnRate: 0.018 }, // Philosophy
  { scroll: 3.5, gridAlign: 0.9, pcbMode: 1.0, speed: 0.10, nodeOpacity: 0.50, lineOpacity: 0.22, waveIntensity: 0.0, pulseSpawnRate: 0.022 }, // Expertise (PCB-inspired routing)
  { scroll: 5.0, gridAlign: 0.3, pcbMode: 0.6, speed: 0.25, nodeOpacity: 0.75, lineOpacity: 0.35, waveIntensity: 0.08, pulseSpawnRate: 0.045 }, // Projects (Dynamic networking)
  { scroll: 6.5, gridAlign: 0.6, pcbMode: 0.5, speed: 0.18, nodeOpacity: 0.60, lineOpacity: 0.25, waveIntensity: 0.12, pulseSpawnRate: 0.030 }, // Dashboard & TechNetwork
  { scroll: 7.8, gridAlign: 1.0, pcbMode: 0.2, speed: 0.04, nodeOpacity: 0.35, lineOpacity: 0.15, waveIntensity: 0.05, pulseSpawnRate: 0.010 }, // Timeline & Beyond
  { scroll: 9.2, gridAlign: 0.5, pcbMode: 0.3, speed: 0.08, nodeOpacity: 0.50, lineOpacity: 0.22, waveIntensity: 1.00, pulseSpawnRate: 0.025 }, // Contact (Oscilloscope sweep)
];

const lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end;
};

const getInterpolatedParams = (scroll: number): Keyframe => {
  if (scroll <= keyframes[0].scroll) return keyframes[0];
  if (scroll >= keyframes[keyframes.length - 1].scroll) return keyframes[keyframes.length - 1];

  let i = 0;
  while (i < keyframes.length - 1 && scroll > keyframes[i + 1].scroll) {
    i++;
  }

  const k1 = keyframes[i];
  const k2 = keyframes[i + 1];
  const t = (scroll - k1.scroll) / (k2.scroll - k1.scroll);

  return {
    scroll,
    gridAlign: lerp(k1.gridAlign, k2.gridAlign, t),
    pcbMode: lerp(k1.pcbMode, k2.pcbMode, t),
    speed: lerp(k1.speed, k2.speed, t),
    nodeOpacity: lerp(k1.nodeOpacity, k2.nodeOpacity, t),
    lineOpacity: lerp(k1.lineOpacity, k2.lineOpacity, t),
    waveIntensity: lerp(k1.waveIntensity, k2.waveIntensity, t),
    pulseSpawnRate: lerp(k1.pulseSpawnRate, k2.pulseSpawnRate, t),
  };
};

interface Node {
  x: number;
  y: number;
  fx: number;
  fy: number;
  vx: number;
  vy: number;
  gx: number;
  gy: number;
  rx: number; // Idle mouse target offset x
  ry: number; // Idle mouse target offset y
  idle: number; // Individual node idle attraction factor
  svx: number; // Spring velocity x
  svy: number; // Spring velocity y
}

interface Pulse {
  startIndex: number;
  endIndex: number;
  progress: number;
  speed: number;
}

export const ECEGlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const G = 80;
    const connectionDist = 140;

    const mouse = { x: -1000, y: -1000, active: false };
    let lastMouseMoveTime = Date.now();
    let idleProgress = 0;
    let idleFactor = 0;
    let lastFrameTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      lastMouseMoveTime = Date.now();
    };

    const onMouseLeave = () => {
      mouse.active = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
        lastMouseMoveTime = Date.now();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    let scrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let dampedScrollProgress = window.scrollY / window.innerHeight;
    
    const onScroll = () => {
      scrollY = window.scrollY;
      const scrollDiff = scrollY - lastScrollY;
      lastScrollY = scrollY;
      
      // Gentle, atmospheric vertical impulse on nodes during scroll (disturbs but doesn't control)
      if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].svy += scrollDiff * 0.00008;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let nodes: Node[] = [];
    const initializeNodes = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const gridPoints: { x: number; y: number }[] = [];
      for (let x = G; x < width - G / 2; x += G) {
        for (let y = G; y < height - G / 2; y += G) {
          gridPoints.push({ x, y });
        }
      }

      for (let i = gridPoints.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gridPoints[i], gridPoints[j]] = [gridPoints[j], gridPoints[i]];
      }

      const numNodes = Math.min(75, Math.floor((width * height) / 20000));
      nodes = [];

      for (let i = 0; i < numNodes; i++) {
        const fx = Math.random() * width;
        const fy = Math.random() * height;
        const gridTarget = gridPoints[i % gridPoints.length] || {
          x: Math.round((Math.random() * (width - 2 * G) + G) / G) * G,
          y: Math.round((Math.random() * (height - 2 * G) + G) / G) * G,
        };

        const theta = Math.random() * Math.PI * 2;
        const r = Math.random() * 32 + 6; // Cluster radius offsets

        nodes.push({
          x: fx,
          y: fy,
          fx,
          fy,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          gx: gridTarget.x,
          gy: gridTarget.y,
          rx: Math.cos(theta) * r,
          ry: Math.sin(theta) * r,
          idle: 0,
          svx: 0,
          svy: 0,
        });
      }
    };

    initializeNodes();
    window.addEventListener('resize', initializeNodes);

    const pulses: Pulse[] = [];

    const drawConnection = (
      c: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      pcbMode: number
    ) => {
      c.beginPath();
      c.moveTo(x1, y1);

      if (pcbMode <= 0.05) {
        c.lineTo(x2, y2);
      } else {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        let mx = x2;
        let my = y1;

        if (absDx > absDy) {
          mx = x1 + Math.sign(dx) * (absDx - absDy);
          my = y1;
          const px = lerp(x2, mx, pcbMode);
          const py = lerp(y2, my, pcbMode);
          c.lineTo(px, py);
          c.lineTo(x2, y2);
        } else {
          mx = x1;
          my = y1 + Math.sign(dy) * (absDy - absDx);
          const px = lerp(x2, mx, pcbMode);
          const py = lerp(y2, my, pcbMode);
          c.lineTo(px, py);
          c.lineTo(x2, y2);
        }
      }
      c.stroke();
    };

    const getPulseCoords = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      progress: number,
      pcbMode: number
    ): { x: number; y: number } => {
      if (pcbMode <= 0.05) {
        return {
          x: x1 + (x2 - x1) * progress,
          y: y1 + (y2 - y1) * progress,
        };
      } else {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        let mx = x2;
        let my = y1;

        if (absDx > absDy) {
          mx = x1 + Math.sign(dx) * (absDx - absDy);
          my = y1;
        } else {
          mx = x1;
          my = y1 + Math.sign(dy) * (absDy - absDx);
        }

        const len1 = Math.hypot(mx - x1, my - y1);
        const len2 = Math.hypot(x2 - mx, y2 - my);
        const totalLen = len1 + len2;

        if (totalLen === 0) return { x: x1, y: y1 };

        const ratio1 = len1 / totalLen;

        const straightX = x1 + (x2 - x1) * progress;
        const straightY = y1 + (y2 - y1) * progress;

        let pcbX = x1;
        let pcbY = y1;

        if (progress < ratio1) {
          const segProgress = progress / ratio1;
          pcbX = x1 + (mx - x1) * segProgress;
          pcbY = y1 + (my - y1) * segProgress;
        } else {
          const segProgress = (progress - ratio1) / (1 - ratio1);
          pcbX = mx + (x2 - mx) * segProgress;
          pcbY = my + (y2 - my) * segProgress;
        }

        return {
          x: lerp(straightX, pcbX, pcbMode),
          y: lerp(straightY, pcbY, pcbMode),
        };
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Frame-rate independent delta time calculation
      const now = performance.now();
      const deltaTime = Math.min(0.1, (now - lastFrameTime) / 1000);
      lastFrameTime = now;

      // 90% scroll responsiveness reduction: transition very slowly between keyframe states
      const targetScrollProgress = scrollY / window.innerHeight;
      dampedScrollProgress = lerp(dampedScrollProgress, targetScrollProgress, 0.003);
      const params = getInterpolatedParams(dampedScrollProgress);

      // Track Idle state: begin extremely subtle attraction immediately when cursor stops
      const timeSinceMove = Date.now() - lastMouseMoveTime;
      const isStationary = mouse.active && timeSinceMove > 100;
      
      const convergenceDuration = 5.0; // 4-6 seconds convergence target
      const dispersalDuration = 0.75;  // 0.5-1 second rapid dispersal target
      
      if (isStationary) {
        idleProgress = Math.min(1.0, idleProgress + deltaTime / convergenceDuration);
      } else {
        idleProgress = Math.max(0.0, idleProgress - deltaTime / dispersalDuration);
      }
      
      idleFactor = Math.pow(idleProgress, 3.0); // cubic ease-in (starts imperceptibly, strengthens over time)

      if (Math.random() < params.pulseSpawnRate && pulses.length < 15) {
        if (nodes.length > 2) {
          const startIdx = Math.floor(Math.random() * nodes.length);
          const start = nodes[startIdx];
          
          const neighbors = nodes
            .map((node, idx) => ({ idx, dist: Math.hypot(node.x - start.x, node.y - start.y) }))
            .filter(n => n.idx !== startIdx && n.dist < connectionDist);

          if (neighbors.length > 0) {
            const destIdx = neighbors[Math.floor(Math.random() * neighbors.length)].idx;
            pulses.push({
              startIndex: startIdx,
              endIndex: destIdx,
              progress: 0,
              speed: 0.015 + Math.random() * 0.015,
            });
          }
        }
      }

      if (params.waveIntensity > 0.01) {
        const midY = height / 2;

        ctx.strokeStyle = `rgba(197, 168, 128, ${0.04 * params.waveIntensity})`;
        ctx.lineWidth = 0.5;
        for (let x = 0; x < width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(197, 168, 128, ${0.08 * params.waveIntensity})`;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(width, midY);
        ctx.stroke();

        ctx.strokeStyle = `rgba(197, 168, 128, ${0.28 * params.waveIntensity})`;
        ctx.shadowColor = '#C5A880';
        ctx.shadowBlur = 8 * params.waveIntensity;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        const time = Date.now() * 0.0025;
        for (let x = 0; x < width; x += 6) {
          const angle = (x / width) * Math.PI * 4 + time;
          const y =
            midY +
            Math.sin(angle) * 70 * params.waveIntensity * Math.sin(time * 0.15) +
            Math.cos(angle * 2.2) * 15 * params.waveIntensity;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw connection lines
      ctx.lineWidth = 1.0;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          // Only draw connection if nodes are within range and not fully merged (dist > 1.5px)
          if (dist < connectionDist && dist > 1.5) {
            const alphaFactor = (1 - dist / connectionDist);
            ctx.strokeStyle = `rgba(197, 168, 128, ${params.lineOpacity * alphaFactor})`;
            drawConnection(ctx, n1.x, n1.y, n2.x, n2.y, params.pcbMode);
          }
        }
      }

      // Physics model presets: low stiffness/high damping for slow convergence; high stiffness/low damping for snap back
      const isDispersing = idleProgress < 0.99 && (!isStationary || !mouse.active);
      const stiffness = isDispersing ? 0.08 : 0.004;
      const damping = isDispersing ? 0.82 : 0.92;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Base drifting movement
        node.fx += node.vx * params.speed;
        node.fy += node.vy * params.speed;

        const padding = 10;
        if (node.fx < padding) {
          node.fx = padding;
          node.vx *= -1;
        } else if (node.fx > width - padding) {
          node.fx = width - padding;
          node.vx *= -1;
        }
        if (node.fy < padding) {
          node.fy = padding;
          node.vy *= -1;
        } else if (node.fy > height - padding) {
          node.fy = height - padding;
          node.vy *= -1;
        }

        const baseX = lerp(node.fx, node.gx, params.gridAlign);
        const baseY = lerp(node.fy, node.gy, params.gridAlign);

        // Distance from node base position to cursor
        const distToMouse = Math.hypot(baseX - mouse.x, baseY - mouse.y);
        
        // Attraction radius: nodes within 400px participate
        let participation = 0;
        if (mouse.active && distToMouse < 400) {
          participation = Math.max(0, 1 - distToMouse / 400);
        }

        // Distance-based progressive cascade
        let targetNodeIdle = 0;
        if (participation > 0) {
          const delay = (1 - participation) * 0.6;
          if (idleFactor > delay) {
            targetNodeIdle = (idleFactor - delay) / (1.0 - delay);
          }
        }
        
        node.idle = lerp(node.idle, targetNodeIdle, isDispersing ? 0.15 : 0.05);

        // All participating nodes merge into exactly ONE central node (offsets & wiggle collapse to 0)
        const currentRx = node.rx * (1 - node.idle);
        const currentRy = node.ry * (1 - node.idle);
        const currentWiggleX = Math.sin(Date.now() * 0.0012 + i) * 1.5 * (1 - node.idle);
        const currentWiggleY = Math.cos(Date.now() * 0.0012 + i) * 1.5 * (1 - node.idle);

        const finalTargetX = lerp(baseX, mouse.x + currentRx + currentWiggleX, node.idle);
        const finalTargetY = lerp(baseY, mouse.y + currentRy + currentWiggleY, node.idle);

        // Spring-damping updates (mass-inertia simulation)
        const ax = (finalTargetX - node.x) * stiffness;
        const ay = (finalTargetY - node.y) * stiffness;
        node.svx = (node.svx + ax) * damping;
        node.svy = (node.svy + ay) * damping;

        // Mouse magnetic cursor tracking (applies to velocity for smooth, lag-free inertia drift)
        if (mouse.active && node.idle < 0.1) {
          const actualDist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (actualDist < 220) {
            const forceStrength = ((220 - actualDist) / 220) * (1 - params.gridAlign * 0.75) * 0.12;
            const angle = Math.atan2(mouse.y - node.y, mouse.x - node.x);
            node.svx += Math.cos(angle) * forceStrength;
            node.svy += Math.sin(angle) * forceStrength;
          }
        }

        // Apply spring velocity to coordinates
        node.x += node.svx;
        node.y += node.svy;

        ctx.fillStyle = `rgba(197, 168, 128, ${params.nodeOpacity})`;
        ctx.beginPath();
        if (params.gridAlign > 0.6 && node.idle < 0.2) {
          ctx.rect(node.x - 3, node.y - 3, 6, 6);
        } else {
          ctx.arc(node.x, node.y, 2.4, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1.0) {
          pulses.splice(i, 1);
        } else {
          const nStart = nodes[p.startIndex];
          const nEnd = nodes[p.endIndex];

          if (nStart && nEnd) {
            const pCoords = getPulseCoords(nStart.x, nStart.y, nEnd.x, nEnd.y, p.progress, params.pcbMode);

            ctx.fillStyle = '#C5A880';
            ctx.shadowColor = '#C5A880';
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(pCoords.x, pCoords.y, 2.0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            pulses.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', initializeNodes);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-80"
    />
  );
};

// Placeholder empty components to prevent breaking other section files
export const ECEInteractiveCanvas: React.FC = () => null;
export const SemiconductorGrid: React.FC = () => null;
export const PCBTraceBackground: React.FC = () => null;
export const OscilloscopeBackground: React.FC = () => null;
export const MinimalGridBackground: React.FC = () => null;
