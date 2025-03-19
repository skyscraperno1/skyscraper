import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Typewrite } from '@/components/typewrite';

gsap.registerPlugin(ScrollTrigger);

const Title = styled.h1`
  background: linear-gradient(#6366f1 var(--gradient-stop), #0000 var(--gradient-stop)) center center fixed;
  color: transparent;
  background-clip: text;
  -webkit-text-stroke: 2px #6366f1;
  font-size: 10vw;
  line-height: 100%;
`
const SubTitle = styled.h2`
  background: linear-gradient(#6365f1a8 var(--gradient-stop), #0000 var(--gradient-stop)) center center fixed;
  color: transparent;
  background-clip: text;
  -webkit-text-stroke: 2px #6365f1a8;
  font-size: 8vw;
  line-height: 100%;
`


const skills = [
  {
    name: 'React.js',
    icon: '/src/assets/imgs/skills/react.svg',
    description: 'Building modern web applications'
  },
  {
    name: 'Vue.js',
    icon: '/src/assets/imgs/skills/vue.svg',
    description: 'Progressive JavaScript framework'
  },
  {
    name: 'Tailwind CSS',
    icon: '/src/assets/imgs/skills/tailwindcss.svg',
    description: 'Utility-first CSS framework'
  },
  {
    name: 'Ethereum',
    icon: '/src/assets/imgs/skills/ethereum.svg',
    description: 'Blockchain development & Smart contracts'
  },
  {
    name: 'TypeScript',
    icon: '/src/assets/imgs/skills/typescript.svg',
    description: 'Type-safe JavaScript development'
  },
  {
    name: 'JavaScript',
    icon: '/src/assets/imgs/skills/javascript.svg',
    description: 'Core web programming language'
  },
  {
    name: 'Vite',
    icon: '/src/assets/imgs/skills/vite.svg',
    description: 'Next generation frontend tooling'
  },
  {
    name: 'HTML5',
    icon: '/src/assets/imgs/skills/html5.svg',
    description: 'Modern markup language'
  },
  {
    name: 'CSS3',
    icon: '/src/assets/imgs/skills/css3.svg',
    description: 'Advanced styling capabilities'
  }
];

export const Skills = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const nameRef = useRef(null)
  const isInView = useInView(statsRef, { once: true });

  useEffect(() => {
    const slider = sliderRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const name = nameRef.current;
    const numbers = document.querySelectorAll('.animated-number');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // 0-50% 进度时，第一个标题从 0-100%
          if (progress <= 0.5) {
            title.style.setProperty('--gradient-stop', `${progress * 200}%`);
            subtitle.style.setProperty('--gradient-stop', '0%');
          }
          // 50-100% 进度时，第二个标题从 0-100%
          else {
            title.style.setProperty('--gradient-stop', '100%');
            subtitle.style.setProperty('--gradient-stop', `${(progress - 0.5) * 200}%`);
          }
        }
      }
    });

    // 添加所有动画到 timeline
    tl
      .to(slider, {
        x: () => -(slider.scrollWidth - window.innerWidth + 80),
        ease: "none",
      })
      .to(name, {
        xPercent: 25,
        ease: "linear",
      }, "<") // "<" 表示与前一个动画同时开始
      .to(numbers, {
        innerText: gsap.utils.wrap([6, 20, 24]), // 为每个数字设置目标值
        snap: { innerText: 1 },
        ease: "none",
      }, "<");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className='overflow-hidden w-screen min-h-screen px-10 pt-20'>
      <Typewrite examples={[
        "Passionate about web development",
        "Experienced in React & Vue",
        "Love building beautiful UI/UX",
        "Always learning new technologies",
      ]} />
      <Title
        ref={titleRef}
        className='font-sisyphus text-center uppercase top-[5%] z-10'
        style={{ '--gradient-stop': '0%' }}
      >
        my skills
      </Title>
      <SubTitle
        ref={subtitleRef}
        className='font-sisyphus text-center uppercase top-[20%] z-10'
        style={{ '--gradient-stop': '0%' }}
      >
        font-end developer
      </SubTitle>
      {/* 滚动的技能列表 */}
      <div
        ref={sliderRef}
        className='flex gap-8 px-8 mt-10'
      >
        {skills.map((skill, index) => (
          <div
            key={index}
            className='flex-shrink-0 w-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors'
          >
            <div className='flex items-center gap-4 mb-4'>
              <img
                src={skill.icon}
                alt={skill.name}
                className='w-12 h-12'
              />
              <h3 className='text-2xl font-bold text-white'>
                {skill.name}
              </h3>
            </div>
            <p className='text-white/60'>
              {skill.description}
            </p>
          </div>
        ))}
      </div>
      <motion.div
        ref={statsRef}
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
        className="mt-20 grid grid-cols-3 gap-8 text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="text-white/90 text-xl mb-2">
            <span className="animated-number">0</span><span className="text-lg">+</span>
            <span className="text-lg ml-1">Years</span>
          </h4>
          <p className="text-white/50">Professional Experience</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-white/90 text-xl mb-2">
            <span className="animated-number">0</span><span className="text-lg">+</span>
            <span className="text-lg ml-1">Projects</span>
          </h4>
          <p className="text-white/50">Successfully Delivered</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="text-white/90 text-xl mb-2">
            <span className="animated-number">0</span><span className="text-lg">/7</span>
            <span className="text-lg ml-1">Hours</span>
          </h4>
          <p className="text-white/50">Learning & Growing</p>
        </motion.div>
      </motion.div>
      <div className="mt-20 text-center">
        <div className="flex justify-center items-center">
          <h1 ref={nameRef} className='shrink-0 font-bowlby-one text-[10vw]'>Skyscraper No.1 Skyscraper No.1 Skyscraper No.1</h1>
        </div>
      </div>
    </section>
  );
};