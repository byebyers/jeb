import FancyLink from '@/components/fancyLink'

export default function Footer({contact}) {
  return (
    <footer className="w-full h-[3.5rem] px-5 bg-black">
        <div className="text-white py-4 space-x-6">
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