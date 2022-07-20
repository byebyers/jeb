import FancyLink from '@/components/fancyLink'

export default function Footer({contact}) {
  return (
    <footer className="absolute w-full bottom-0 px-5">
        <div className="border- text-white py-4 space-x-6">
          {contact.socials.map((item, i) => {
            return (
              <span key={i}>
                <FancyLink destination={item.url} a11yText={`Navigate to the ${item.title}`} label={item.title} extraClasses="hover:underline no-underline" />
              </span>
            )
          })}
        </div>
    </footer>
  )
}