import  { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DepthCardCarousel = () => {
  const containerRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const numCards = 8; // 卡片数量

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 设置初始透视
      gsap.set(cardsWrapperRef.current, { perspective: 1000 });

      // 创建卡片环绕动画
      const animation = gsap.to(cardsRef.current, {
        rotationY: (i) => i * (360 / numCards),
        x: (i) => Math.sin((i * Math.PI * 2) / numCards) * 300, // X轴位置
        z: (i) => Math.cos((i * Math.PI * 2) / numCards) * 300, // Z轴位置
        stagger: 0.1,
        ease: 'power2.inOut',
        paused: true
      });

      // 滚动触发配置
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        markers: true,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // 控制整体旋转
          gsap.to(cardsWrapperRef.current, {
            rotationY: progress * 360,
            ease: 'none'
          });
          // 控制卡片动画进度
          animation.progress(progress);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className='h-screen'
      ref={containerRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={cardsWrapperRef}
        style={{
          position: 'relative',
          width: '300px',
          height: '400px'
        }}
      >
        {[...Array(numCards)].map((_, i) => (
          <div
            key={i}
            ref={(el) => el && (cardsRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: '300px',
              height: '400px',
              background: `hsl(${(i * 360) / numCards}deg, 70%, 50%)`,
              borderRadius: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '2em',
              color: 'white',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepthCardCarousel;