import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import { useEffect } from "react";

export const DragClosePanel = ({
  open,
  setOpen,
  children,
  type = 'sidebar', // 'sidebar' | 'drawer'
  position = 'right', // 'left' | 'right' | 'bottom'
  size = '85vw', // width for sidebar, height for drawer
  handleEsc = true
}) => {
  const [scope, animate] = useAnimate();
  const [panelRef, bounds] = useMeasure();

  const isDrawer = type === 'drawer';
  const motionValue = useMotionValue(0);
  const controls = useDragControls();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const start = typeof motionValue.get() === "number" ? motionValue.get() : 0;
    const finalMotion = isDrawer
      ? bounds.height
      : (position === 'left' ? -bounds.width : bounds.width);

    await animate("#panel", {
      [isDrawer ? 'y' : 'x']: [start, finalMotion],
    });

    document.removeEventListener('keydown', handleKeyDown);
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && handleEsc) {
      handleClose();
    }
  };

  const getDragEndCheck = () => {
    if (isDrawer) return motionValue.get() >= 100;
    return motionValue.get() * (position === 'right' ? 1 : -1) >= 100;
  };

  const getInitialPosition = () => {
    if (isDrawer) return { y: '100%' };
    return { x: position === 'left' ? '-100%' : '100%' };
  };

  const getAnimatePosition = () => {
    if (isDrawer) return { y: '0%' };
    return { x: '0%' };
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-neutral-950/70"
        >
          <motion.div
            id="panel"
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            initial={getInitialPosition()}
            animate={getAnimatePosition()}
            transition={{ ease: "easeInOut" }}
            className={`
              absolute bg-neutral-900 overflow-hidden
              ${isDrawer
                ? 'bottom-0 w-full rounded-t-3xl'
                : `${position === 'left' ? 'left-0' : 'right-0'} h-full`
              }
            `}
            style={{
              [isDrawer ? 'height' : 'width']: size,
              [isDrawer ? 'y' : 'x']: motionValue,
            }}
            drag={isDrawer ? "y" : "x"}
            dragControls={controls}
            onDragEnd={() => {
              if (getDragEndCheck()) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            dragElastic={isDrawer ? { top: 0, bottom: 0.5 } : { left: 0.5, right: 0.5 }}
          >
            {/* Handle bar */}
            <div
              className={`
                absolute z-10 flex justify-center
                ${isDrawer
                  ? 'left-0 right-0 top-0 p-4'
                  : `top-1/2 -translate-y-10 p-4 ${position === 'left' ? 'right-0' : 'left-0'}`
                }
              `}
            >
              <button
                onPointerDown={(e) => controls.start(e)}
                className={`
                  cursor-grab touch-none rounded-full bg-neutral-700 z-[101]
                  ${isDrawer ? 'h-2 w-14' : 'h-14 w-2'}
                `}
              />
            </div>

            {/* Content */}
            <div
              className={`
                relative z-0 h-full overflow-x-hidden
                ${isDrawer
                  ? 'p-4 pt-12'
                  : `p-4 ${position === 'left' ? 'pr-8' : 'pl-8'}`
                }
              `}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};