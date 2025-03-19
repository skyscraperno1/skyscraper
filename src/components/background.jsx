import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.5
            }
          }
        },
      },
      particles: {
        color: {
          value: "#4ade80", // 浅绿色
        },
        links: {
          color: "#4ade80", // 保持一致的颜色
          distance: 150,
          enable: true,
          opacity: 0.4, // 稍微提高连线透明度
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.7, // 提高粒子透明度
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.4,
          }
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 3 }, // 稍微增大粒子尺寸
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
      />
    );
  }

  return <></>;
};
