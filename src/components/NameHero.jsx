import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const NameHero = () => {
  const wrapperRef = useRef(null);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mouse = useRef({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    diff: 0,
  });

  const head = useRef({
    x: 0,
    y: 0,
  });

  const particles = useRef([]);

  class Particle {
    constructor(x, y, size, wrapper) {
      this.r = 20;
      this.size = Math.sqrt(size) * 4 * (0.5 + Math.random() * 0.5) * (viewport.width / 1920);
      this.x = x;
      this.y = y;
      this.vy = 0;
      this.seed = Math.random() * 1000;
      this.freq = (0.5 + Math.random() * 1) * 0.01;
      this.amplitude = (1 - Math.random() * 2) * 0.5;

      // #6366f1 对应的 HSL 基础值是 hsl(239, 84%, 67%)
      const hue = Math.floor(Math.random() * 11) + 239;
      const saturation = Math.floor(Math.random() * 21) + 84;
      const lightness = Math.floor(Math.random() * 11) + 67;
      this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      

      this.el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.el.setAttribute("cx", this.x);
      this.el.setAttribute("cy", this.y);
      this.el.setAttribute("r", this.r);
      this.el.setAttribute("fill", this.color);

      this.wrapper = wrapper;
      this.init();
    }

    init() {
      const tl = gsap.timeline({
        onUpdate: () => {
          this.x += Math.cos((gsap.ticker.frame + this.seed) * this.freq) * this.amplitude;
          this.y += Math.sin((gsap.ticker.frame + this.seed) * this.freq) * this.amplitude + this.vy;
          this.vy += 0.2;
          this.el.setAttribute("cy", this.y);
          this.el.setAttribute("cx", this.x);
          this.el.setAttribute("r", this.r);
        },
      });

      tl.to(this, {
        r: this.size,
        duration: 0.25,
        ease: "power1.inOut",
      });

      tl.to(this, {
        duration: 1,
        r: 0,
        ease: "power3.in",
      });

      tl.call(this.kill.bind(this));
    }

    kill() {
      particles.current = particles.current.filter(particle => particle !== this);
      this.el.remove();
    }
  }

  const emitParticle = () => {
    if (!wrapperRef.current) return;

    let x = 0;
    let y = 0;
    let size = 0;

    if (mouse.current.diff > 0.01) {
      x = mouse.current.smoothX;
      y = mouse.current.smoothY;
      size = mouse.current.diff;
    } else {
      x = head.current.x;
      y = head.current.y;
      size = Math.random() * 100;
    }

    const particle = new Particle(x, y, size, wrapperRef.current);
    particles.current.push(particle);
    wrapperRef.current.prepend(particle.el);
  };

  const render = (time) => {
    // Smooth mouse
    mouse.current.smoothX += (mouse.current.x - mouse.current.smoothX) * 0.1;
    mouse.current.smoothY += (mouse.current.y - mouse.current.smoothY) * 0.1;

    mouse.current.diff = Math.hypot(
      mouse.current.x - mouse.current.smoothX,
      mouse.current.y - mouse.current.smoothY
    );

    emitParticle();

    // Move head
    head.current.x = viewport.width * 0.5 + viewport.width * 0.375 * Math.cos(time * 0.0006);
    head.current.y = viewport.height * 0.5 + viewport.width * 0.05 * Math.cos(time * 0.0011);

    requestAnimationFrame(render);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.pageX;
      mouse.current.y = e.pageY;
    };

    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="w-screen h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="js-svg w-full h-full"
      >
        <mask id="text">
          <text
            x="50%"
            y="40%"
            fill="#fff"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="10vw"
            className="font-bowlby-one leading-[0.9]"
          >
            Skyscraper
          </text>
          <text
            x="50%"
            y="60%"
            fill="#fff"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="10vw"
            className="font-bowlby-one leading-[0.9]"
          >
            No.1
          </text>
          <text
            x="50%"
            y="98%"
            fill="#fff"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="16px"
            className="font-bowlby-one leading-[0.9] font-normal"
          >
            Scroll Down & See My Works
          </text>
        </mask>

        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -10"
            result="goo"
          />
        </filter>
        <rect x="0" y="0" width="100%" height="100%" mask="url(#text)" fill="white" />
        <g filter="url(#gooey)" mask="url(#text)" ref={wrapperRef}></g>
      </svg>
    </section>
  );
};