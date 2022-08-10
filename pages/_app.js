import '@/styles/main.css'
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import SEO from '@/helpers/seo.config';
import { Context } from '../context/state';
import { useContext, useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'

const typeIn = {
  visible: { display: 'inline-block' },
  hidden: { display: 'none' }
}

const introEnd = {
  visible: { opacity: 0 },
  hidden: { opacity: '100%' }
}

const revealHoriReverse = {
  visible: { y: '-100%' },
  hidden: { y: 0 },
}

export default function App({ Component, pageProps }) {
  const [introContext, setIntroContext] = useState(false);
  const router = useRouter()
  
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return (
    <>
      <DefaultSeo {...SEO} /> 


      <Context.Provider value={[introContext, setIntroContext]}>
        {/* INTRO START */}
        <LazyMotion features={domAnimation}>
              { !introContext && router.asPath == '/' && (
                <m.div 
                  initial="hidden"
                  animate="visible"
                  variants={introEnd}
                  transition={{ delay: 2, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                  className="bg-black fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]"
                >
                  <Div100vh className="bg-black fixed inset-0 z-[100] pointer-events-none flex flex-col p-[14px] md:p-[20px]">

                    <div className="my-auto">
                      <div className="w-full h-[60vh] md:h-[63vh] relative mt-[-2vw] overflow-hidden flex items-center justify-center">
                        <div className="relative overflow-hidden">
                        <m.svg
                          initial="hidden" animate="visible"
                          variants={revealHoriReverse}
                          transition={{ delay: 1.5, duration: 1, ease: [0.83, 0, 0.17, 1] }}
                          className="block w-[135px] md:w-[108.85px]" width="108.85" height="59.73" viewBox="0 0 108.85 59.73" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.1, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M4.62,21.86c-1.38-.56-2.48-1.38-3.31-2.47-.83-1.09-1.27-2.41-1.31-3.94,0-.19,.06-.35,.19-.49,.13-.14,.29-.2,.5-.2H4.95c.27,0,.49,.07,.65,.22,.16,.15,.3,.37,.43,.66,.34,1.68,1.42,2.52,3.25,2.52,1.05,0,1.86-.35,2.43-1.04,.57-.69,.85-1.69,.85-2.99V5.01H2.33c-.21,0-.39-.08-.55-.24-.16-.16-.24-.34-.24-.55V1.1c0-.23,.08-.42,.24-.57,.16-.15,.34-.22,.55-.22h15.25c.23,0,.43,.07,.58,.22,.16,.15,.24,.34,.24,.57V14.28c0,1.79-.39,3.31-1.17,4.57-.78,1.26-1.87,2.22-3.28,2.87-1.41,.65-3.03,.98-4.85,.98-1.62,0-3.12-.28-4.49-.84Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.2, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M24.09,22.04c-.91-.43-1.63-1.02-2.14-1.76-.52-.75-.77-1.57-.77-2.47,0-1.45,.59-2.62,1.78-3.5,1.19-.88,2.82-1.49,4.9-1.83l3.94-.6v-.44c0-.8-.17-1.39-.5-1.76-.34-.38-.9-.57-1.7-.57-.48,0-.88,.08-1.2,.25-.32,.17-.64,.4-.98,.69-.29,.25-.52,.42-.66,.5-.06,.17-.18,.25-.35,.25h-3.43c-.21,0-.38-.07-.52-.2-.14-.14-.19-.3-.17-.49,.02-.57,.3-1.2,.84-1.89,.54-.69,1.36-1.29,2.46-1.8s2.46-.76,4.08-.76c2.58,0,4.5,.57,5.74,1.72,1.24,1.15,1.86,2.68,1.86,4.62v9.58c0,.21-.07,.39-.22,.55-.15,.16-.34,.24-.57,.24h-3.66c-.21,0-.39-.08-.55-.24s-.24-.34-.24-.55v-1.1c-.46,.65-1.11,1.18-1.94,1.59-.83,.41-1.81,.61-2.95,.61s-2.13-.22-3.04-.65Zm6.87-3.89c.6-.63,.9-1.55,.9-2.77v-.44l-2.68,.47c-1.89,.34-2.84,1-2.84,1.99,0,.53,.22,.94,.66,1.24,.44,.3,.98,.46,1.61,.46,.97,0,1.75-.32,2.35-.95Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.3, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M42.58,20.78c-1.47-1.27-2.26-3.04-2.36-5.31l-.03-1.26,.03-1.29c.08-2.27,.87-4.04,2.35-5.33,1.48-1.28,3.41-1.92,5.78-1.92,1.79,0,3.29,.32,4.52,.96,1.23,.64,2.14,1.41,2.74,2.3,.6,.89,.92,1.71,.96,2.44,.02,.21-.05,.39-.2,.55-.16,.16-.35,.24-.58,.24h-4c-.23,0-.41-.05-.54-.16-.13-.1-.24-.26-.35-.47-.25-.65-.57-1.11-.96-1.39-.39-.27-.89-.41-1.5-.41-1.72,0-2.62,1.11-2.68,3.34l-.03,1.2,.03,1.04c.04,1.13,.29,1.97,.74,2.51,.45,.54,1.1,.8,1.94,.8,.65,0,1.17-.14,1.54-.41,.38-.27,.68-.74,.91-1.39,.1-.21,.22-.37,.35-.47,.13-.1,.3-.16,.54-.16h4c.21,0,.39,.07,.55,.2,.16,.14,.24,.31,.24,.52,0,.67-.29,1.46-.87,2.36-.58,.9-1.49,1.7-2.73,2.38-1.24,.68-2.78,1.02-4.63,1.02-2.37,0-4.3-.64-5.77-1.91Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.4, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M61.14,20.83c-1.41-1.24-2.17-2.98-2.3-5.23-.02-.27-.03-.75-.03-1.42s.01-1.14,.03-1.42c.13-2.23,.91-3.97,2.36-5.22,1.45-1.25,3.44-1.88,5.96-1.88s4.54,.63,5.99,1.88c1.45,1.25,2.24,2.99,2.36,5.22,.02,.27,.03,.75,.03,1.42s-.01,1.15-.03,1.42c-.13,2.25-.89,3.99-2.3,5.23-1.41,1.24-3.42,1.86-6.05,1.86s-4.61-.62-6.02-1.86Zm8.07-2.82c.44-.56,.69-1.41,.76-2.57,.02-.21,.03-.63,.03-1.26s-.01-1.05-.03-1.26c-.06-1.13-.32-1.99-.77-2.55-.45-.57-1.13-.85-2.03-.85-1.74,0-2.67,1.13-2.77,3.4l-.03,1.26,.03,1.26c.04,1.16,.29,2.01,.74,2.57,.45,.56,1.13,.84,2.03,.84s1.61-.28,2.05-.84Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.5, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M83.8,20.58v1.01c0,.21-.07,.39-.22,.55-.15,.16-.34,.24-.57,.24h-3.56c-.21,0-.39-.08-.55-.24s-.24-.34-.24-.55V.79c0-.23,.08-.42,.24-.57,.16-.15,.34-.22,.55-.22h3.84c.23,0,.42,.07,.57,.22,.15,.15,.22,.34,.22,.57V7.53c1.18-1.24,2.71-1.86,4.6-1.86,2.04,0,3.64,.66,4.82,1.99,1.18,1.32,1.81,3.12,1.89,5.39,.02,.27,.03,.65,.03,1.13s-.01,.83-.03,1.1c-.11,2.35-.74,4.18-1.89,5.47-1.16,1.29-2.76,1.94-4.82,1.94s-3.73-.7-4.88-2.11Zm5.31-2.99c.43-.59,.68-1.4,.74-2.43,.04-.42,.06-.75,.06-.98s-.02-.56-.06-.98c-.06-1.03-.31-1.84-.74-2.43-.43-.59-1.14-.88-2.13-.88-.92,0-1.63,.28-2.11,.85-.48,.57-.75,1.28-.79,2.14l-.03,1.17,.03,1.2c.06,.95,.32,1.72,.77,2.32,.45,.6,1.16,.9,2.13,.9s1.7-.29,2.13-.88Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.6, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M21.42,53.5c-.16-.16-.24-.34-.24-.55v-20.48c0-.23,.08-.42,.24-.57,.16-.15,.34-.22,.55-.22h9.61c2.65,0,4.62,.54,5.91,1.62,1.29,1.08,1.94,2.62,1.94,4.62,0,1.05-.27,1.94-.8,2.66s-1.14,1.26-1.81,1.59c.86,.4,1.59,1.04,2.17,1.92s.88,1.87,.88,2.96c0,2.1-.69,3.74-2.08,4.92-1.39,1.18-3.36,1.76-5.92,1.76h-9.9c-.21,0-.39-.08-.55-.24Zm9.53-13.06c.84,0,1.48-.22,1.92-.65,.44-.43,.66-1,.66-1.72s-.22-1.25-.66-1.67c-.44-.42-1.08-.63-1.92-.63h-4.1v4.66h4.1Zm.28,9.2c.86,0,1.53-.25,2.02-.76s.72-1.11,.72-1.83c0-.76-.24-1.38-.72-1.88-.48-.49-1.16-.74-2.02-.74h-4.38v5.2h4.38Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.7, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M45.6,59.54c-.13-.13-.19-.28-.19-.47,0-.15,.03-.28,.09-.41l2.46-5.92-6.05-14.31c-.06-.17-.09-.29-.09-.38,.04-.19,.13-.35,.25-.49,.13-.14,.28-.2,.47-.2h3.59c.44,0,.75,.22,.91,.66l3.59,9.17,3.69-9.17c.21-.44,.52-.66,.95-.66h3.53c.19,0,.35,.07,.49,.2,.14,.14,.21,.29,.21,.46,0,.08-.03,.22-.09,.41l-8.92,20.64c-.17,.44-.48,.66-.95,.66h-3.47c-.19,0-.35-.06-.47-.19Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.8, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M62.81,52.01c-1.45-1.37-2.21-3.35-2.27-5.96v-1.1c.08-2.48,.86-4.42,2.32-5.81,1.46-1.4,3.42-2.1,5.88-2.1,1.79,0,3.29,.36,4.52,1.09s2.15,1.72,2.77,2.98c.62,1.26,.93,2.71,.93,4.35v.76c0,.21-.07,.39-.22,.55-.15,.16-.34,.24-.57,.24h-10.08v.22c.04,.99,.28,1.79,.72,2.4,.44,.61,1.08,.91,1.92,.91,.53,0,.96-.11,1.29-.33,.34-.22,.64-.49,.91-.8,.19-.23,.34-.37,.46-.43,.12-.05,.3-.08,.55-.08h3.91c.19,0,.35,.06,.49,.17,.14,.12,.2,.27,.2,.46,0,.55-.31,1.18-.93,1.89-.62,.71-1.52,1.33-2.69,1.86-1.18,.52-2.56,.79-4.16,.79-2.52,0-4.51-.68-5.96-2.05Zm8.6-8.13v-.06c0-1.03-.24-1.84-.71-2.44-.47-.6-1.13-.9-1.97-.9s-1.47,.3-1.94,.9c-.47,.6-.71,1.41-.71,2.44v.06h5.33Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 0.9, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M80.14,53.52c-.15-.15-.22-.34-.22-.57v-14.81c0-.23,.07-.42,.22-.57,.15-.15,.34-.22,.57-.22h3.62c.23,0,.43,.08,.58,.24,.16,.16,.24,.34,.24,.55v1.26c1.16-1.37,2.71-2.05,4.66-2.05h1.39c.23,0,.42,.07,.57,.22,.15,.15,.22,.34,.22,.57v3.25c0,.21-.07,.39-.22,.55-.15,.16-.34,.24-.57,.24h-3.06c-.86,0-1.53,.24-2,.71-.47,.47-.71,1.14-.71,2v8.07c0,.23-.08,.42-.24,.57-.16,.15-.35,.22-.58,.22h-3.91c-.23,0-.42-.07-.57-.22Z" fill="#FFF"/>
                          <m.path initial="hidden" animate="visible" variants={typeIn} transition={{ delay: 1, duration: 0.1, ease: [0.83, 0, 0.17, 1] }} d="M96.7,53.33c-1.15-.48-1.99-1.06-2.54-1.73-.55-.67-.82-1.27-.82-1.8,0-.21,.08-.38,.24-.52,.16-.14,.33-.2,.52-.2h3.59c.13,0,.24,.05,.35,.16,.25,.17,.44,.3,.57,.41,.46,.34,.87,.58,1.21,.74s.77,.24,1.28,.24c.61,0,1.11-.12,1.5-.36,.39-.24,.58-.58,.58-1.02,0-.36-.1-.64-.3-.85-.2-.21-.58-.41-1.15-.61-.57-.2-1.43-.41-2.58-.65-1.74-.36-3.08-.94-4.02-1.75-.94-.81-1.4-1.9-1.4-3.26,0-.86,.27-1.68,.82-2.46,.55-.78,1.36-1.41,2.44-1.89,1.08-.48,2.37-.72,3.86-.72s2.79,.23,3.91,.69c1.11,.46,1.96,1.02,2.54,1.69,.58,.66,.87,1.27,.87,1.81,0,.19-.07,.36-.21,.5-.14,.15-.3,.22-.49,.22h-3.28c-.17,0-.33-.05-.47-.16-.27-.15-.52-.3-.72-.47-.36-.27-.69-.48-1.01-.63-.31-.15-.7-.22-1.17-.22-.55,0-.98,.13-1.31,.38-.33,.25-.49,.58-.49,.98,0,.32,.09,.58,.27,.79,.18,.21,.56,.42,1.13,.61,.58,.2,1.43,.4,2.57,.61,2.04,.36,3.52,.99,4.46,1.89,.93,.9,1.4,1.96,1.4,3.18,0,1.56-.69,2.8-2.08,3.73-1.39,.94-3.32,1.4-5.8,1.4-1.7,0-3.13-.24-4.27-.72Z" fill="#FFF"/>
                          </m.svg>
                        </div>
                        
                      </div>
                    </div>

                    
                  </Div100vh>
                </m.div>
              )}
            </LazyMotion>
            {/* INTRO END */}

        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.asPath} route={router.asPath} />
        </AnimatePresence>
      </Context.Provider>
    </>
  )
}