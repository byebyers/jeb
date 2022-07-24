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
  stack,
  credits,
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
      hotspot {
        x,
        y
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
  "contact": *[_type == "contact"][0]{
    email,
    socials[] {
      title,
      url
    }
  }
}`

const pageService = new SanityPageService(query)

export default function WorkSlug(initialData) {
  const { data: { title, image, stack, contact, credits, contentBlocks }  } = pageService.getPreviewHook(initialData)()

  const containerRef = useRef(null)
  return (
    <Layout>
      <NextSeo title={title} />
      <Header />
        <LazyMotion features={domAnimation}>
          <m.main
            initial="initial"
            animate="enter"
            exit="exit"
            className="px-5 pt-[5rem] min-h-[calc(100vh-3.5rem)] text-white"
          >
            <m.article className="flex flex-wrap">
              <m.header className="flex flex-wrap w-full">
                <m.section className="w-3/5 bg-gray-900 rounded-lg overflow-hidden block group relative min-h-[calc(100vh-8rem)]" variants={fade}>
                  <div className="absolute w-full h-full grid z-40 px-5 content-end leading-none">
                    <h1 className="text-[90px]">{title}</h1>
                  </div>
                  <div className='w-full h-full relative'>
                    <Image
                      image={image}
                      focalPoint={image.hotspot}
                      objectSettings="cover"
                      layout="fill"
                      className="opacity-10"
                      alt={image.alt}
                    />
                  </div>
                </m.section>
                <m.section className="w-2/5 grid pl-5 content-center" variants={fade}>
                  <h2 className='w-full border-b border-white text-white/75'>The Tech Stack</h2>
                  {stack?.map((item, i) => {
                    return (
                      <div className="p-2 border-b flex place-content-between border-white w-full mb-2 items-end" key={`tech-${i}`}>
                        <span className="text-4xl">{item.title}</span>
                        <span className="text-2xl text-white/75">{item.type}</span>
                      </div>
                    )
                  })}
                  <h2 className='w-full border-b border-white mt-8 text-white/75'>Special Thanks</h2>
                  {credits?.map((item, i) => {
                    return (
                      <div className="p-2 border-b flex place-content-between border-white w-full mb-2 items-end" key={`job-${i}`}>
                        <span className="text-4xl">{item.job}</span>
                        <span className="text-2xl text-white/75">{item.name}</span>
                      </div>
                    )
                  })}
                </m.section>
              </m.header>
              <m.section className="py-40">
                <BodyRenderer body={contentBlocks} />
              </m.section>
            </m.article>
          </m.main>
        </LazyMotion>
      <Footer contact={contact} />
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