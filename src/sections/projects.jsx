import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { works } from './works';


const SpinningText = ({ 
  radius = 65,
  textSize = "text-xs",
  rotation = 0  
}) => {
  const outerTextRef = useRef(null);
  const innerTextRef = useRef(null);
  const outerText = 'Experience * Career Path * ';
  const innerText = 'Selected Works * ';

  useEffect(() => {
    // 外圈文字
    const outerChars = outerText.split("");
    const outerDeg = 360 / outerChars.length;

    if (outerTextRef.current) {
      outerTextRef.current.innerHTML = '';
    }

    outerChars.forEach((char, i) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.transform = `rotate(${outerDeg * i}deg)`;
      span.className = `
        absolute 
        left-1/2 
        ${textSize}
        font-bold 
        uppercase 
        text-indigo-500
      `;
      span.style.transformOrigin = `0 ${radius}px`;
      outerTextRef.current?.appendChild(span);
    });

    // 内圈文字
    const innerChars = innerText.split("");
    const innerDeg = 360 / innerChars.length;

    if (innerTextRef.current) {
      innerTextRef.current.innerHTML = '';
    }

    innerChars.forEach((char, i) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.transform = `rotate(${innerDeg * i}deg)`;
      span.className = `
        absolute 
        left-1/2 
        text-[10px]
        font-bold 
        uppercase 
        text-indigo-500
      `;
      span.style.transformOrigin = `0 ${radius * 0.6}px`;
      innerTextRef.current?.appendChild(span);
    });
  }, [radius, textSize]);

  return (
    <div 
      className="relative z-10 pointer-events-none"
      style={{ 
        width: `${radius * 2}px`, 
        height: `${radius * 2}px` 
      }}
    >
      {/* 外圈文字 */}
      <div 
        className="absolute w-full h-full transform"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.5s'
        }}
      >
        <div 
          ref={outerTextRef}
          className="absolute w-full h-full text-center"
        />
      </div>

      {/* 内圈文字 - 放在外圈容器中心 */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          width: `${radius * 1.2}px`, 
          height: `${radius * 1.2}px`,
          transform: `translate(-50%, -50%) rotate(${-rotation * 2}deg)`,
          transition: 'transform 0.5s'
        }}
      >
        <div 
          ref={innerTextRef}
          className="absolute w-full h-full text-center"
        />
      </div>
    </div>
  );
}; 


export const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const cards = cardsRef.current;
    const totalCards = works.length;
    const angleDeg = 360 / totalCards;
    const radius = window.innerWidth * .4;

    cards.forEach((card, index) => {
      const angle = index * angleDeg;
      const radian = (angle * Math.PI) / 180;
      
      gsap.set(card, {
        x: radius * Math.sin(radian),
        z: radius * Math.cos(radian),
        rotateY: angle,
      });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: "top top",
      end: `=+${window.innerHeight * 2}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // 更新旋转角度给 SpinningText 使用
        setRotation(progress * 360);
        
        cards.forEach((card, index) => {
          const angle = index * angleDeg + (progress * 360);
          const radian = (angle * Math.PI) / 180;
          const zPos = radius * Math.cos(radian);
          
          gsap.to(card, {
            x: radius * Math.sin(radian),
            z: zPos,
            rotateY: angle,
            zIndex: Math.round(zPos + radius),
            duration: 0.5,
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="h-screen overflow-hidden"
    >
      <div className="relative h-screen flex flex-col items-center justify-center">
        <div>
          <SpinningText 
            rotation={rotation}
          />
        </div>

        {/* 3D容器 */}
        <div className="relative w-full h-[80vh] [perspective:2500px]">
          <div
            className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     [transform-style:preserve-3d] cursor-pointer"
          >
            {works.map((work, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[400px] h-[300px] [transform-style:preserve-3d]"
              >
                <div className="relative w-full h-full [transform-style:preserve-3d]
                              bg-white/5 rounded-xl backdrop-blur-sm">
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
