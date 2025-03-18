import { EncryptButton } from '@/components/EncryptButton'
import { DragCards } from '@/components/DragCards'
import { useEffect } from 'react'
import { initAntiDebug } from '@/lib/antidebugger'
import styled from 'styled-components'
import { SmoothScrollHero } from '@/components/Hero'
import { WorkingExperience } from './components/WorkingExperience'
import Scroll from '@/components/Scroll'
import { BorderTrail } from './components/core/border-trail'
import ShuffleHero from '@/components/Shuffle'
import { Header } from '@/components/header/Header'
import { Example } from './components/Blocked'
import { NameHero } from './components/NameHero'
import DepthCardCarousel from './components/HorizentalScroll'
import { MySkills } from './components/MySkills'

const AppWrapper = styled.div`
  background-color: #151a1f;
  background-size: 40px 80px;
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
      <Header />
      <NameHero />
      {/* <SmoothScrollHero /> */}
      <MySkills />
      {/* <DepthCardCarousel /> */}
      <Example />
      <ShuffleHero />
      <Scroll />

      {/* <img className='w-[50x] h-[50px]' src={Avatar}/> */}
      <WorkingExperience />
      <div className='relative flex h-[200px] w-[300px] flex-col items-center justify-center rounded-md bg-zinc-800'>
      <BorderTrail
        style={{
          boxShadow:
            '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
        }}
        size={100}
      />
      <div
        className='flex h-full animate-pulse flex-col items-start justify-center space-y-2'
        role='status'
        aria-label='Loading...'
      >
      </div>
    </div>
      <EncryptButton />
      <DragCards />
    </AppWrapper>
  )
}

export default App
