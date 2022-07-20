import { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'
import Image from '@/components/image'
import { fade, revealDelay, fadeDelay, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import BlockContent from '@sanity/block-content-to-react'


const query = `{
  "home": *[_type == "home"][0]{
    title,
    content,
    seo {
      ...,
      shareGraphic {
        asset->
      }
    }
  },
  "work": *[_type == "work"] | order(releaseDate desc){
    title,
    thumbnail {
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

export default function Home(initialData) {
  const { data: { home, work, contact } } = pageService.getPreviewHook(initialData)()
  const [current, setCurrent] = useState(0);
  const [greeting, setGreeting] = useState(true);
  const imgStyle = {
    borderRadius: '30px'
  }

  return (
    <Layout>
      <NextSeo title={home.title} />
      <Header />
        <LazyMotion features={domAnimation}>
          <m.main
            initial="initial"
            animate="enter"
            exit="exit"
            className="px-5 pb-[3rem] pt-[5rem] min-h-screen flex bg-black text-white/75"
          >
            <section className="w-3/5 bg-gray-900 rounded-lg overflow-hidden block group ">
              {greeting === true ? (
                <m.div variants={fadeDelay} className="text-4xl h-full w-full grid content-center leading-[3rem] ml-5">
                  <BlockContent serializers={{ container: ({ children }) => children }} blocks={home.content} />
                </m.div> 
              ) : (
                <div className='w-full h-full relative'>
                  <div className='absolute opacity-1 text-white/100 z-50 w-full h-full grid content-center justify-center'>
                    <h1 className='text-4xl bold bg-black p-2'>test</h1>
                  </div>
                  <Image
                    image={work[current].image}
                    focalPoint={work[current].image.hotspot}
                    objectSettings="cover"
                    layout="fill"
                    className="opacity-40"
                    alt={work[current].image.alt}
                  />
                </div>
              )}
            </section>
            <section className="w-2/5 grid pl-5 content-center">
                {work?.map((item, i) => {
                  return (
                    <div 
                      key={i} 
                      onMouseEnter={() => (
                        setCurrent(i),
                        setGreeting(false)
                      )}
                      onMouseLeave={() => (
                        setCurrent(0),
                        setGreeting(true)
                      )}
                    >
                      <div className="p-2 border-b flex gap-x-2 border-white text-4xl w-full mb-2">
                        <Image
                            image={item.thumbnail}
                            focalPoint={item.thumbnail.hotspot}
                            className={`w-6 grid content-center`}
                            alt={item.thumbnail.alt}
                          />
                        {item.title}
                      </div>
                    </div>
                  )
                })}
            </section>
              
          </m.main>
        </LazyMotion>
      <Footer contact={contact} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const cms = await pageService.fetchQuery(context)

  return {
    props: { ...cms }
  }
}
