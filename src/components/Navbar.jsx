import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToHome = () => {
    if (currentPath !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`); // Ensures navigation if not already on home
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className={scrollPosition > 100 || currentPath !== "/" ? 'navbar nav-scrolled' : 'navbar'}>
      <h3 onClick={goToHome}>SB Fitzz</h3>
      <ul>
        <li onClick={goToHome}>Home</li>
        <li onClick={() => scrollToSection('about')}>About</li>
        <li onClick={() => scrollToSection('search')}>Search</li>
      </ul>
    </div>
  );
};

export default Navbar;
