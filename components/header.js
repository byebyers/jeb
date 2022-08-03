import FancyLink from '@/components/fancyLink'
import Marquee from "react-smooth-marquee"
//import Container from '@/components/container'

export default function Header({butterBar, route}) {
  const runCallback = (cb) => {
    return cb();
  };
  
  return (
    <header className="p-5 absolute z-50 w-full font-bold text-base md:text-4xl text-white">
        <div className="flex border-b border-white">
          <FancyLink destination="/" a11yText="Navigate to the home page" label="Jacob Byers" extraClasses="mb-1 no-underline md:mb-0" />

          <div 
            className="mx-auto w-[40rem] ticker-wrapper hidden md:block text-center text-3xl  font-light "
          >
             <Marquee velocity={0.04}>
             {
                runCallback(() => {
                  const row = [];
                  for (var i = 0; i < 28; i++) {
                    row.push(<span key={i}>{butterBar}&nbsp;<em>—</em>&nbsp;</span>);
                  }
                  return row;
                })
              }
             
             </Marquee>
            
          </div>

          <nav className="flex ml-auto  space-x-6 md:w-auto">
            <FancyLink destination="/" a11yText="Navigate to the home page" label="Work" extraClasses={`${route === '/' ? 'bigDot' : ''} no-underline`} />
            <FancyLink destination="/about" a11yText="Navigate to the about page" label="About" extraClasses={`${route === '/about' ? 'bigDot' : ''} no-underline`} />
          
            <a href={`mailto:byers.jacob@gmail.com`} className="no-underline hover:text-gray-500 focus:text-gray-500">Contact</a>
          </nav>
        </div>
    </header>
  )
}