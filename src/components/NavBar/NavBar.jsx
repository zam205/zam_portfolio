import React, { useEffect, useRef, useState } from 'react'
import './styles/NavBar.css';
import { Link } from 'react-scroll';
import { useMediaQuery } from 'react-responsive';
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function NavBar() {

  // const divLinks = useRef(null);
  const boxLinksRef = useRef(null);

  const [activeScrolling, setActiveScolling] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  // const [activeMenu, setActiveMenu] = useState(calcMenu(window.innerWidth));

  // const activeMenu = useMediaQuery({ query: '(max-width: 600px)' });

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      e.preventDefault();

      if (window.scrollY === 0) {
        setActiveScolling('');
      } else {
        setActiveScolling('bg-neutral-900 bg-opacity-60'); // border-b-[1px] border-b-neutral-600
      }
    })
  }, [])

  // useEffect(() => {
  //   setActiveMenu(calcMenu(window.innerWidth));

  //   // تحديث الـ fov عند تغيير عرض النافذة
  //   const handleResize = () => {
  //     setActiveMenu(calcMenu(window.innerWidth));
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // const handleScroll = (id) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //     window.location.hash = id;
  //   }
  // };

  const handleClickOutside = (event) => {
    // if (statusClick) {
    //   return event.preventDefault();
    // } else {
      if (boxLinksRef.current && !boxLinksRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    // }
  }


  return (
    <div className={`nav-bar ${activeScrolling}`}>
      <div className="logo">
        <span className='text-4xl'>Z</span>
        am
      </div>
      {
        true && (
          <div className={`links scroll-smooth`}>
            <Link to="section-one" smooth={true} duration={500} spy={true} offset={0}
              activeClass="active">Home</Link>
            <Link to="section-two" smooth={true} duration={500} spy={true} offset={0}
              activeClass="active">About</Link>
            <Link to="section-three" smooth={true} duration={500} spy={true} offset={0}
              activeClass="active">Service</Link>
            <Link to="section-four" smooth={true} duration={500} spy={true} offset={0}
              activeClass="active">Skills</Link>
            <Link to="section-five" smooth={true} duration={500} spy={true} offset={0}
              activeClass="active">contact</Link>
          </div>
        )
      }

        <button className='btn-menu' onClick={() => setOpenMenu(!openMenu)} >
          { !openMenu ? (
            <IoMenu className='text-white text-3xl'/>
          ) : (
            <IoMdClose className='text-red-400 text-3xl' />
          )}
        </button>

        {
          openMenu && (
            <div className="menu-links" onClick={handleClickOutside}>
              <div className="box-links" ref={boxLinksRef}>
              <Link to="section-one" smooth={true} duration={500} spy={true} offset={0}
                activeClass="active">Home</Link>
              <Link to="section-two" smooth={true} duration={500} spy={true} offset={0}
                activeClass="active">About</Link>
              <Link to="section-three" smooth={true} duration={500} spy={true} offset={0}
                activeClass="active">Service</Link>
              <Link to="section-four" smooth={true} duration={500} spy={true} offset={0}
                activeClass="active">Skills</Link>
              <Link to="section-five" smooth={true} duration={500} spy={true} offset={0}
                activeClass="active">contact</Link>
              </div>
            </div>
          )
        }
    </div>
  )
}

/*

  // useEffect(() => {
  //   [...divLinks.current.children].forEach((target) => {
  //     target.addEventListener('click', (e) => {
  //       e.preventDefault();
  
  //       // الحصول على القسم المستهدف
  //       const sectionId = target.getAttribute('href').substring(1);
  //       const section = document.getElementById(sectionId);
  
  //       if (section) {
  //         // تحديد موقع القسم الصحيح
  //         const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
  
  //         console.log('sectionTop', sectionTop);

  //         // التمرير السلس إلى الموقع
  //         window.scrollTo({
  //           top: sectionTop,
  //           behavior: 'smooth',
  //         });
  //       }
  //     });
  //   });
  // }, []);
  
  // const handleScroll = (section) => {
  //   const sectionElemnt = document.getElementById(section);

  //   console.log(section);

  //   console.log('sectionElemnt', sectionElemnt);

  //   sectionElemnt.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(() => {
  //   // التأكد من أنه تم تحميل DOM بالكامل قبل تنفيذ التمرير
  //   window.scrollTo({
  //     top: 500,
  //     behavior: 'smooth',  // التمرير السلس
  //   });
  // }, []);

*/