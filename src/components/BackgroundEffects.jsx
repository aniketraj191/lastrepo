import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects({ activeSection = 'all' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse coordinates to attract/repel particles
    const mouse = { x: null, y: null, radius: 100 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle classes
    class Petal {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; // initial distribution
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.opacity = Math.random() * 0.4 + 0.3;
        // Gradients of pinks/reds
        const colors = [
          'rgba(244, 63, 94, ', // rose-500
          'rgba(236, 72, 153, ', // pink-500
          'rgba(251, 113, 133, ', // rose-400
          'rgba(225, 29, 72, '   // rose-600
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 30) * 0.3;
        this.rotation += this.rotationSpeed;

        // Mouse interaction (repel slightly)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 3;
          }
        }

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        // Drawing a beautiful leaf/petal curve
        ctx.moveTo(0, -this.size / 2);
        ctx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 2, this.size / 2, 0);
        ctx.bezierCurveTo(this.size / 4, this.size / 2, -this.size / 4, this.size / 2, -this.size / 2, 0);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size / 2, -this.size, 0, -this.size / 2);
        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    class Heart {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 10 + 6;
        this.speedY = Math.random() * 0.8 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.oscillationSpeed = Math.random() * 0.02 + 0.01;
        this.oscillationRange = Math.random() * 0.5 + 0.2;
        this.oscillationStep = Math.random() * 100;
        this.opacity = Math.random() * 0.35 + 0.15;
        const colors = [
          'rgba(220, 38, 38, ',  // red-600
          'rgba(236, 72, 153, ', // pink-500
          'rgba(219, 39, 119, ', // pink-600
          'rgba(190, 24, 74, '   // rose-800
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.oscillationStep += this.oscillationSpeed;
        this.x += this.speedX + Math.sin(this.oscillationStep) * this.oscillationRange;

        // Mouse interaction (repel)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * 2;
          }
        }

        if (this.y < -20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        const x = this.x;
        const y = this.y;
        const size = this.size;

        // Path for drawing a heart shape
        ctx.moveTo(x, y + size / 4);
        ctx.quadraticCurveTo(x, y, x - size / 2, y);
        ctx.quadraticCurveTo(x - size, y, x - size, y + size / 2);
        ctx.quadraticCurveTo(x - size, y + size, x, y + size * 1.3);
        ctx.quadraticCurveTo(x + size, y + size, x + size, y + size / 2);
        ctx.quadraticCurveTo(x + size, y, x + size / 2, y);
        ctx.quadraticCurveTo(x, y, x, y + size / 4);

        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        // Soft glowing filter on heart
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(236, 72, 153, 0.4)';
        ctx.fill();
        ctx.restore();
      }
    }

    class Sparkle {
      constructor() {
        this.reset();
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 2;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.015 + 0.005;
        this.state = 'fadein'; // 'fadein', 'fadeout'
      }

      update() {
        if (this.state === 'fadein') {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= this.maxOpacity) {
            this.state = 'fadeout';
          }
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        const x = this.x;
        const y = this.y;
        const size = this.size;
        
        // 4-point sparkle star
        ctx.moveTo(x, y - size);
        ctx.quadraticCurveTo(x, y, x + size, y);
        ctx.quadraticCurveTo(x, y, x, y + size);
        ctx.quadraticCurveTo(x, y, x - size, y);
        ctx.quadraticCurveTo(x, y, x, y - size);

        ctx.fillStyle = `rgba(255, 244, 214, ${this.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(253, 224, 71, 0.5)';
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize arrays
    const petals = [];
    const hearts = [];
    const sparkles = [];

    // Density based on screensize
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 20 : 35;
    const heartCount = isMobile ? 15 : 25;
    const sparkleCount = isMobile ? 30 : 60;

    for (let i = 0; i < petalCount; i++) petals.push(new Petal());
    for (let i = 0; i < heartCount; i++) hearts.push(new Heart());
    for (let i = 0; i < sparkleCount; i++) sparkles.push(new Sparkle());

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Sparks (Background layer)
      sparkles.forEach((s) => {
        s.update();
        s.draw();
      });

      // 2. Draw Hearts (Middle layer)
      hearts.forEach((h) => {
        h.update();
        h.draw();
      });

      // 3. Draw Petals (Top foreground layer)
      petals.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
