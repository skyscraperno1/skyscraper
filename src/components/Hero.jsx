import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <div>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
          // infinite: true,
          syncTouch: true,
        }}
      >
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full curzr-hover"
      onClick={() => {
        window.open('https://7007.ai')
      }}
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(/src/assets/imgs/work0.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto w-full px-40 pt-[200px]">
      <ParallaxImg
        src='/src/assets/imgs/work1.png'
        alt="DeSim One"
        url="https://jp.desim.tech/desim-landing/"
        start={-200}
        end={200}
        className="w-1/3 curzr-hover"
      />
      <ParallaxImg
        src='/src/assets/imgs/work2.png'
        alt="极略科技后台"
        url="https://pfs.cdjilue.com/login"
        start={200}
        end={-250}
        className="mx-auto w-2/3 curzr-hover"
      />
      <ParallaxImg
        src='/src/assets/imgs/work4.png'
        alt="web3冷钱包提现"
     
        start={-200}
        end={200}
        className="ml-auto w-1/3 curzr-hover"
      />
      <ParallaxImg
        src='/src/assets/imgs/work3.png'
        alt="7007"
        url="https://7007.ai"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end, url }) => {
  const ref = useRef(null);
  const handleClick = () => {
    if (url) {
      window.open(url)
    }
  }
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      onClick={handleClick}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="text-4xl font-black uppercase text-zinc-50"
      >
        MY WORKS
      </motion.h1>
    </section>
  );
};
