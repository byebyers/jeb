import FancyLink from '@/components/fancyLink'
//import Container from '@/components/container'

export default function Header() {
  return (
    <header className="p-5 absolute w-full font-bold text-4xl text-white">
        <div className="flex flex-wrap">
          <FancyLink destination="/" a11yText="Navigate to the home page" label="Jacob Byers" extraClasses="mb-1 no-underline md:mb-0" />

          <nav className="ml-auto flex space-x-6 w-full md:w-auto ">
            <FancyLink destination="/" a11yText="Navigate to the home page" label="Work" extraClasses="hover:underline no-underline" />

            <FancyLink destination="/about" a11yText="Navigate to the about page" label="About" extraClasses="hover:underline no-underline" />
          </nav>
        </div>
    </header>
  )
}