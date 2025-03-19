import { useEffect } from 'react'
import { initAntiDebug } from '@/lib/antidebugger'
import styled from 'styled-components'
import { Header } from '@/components/header'
import { Home } from '@/sections/home'
import { Skills } from '@/sections/skills'
import { Experiences } from '@/sections/experiences'
import { Projects } from '@/sections/projects'
import { ParticlesBackground } from './components/background'

const AppWrapper = styled.div`
  background-color: #151a1f;
  background-size: 50px 50px;
  background-position: center;
  background-attachment: fixed;
  background-image: linear-gradient(#1f272e 1px, transparent 1px), linear-gradient(to right, #1f272e 1px, #151a1f 1px);
`

function App() {
  useEffect(() => {
    // 生产环境下不允许打开devtools
    if (import.meta.env.PROD) {
      initAntiDebug();
    }
  }, []);

  return (
    <AppWrapper className="text-white min-h-screen max-w-screen">
      <ParticlesBackground />
      <Header />
      <section id="home">
        <Home />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experiences">
        <Experiences />
      </section>
      <section id="projects">
        <Projects />
      </section>
    </AppWrapper>
  )
}

export default App
