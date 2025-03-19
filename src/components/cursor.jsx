import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { isDesktop } from '@/lib/utils';

const CursorWrapper = styled(motion.div)`
  position: fixed;
  z-index: 101;
  user-select: none;
  pointer-events: none;
`;

const Circle = styled(motion.div)`
  position: fixed;
  top: -50px;
  left: -50px;
  width: 100px;
  height: 100px;
  ${({ $hasBackdropSupport }) =>
    $hasBackdropSupport
      ? `
        backdrop-filter: invert(1) grayscale(1);
        background-color: rgba(255, 255, 255, 0);
      `
      : `
        background-color: #000;
        opacity: 0.75;
      `}
`;

const Dot = styled(motion.div)`
  position: fixed;
  width: 6px;
  height: 6px;
  ${({ $hasBackdropSupport }) =>
    $hasBackdropSupport
      ? `
        backdrop-filter: invert(1) grayscale(1);
        background-color: rgba(255, 255, 255, 0);
      `
      : `
        background-color: #fff;
        opacity: 0.75;
      `}
`;

export const Cursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const scale = useMotionValue(1);
  
  const hasBackdropSupport = CSS.supports("backdrop-filter", "invert(1) grayscale(1)");

  // 位置动画配置
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // 缩放动画配置
  const scaleSpringConfig = { damping: 5, stiffness: 100 };
  const scaleSpring = useSpring(scale, scaleSpringConfig);

  useEffect(() => {
    if (typeof window !== 'undefined' && isDesktop()) {
      
      const handleMouseMove = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        if (e.target.localName === 'button' || 
            e.target.localName === 'a' || 
            e.target.onclick !== null ||
            e.target.classList.contains('curzr-hover')) {
          scale.set(1.3);
        } else {
          scale.set(1);
        }
      };

      const handleClick = () => {
        scale.set(0.75);
        setTimeout(() => {
          scale.set(1);
        }, 150);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('click', handleClick);
      };
    }
  }, [cursorX, cursorY, scale]);

  if (!isDesktop()) {
    return null;
  }

  return (
        <CursorWrapper
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          <Circle 
            $hasBackdropSupport={hasBackdropSupport}
            className="rounded-full"
            style={{
              scale: scaleSpring
            }}
          />
          <Dot 
            $hasBackdropSupport={hasBackdropSupport}
            className="rounded-full"
          />
        </CursorWrapper>
  );
};
