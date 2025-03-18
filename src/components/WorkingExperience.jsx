import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

const TimelineWrapper = styled.div`
  min-height: 200vh;
  padding: 100px 0;
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

// 添加 SVG 路径容器
const PathContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100%;
  
  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  path {
    fill: none;
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 2;
  }
`;

const TimelineItem = styled.div`
  opacity: 0;
  position: relative;
  margin: 150px 0;
  width: 45%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &.right {
    margin-left: auto;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 50px;
    height: 2px;
    background: linear-gradient(
      ${props => props.className.includes('left') ? 
      'to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2)' : 
      'to left, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2)'}
    );
  }

  &.left::before {
    right: -50px;
  }

  &.right::before {
    left: -50px;
  }
`;

const experiences = [
  {
    period: '2014 - 2018',
    company: 'School',
    position: 'Computer Science Student',
    description: 'Studied Computer Science and Technology',
    side: 'left'
  },
  {
    period: '2018 - 2019',
    company: 'Atos',
    position: 'Software Engineer',
    description: 'Worked on enterprise solutions',
    side: 'right'
  },
  {
    period: '2019 - 2022',
    company: 'Apple',
    position: 'Software Developer',
    description: 'Developed innovative solutions',
    side: 'left'
  },
  {
    period: '2022 - 2023',
    company: 'China Soft',
    position: 'Senior Developer',
    description: 'Led development teams',
    side: 'right'
  },
  {
    period: '2023 - 2025',
    company: 'Jilue',
    position: 'Tech Lead',
    description: 'Leading technical initiatives',
    side: 'left'
  }
];

export const WorkingExperience = () => {
  const timelineRef = useRef(null);
  const itemsRef = useRef([]);
  const pathRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const items = itemsRef.current;
    const path = pathRef.current;

    // 创建曲线路径
    const pathLength = path.getTotalLength();
    
    // 初始化路径
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 创建路径动画
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    // 为每个项目创建动画
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: item.classList.contains('left') ? -50 : 50,
          y: 20,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <TimelineWrapper>
      <TimelineContainer ref={timelineRef}>
        <PathContainer>
          <svg>
            <path
              ref={pathRef}
              d="M50,0 
                 C80,100 20,200 50,300 
                 C80,400 20,500 50,600 
                 C80,700 20,800 50,900 
                 C80,1000 50,1100 50,1200"
              stroke="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.5)" />
                <stop offset="50%" stopColor="rgba(147, 197, 253, 0.5)" />
                <stop offset="100%" stopColor="rgba(96, 165, 250, 0.5)" />
              </linearGradient>
            </defs>
          </svg>
        </PathContainer>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.period}
            className={exp.side}
            ref={el => itemsRef.current[index] = el}
          >
            <div className="mb-2 text-xl font-bold text-blue-400">
              {exp.period}
            </div>
            <div className="mb-1 text-lg font-semibold text-white">
              {exp.company}
            </div>
            <div className="mb-2 text-gray-300">
              {exp.position}
            </div>
            <div className="text-sm text-gray-400">
              {exp.description}
            </div>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </TimelineWrapper>
  );
};