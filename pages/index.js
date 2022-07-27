import { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import Link from 'next/link'
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
    category,
    slug {
      current
    },
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
    orientation,
    bgColor
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

export default function Home(initialData) {
  const { data: { home, work, contact, menu } } = pageService.getPreviewHook(initialData)()
  const [current, setCurrent] = useState(0);
  const [greeting, setGreeting] = useState(true);
  const imgStyle = {
    borderRadius: '30px'
  }

  return (
    <Layout>
      <NextSeo title={home.title} />
      <Header 
        butterBar={menu.butter}
      />
        <LazyMotion features={domAnimation}>
          <m.main
            initial="initial"
            animate="enter"
            exit="exit"
            className="px-5 pt-[5rem] min-h-[calc(100vh-3.5rem)] flex text-white"
          >
            <m.section 
              className="w-3/5 bg-gray-900 rounded-lg overflow-hidden block group " 
              variants={fade}
            >
              {greeting === true ? (
                <m.div variants={fadeDelay} className="text-4xl h-full w-full grid content-center leading-[3rem] ml-5">
                  <BlockContent serializers={{ container: ({ children }) => children }} blocks={home.content} />
                </m.div> 
              ) : (
                <div className='w-full h-full relative'>
                  <div className='absolute opacity-100 z-40 w-full h-full grid content-center justify-center'>
                    <Image
                      image={work[current].logo}
                      focalPoint={work[current].logo.hotspot}
                      className={`${work[current].orientation === 'banner' ? 'w-[30rem]' : 'button' ? 'w-[25rem]' : 'w-[25rem]'}`}
                      alt={work[current].logo.alt}
                    />
                  </div>
                  {work[current].category === 'story' && (
                    <div className='absolute w-full h-full grid justify-end content-around'>
                      <div className='bg-white p-2 translate-x-8 rotate-90 text-black'>Case Study</div>
                      <div></div>
                    </div>
                  )}
                  <m.div 
                    className={`${work[current].bgColor === true ? 'bg-white' : ''} w-full h-full`}
                    variants={fade}
                  >
                    <Image
                      image={work[current].image}
                      focalPoint={work[current].image.hotspot}
                      objectSettings="cover"
                      layout="fill"
                      className="opacity-20"
                      alt={work[current].image.alt}
                    />
                  </m.div>
                </div>
              )}
            </m.section>
            <m.section className="w-2/5 grid pl-5 content-center" variants={fade}>
                {work?.map((item, i) => {
                  return (
                    <Link href={`/work/${item.slug.current}`} className="hover:cursor-pointer">
                      <m.div 
                        key={i} 
                        whileHover={{ scale: 1.05, transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] }}} 
                        whileTap={{ scale: 0.8, transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] }}} 
                        className="hover:cursor-pointer"
                      >
                        <m.div 
                          className="p-2 border-b flex gap-x-2 border-white text-4xl w-full mb-2 hover:cursor-pointer"
                          variants={scaleDelay}
                          onMouseEnter={() => (
                            setCurrent(i),
                            setGreeting(false)
                          )}
                          onMouseLeave={() => (
                            setCurrent(0),
                            setGreeting(true)
                          )}
                        >
                        
                          <Image
                              image={item.thumbnail}
                              focalPoint={item.thumbnail.hotspot}
                              className={`w-6 grid content-center`}
                              alt={item.thumbnail.alt}
                            />
                          {item.title}
                        </m.div>
                      </m.div>
                    </Link>
                  )
                })}
            </m.section>
              
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
