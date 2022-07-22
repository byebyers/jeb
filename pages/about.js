import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'
import Image from '@/components/image'
import { fade, fadeDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import SanityPageService from '@/services/sanityPageService'
import BlockContent from '@sanity/block-content-to-react'

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
  }
}`

const pageService = new SanityPageService(query)

export default function About(initialData) {
  const { data: { about, contact } } = pageService.getPreviewHook(initialData)()

  return (
    <Layout>
      <NextSeo title={about.title} />

      <Header />

      <LazyMotion features={domAnimation}>
        <m.main
          initial="initial"
          animate="enter"
          exit="exit"
          className="px-5 pt-[5rem] min-h-screen grid bg-black text-white"
        >
          <m.section 
            variants={fade}
            className="relative min-h-[calc(100vh-8rem)]" 
          >
            <m.div variants={fadeDelay} className="text-4xl h-full w-3/5 grid content-center leading-[3rem] ml-5">
              <BlockContent serializers={{ container: ({ children }) => children }} blocks={about.heroText} />
            </m.div>
            <m.div class="absolute bottom-5 opacity-75 right-5">
              <Image
                image={about.heroImage}
                focalPoint={about.heroImage.hotspot}
                className="w-[30rem]"
                alt={about.heroImage.alt}
              />
            </m.div>
          </m.section>
          <m.section>
            <h2>Services</h2>
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
