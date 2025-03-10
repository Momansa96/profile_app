import { useState, useEffect } from 'react';
import { AlignRight, } from 'lucide-react';
import { personalDetailsPreset } from '@/preset';

const name = personalDetailsPreset;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector("header");

    const toggleClasses = (element: HTMLElement | null, classes: string[], condition: boolean) => {
      if (!element) return;
      classes.forEach((className) => {
        element.classList.toggle(className, condition);
      });
    };

    const handleScroll = () => {
      toggleClasses(
        header,
        [
          "shadow-xl",
          "dark:sm:bg-slate-900"
        ],
        window.scrollY > 50
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      id='home'
      className="fixed xl:block w-full py-4 lg:px-2 px-4 z-[999] duration-300 bg-slate-300 rounded-lg "
    >
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-2">
        <div className="flex gap-4 items-center">
          <div
            className="bg-primary text-white rounded-full size-10 text-xl grid place-items-center"
          >
            {name.fullName[0]}
          </div>
          <div>
            <h4 className="font-bold text-lg uppercase">{name.fullName}</h4>
            <p className="text-xs">Portfolio</p>
          </div>
        </div>

        {/* Menu desktop */}
        <ul className="gap-10 md:flex hidden hover:*:text-primary *:duration-200">
          <li>
            <a href="#home">Accueil</a>
          </li>
          <li>
            <a href="#about">A propos</a>
          </li>
          <li>
            <a href="#skills"> Mon parcours</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>

        </ul>
        <div className="flex items-center gap-2 ">
          <a href="#contact">
            <button className="px-3 py-2.5  shadow-xl z-10 inline-flex items-center gap-2 w-fit duration-300 border-2 border-gray-600 dark:text-gray-100  text-gray-600 leading-6 dark:bg-slate-800 bg-white  rounded-lg font-bold md:!flex">
              Discutons
            </button>
          </a>

        </div>

        {/* Bouton hamburger pour mobile */}
        <button
          className="block md:hidden"
          onClick={toggleMobileMenu}
        >
          <AlignRight className="w-8" />
        </button>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-gray-200 mx-4 my-1 absolute right-0 top-20 w-[50%] rounded-xl overflow-hidden shadow-lg menu-container">
            <nav aria-label="Mobile Navigation">
              <ul className="flex flex-col gap-6 text-sm bg-gray-100 p-3">
                <li>
                  <a href="#home">Accueil</a>
                </li>
                <li>
                  <a href="#about">A propos</a>
                </li>
                <li>
                  <a href="#skills"> Mon parcours</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        )}

        
      </nav>
    </header>
  );
};

export default Header;
