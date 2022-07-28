import { useRef } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FancyLink from '@/components/fancyLink'
import { fade, revealDelay, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import SanityBlockContent from '@sanity/block-content-to-react'
import Image from '@/components/image'
import Link from 'next/link'
//import Carousel from '@/components/carousel'
import BodyRenderer from '@/components/body-renderer'
//import Loader from '@/components/loader'

const query = `*[_type == "work" && slug.current == $slug][0]{
  title,
  url,
  stack,
  credits[] {
    job,
    name
  },
  image {
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
  logo {
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
  contentBlocks[] {
    ...,
    image {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption
    },
    image1 {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption
    },
    image2 {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption
    },
    images[] {
      asset-> {
        ...
      },
      overrideVideo {
        asset-> {
          ...
        }
      },
      alt,
      caption
    },
    items[] {
      ...,
      image {
        asset-> {
          ...
        },
        overrideVideo {
          asset-> {
            ...
          }
        },
        alt,
        caption
      },
    }
  },
  seo {
    ...,
    shareGraphic {
      asset->
    }
  },
  slug {
    current
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

export default function WorkSlug(initialData) {
  const { data: { title, image, stack, contact, credits, contentBlocks, logo, url, menu, seo }  } = pageService.getPreviewHook(initialData)()

  const containerRef = useRef(null)
  return (
    <Layout>
      <NextSeo 
        title={seo.metaTitle} 
        description={seo.metaDesc}
        openGraph={{
          images: [
            { url: seo.shareGraphic.asset.url },
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
            className="px-5 pt-[5rem] min-h-[calc(100vh-3.5rem)] text-white"
          >
            <m.article className="flex flex-wrap">
              <m.header className="flex flex-wrap gap-y-16 w-full">
                <m.section className="w-full md:w-3/5 bg-gray-900 rounded-lg overflow-hidden block group relative min-h-[calc(100vh-14rem)] md:min-h-[calc(100vh-8rem)]" variants={fade}>
                  <div className="absolute w-full h-full grid z-40 px-5 content-end leading-none">
                   
                    <div className="flex content-end justify-between">
                    <h1 className="text-xl md:text-[30px]">{title}</h1>
                    <FancyLink  destination={url} a11yText={`Navigate to the ${title} site`} label="Visit Site" extraClasses="hover:underline no-underline text-xl md:text-[30px]" />
                    </div>
                  </div>
                  <div className='w-full h-full relative'>
                    <m.div 
                      className='absolute opacity-100 z-30 w-full h-full grid content-center justify-center'
                      variants={revealDelayBottom}
                    >
                      <Image
                        image={logo}
                        focalPoint={logo.hotspot}
                        className={`${logo.orientation === 'banner' ? 'w-[18rem] md:w-[30rem]' : 'button' ? 'w-[18rem] md:w-[25rem]' : 'w-[18rem] md:w-[20rem]'}`}
                        alt={logo.alt}
                      />
                    </m.div>
                    <Image
                      image={image}
                      focalPoint={image.hotspot}
                      objectSettings="cover"
                      layout="fill"
                      className="opacity-20"
                      alt={image.alt}
                    />
                  </div>
                </m.section>
                <m.section className="w-full md:w-2/5 grid md:pl-5 content-center" variants={fade}>
                  <h2 className='w-full border-b border-white text-white/75'>The Tech Stack</h2>
                  {stack?.map((item, i) => {
                    return (
                      <div className="p-2 border-b overflow-hidden border-white w-full mb-2 items-end" key={`tech-${i}`}>
                        <m.div
                          className="flex place-content-between w-full"
                          variants={revealDelayBottom}
                        >
                          <span className="text-2xl md:text-4xl">{item.title}</span>
                          <span className="text-large md:text-2xl text-white/75">{item.type}</span>
                        </m.div>
                      </div>
                    )
                  })}
                  {credits && (<h2 className='w-full border-b border-white mt-8 text-white/75'>Special Thanks</h2>)}
                  {credits?.map((item, i) => {
                    return (
                      <div className="p-2 border-b overflow-hidden border-white w-full mb-2 items-end" key={`job-${i}`}>
                        <m.div
                          className="flex place-content-between w-full"
                          variants={revealDelayBottom}
                        >
                          <span className="text-2xl md:text-4xl">{item.job}</span>
                          <span className="text-large md:text-2xl text-white/75">{item.name}</span>
                        </m.div>
                      </div>
                    )
                  })}
                </m.section>
              </m.header>
              <m.section className="pt-[15vh] w-full">
                <BodyRenderer body={contentBlocks} />
              </m.section>
            </m.article>
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
  const props = await pageService.fetchQuery(context)
  return {
    props
  };
}

export async function getStaticPaths() {
  const paths = await pageService.fetchPaths('work')
  return {
    paths: paths,
    fallback: false,
  };
}