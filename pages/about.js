import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'
import Image from '@/components/image'
import { fade, fadeDelay, revealDelayBottom } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import BlockContent from '@sanity/block-content-to-react'
import { useRef, useContext, useEffect } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { Context } from '../context/state'

const query = `{
  "about": *[_type == "about"][0]{
    title,
    heroText,
    heroImage {
      asset-> {
        ...,
      },
      caption,
      alt,
      hotspot {
        x,
        y
      },
    },
    clientList,
    servicesList,
    content,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
  "contact": *[_type == "contact"][0]{
    email,
    socials[] {
      title,
      url
    }
  },
  "menu": *[_type == "menu"][0]{
    butter
  }
}`

const pageService = new SanityPageService(query)

export default function About(initialData) {
  const { data: { about, contact, menu } } = pageService.getPreviewHook(initialData)()
  const containerRef = useRef(null)
  const [introContext, setIntroContext] = useContext(Context);

  useEffect(() => {
    // Set the intro global context to true after 4 seconds
    setTimeout(() => {
      setIntroContext(true)
    }, 3500);
  },[]);

  return (
    <Layout>
      <NextSeo 
        title={about.seo.metaTitle} 
        description={about.seo.metaDesc}
        openGraph={{
          images: [
            { url: about.seo.shareGraphic.asset.url },
          ],
        }}
      />

      <Header 
        butterBar={menu.butter}
      />

      <LocomotiveScrollProvider
        options={{ smooth: true, lerp: 0.05 }}
        containerRef={containerRef}
        watch={[]}
      >
      <div data-scroll-container ref={containerRef} id="scroll-container">
      <div data-scroll-section>

      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
          className="px-5 pt-[5rem] min-h-screen grid text-white"
        >
          <m.section 
            variants={fade}
            className="grid md:relative gap-y-2 min-h-[calc(100vh-8rem)]" 
          >
            <m.div className="md:absolute md:bottom-5 w-full md:w-auto opacity-75 md:right-5" variants={revealDelayBottom}>
              <Image
                image={about.heroImage}
                focalPoint={about.heroImage.hotspot}
                className="md:w-[30rem]"
                alt={about.heroImage.alt}
              />
            </m.div>
            <m.div variants={fadeDelay} className="text-2xl md:text-4xl md:h-full w-full md:w-3/5 content-center leading-[3rem] md:ml-5 md:pt-20">
              <BlockContent serializers={{ container: ({ children }) => children }} blocks={about.heroText} />
            </m.div>
            
          </m.section>
          <m.section className="grid grid-cols-9 gap-3  pt-10 md:pt-80 pb-10 md:pb-40 content-center justify-center text-2xl font-extralight">
            <div className="col-span-9 md:col-span-1 mb-5 md:mb-0">
              <span className="block leading-none mb-1">Clients &amp; <span className="block">Services</span></span>
            </div>
            
            <div className="col-span-9 md:col-span-2 md:col-start-3 mb-6 md:mb-0">
              {about.clientList.map((e, i) => {
                return (
                  <span className="block leading-none mb-1" key={i}>{e}</span>
                )
              })}
            </div>

            <div className="col-span-9 md:col-span-2 md:col-start-5 mb-6 md:mb-0">
              {about.servicesList.map((e, i) => {
                return (
                  <span className="block leading-none mb-1" key={i}>{e}</span>
                )
              })}
            </div>

            <div className="col-span-9 md:col-span-2 md:col-start-8">
              { contact.email && (<a href={`mailto:${contact.email}`} className="block leading-none mb-1 group relative overflow-hidden underline"><span className="block group-hover:translate-y-full transition-transform ease-in-out duration-300">Email</span>
                    <span className="block absolute inset-0 transition-transform ease-in-out duration-300 -translate-y-full underline group-hover:translate-y-0">Email</span></a>)}

              {contact.socials.map((e, i) => {
                return (
                  <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" className="block leading-none mb-1 underline group relative overflow-hidden">
                    <span className="block group-hover:translate-y-full transition-transform ease-in-out duration-300">{e.title}</span>
                    <span className="block absolute inset-0 transition-transform ease-in-out duration-300 -translate-y-full underline group-hover:translate-y-0">{e.title}</span>
                  </a>
                )
              })}
            </div>
          </m.section>
          <m.section className="py-10 md:py-40 grid md:flex gap-y-4">
            <div className="w-full md:w-4/12">
              <span className="block text-lg mb-3 uppercase">About Me</span>
            </div>
            <div className="w-full md:w8/12">
              <div className="w-10/12 md:w-8/12 xl:w-7/12 2xl:w-6/12 collab-text xl:pr-8 font-light text-2xl">
                <BlockContent serializers={{ container: ({ children }) => children }} blocks={about.content} />
              </div>
            </div>
          </m.section>
        </m.main>
        <Footer contact={contact} />
      </LazyMotion>
      
      </div>
      </div>
      </LocomotiveScrollProvider>

      
    </Layout>
  )
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}
