import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './museum.css';
// import logo from '../assets/logo.png'; // Replace with your logo
import phones from './assets/phones.png'; // Replace with your phone image
// Placeholder images for characters (replace with actual images)
import character1 from './assets/abou_Qassim.jpg';
import character2 from './assets/hannibal.jpg';
import character3 from './assets/Tawhida_Ben_Cheikh.jpg';

const Header = () => {
    return (
        <header style={styles.header}>
          {/* Uncomment and style logo if needed */}
          {/* <div style={styles.logo}>
            <img src={logo} alt="History Hello by Humy" style={{ height: '50px' }} />
          </div> */}
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>متحف التاريخ التونسي</h1> {/* "Tunisian History Museum" */}
          </div>
          {/* <nav style={styles.nav}>
            <a href="#" style={styles.navLink}>جهات الاتصال</a>
            <a href="#" style={styles.navLink}>من نحن</a>
            <a href="#" style={styles.navLink}>للبحث</a>
            <a href="#" style={styles.navLink}>للتعليم</a>
          </nav> */}
        </header>
      );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        backgroundColor: '#e6d8b8', // Aged parchment-like background
        borderBottom: '3px solid #b8860b', // Gold accent for antique feel
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        direction: 'rtl', // RTL for Arabic
      },
      titleContainer: {
        flex: 1,
        textAlign: 'center',
      },
      title: {
        fontFamily: "'Amiri', serif", // Antique Arabic font
        fontSize: '32px',
        fontWeight: '700',
        color: '#4a2c0f', // Deep brown for an aged look
        margin: 0,
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Subtle text shadow
      },
  nav: {
    display: 'flex',
    gap: '25px', // Slightly increased gap for better spacing
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
    fontSize: '18px', // Slightly larger for readability
    fontFamily: "'Tajawal', sans-serif", // Modern Arabic font
  },
};

const MainSection = ({scrollToCharacters}) => {
  return (
    <section style={styles2.section}>
      <div style={styles2.right}>
        <h1 style={styles2.heading}>إحكي مع أي شخصية تونسية من الماضي</h1>
        <p style={styles2.description}>
          تطبيق بالذكاء الصناعي يخليك تتكلم كيما في الحقيقة مع أشخاص تونسيين من التاريخ
        </p>
        <button style={styles2.educatorsButton} onClick={scrollToCharacters}>هيا نبداو</button>
      </div>
      <div style={styles2.left}>
        <img src={phones} alt="هواتف ذكية" style={styles2.phonesImage} />
      </div>
    </section>
  );
};

const styles2 = {
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
    backgroundColor: '#f5f2e9',
    minHeight: '80vh',
    direction: 'rtl', // RTL for Arabic
    flexDirection: 'row-reverse', // Text on right, image on left
  },
  left: {
    flex: 1,
    textAlign: 'center',
  },
  phonesImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  right: {
    flex: 1,
    padding: '0 30px', // Increased padding for better spacing
  },
  heading: {
    fontSize: '52px', // Larger for impact
    fontWeight: '700',
    color: '#4a2c0f', // Deep brown for antique vibe
    marginBottom: '30px',
    fontFamily: "'Amiri', serif", // Antique Arabic font
    lineHeight: '1.3',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Stronger shadow
  },
  description: {
    fontSize: '22px', // Larger for readability
    color: '#6b4e31', // Softer brown
    marginBottom: '40px',
    fontFamily: "'Amiri', serif", // Antique Arabic font
    lineHeight: '1.7',
  },
  educatorsButton: {
    marginTop: '20px',
    padding: '14px 35px',
    backgroundColor: '#b8860b',
    color: '#fff',
    border: '2px solid #4a2c0f',
    borderRadius: '30px',
    fontSize: '20px',
    fontFamily: "'Amiri', serif",
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};


const CharactersSection = () => {
    const navigate = useNavigate();
    const characters = [
      { name: 'أبو القاسم بن محمد الشَّابِّي', image: character1 },
      { name: 'حنبعل', image: character2 },
      { name: 'توحيدة بن الشيخ', image: character3 },
    ];
    const handleCharacterClick = (index) => {
        if (index === 0) { // Navigate only when clicking the first character
            navigate('/chat-hannibal');
        }
    };
  
    return (
      <section style={styles3.section}>
        <h2 style={styles3.heading}>شخصيات من التاريخ التونسي</h2>
        <div style={styles3.charactersContainer}>
        {characters.map((character, index) => (
                    <div key={index} style={styles3.characterCard} onClick={() => handleCharacterClick(index)}>
                        <p style={styles3.characterName}>{character.name}</p>
                        <div style={styles3.bubble}>
                            <img src={character.image} alt={character.name} style={styles3.characterImage} />
                        </div>
                    </div>
                ))}
   
        </div>
      </section>
    );
  };

  const styles3 = {
    section: {
      padding: '80px 20px', // Increased padding for a longer section
      backgroundColor: '#e6d8b8', // Antique parchment
      textAlign: 'center',
      direction: 'rtl', // RTL for Arabic
      minHeight: '100vh', // Longer section height
    },
    heading: {
      fontSize: '44px', // Slightly larger for prominence
      fontWeight: '700',
      color: '#4a2c0f',
      marginBottom: '60px', // More space below heading
      fontFamily: "'Amiri', serif",
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
    },
    charactersContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '60px', // Increased gap for larger bubbles
      flexWrap: 'wrap', // Responsive on smaller screens
    },
    characterCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px', // Fixed width for consistency
      },
      characterName: {
        marginBottom: '20px', // Space between name and bubble
        fontSize: '26px', // Larger for prominence
        fontFamily: "'Amiri', serif",
        color: '#4a2c0f', // Darker brown for contrast
        fontWeight: '600',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // Subtle shadow
      },
      bubble: {
        width: '250px', // Larger bubble
        height: '250px', // Larger bubble
        backgroundColor: '#f4e8c1', // Lighter parchment
        borderRadius: '50%', // Circular shape
        border: '6px solid #b8860b', // Thicker gold frame
        overflow: 'hidden',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)', // Deeper shadow
        transition: 'transform 0.3s', // Hover effect
      },
      characterImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // Ensures image fills bubble
      },
  // bubble:hover {
  //   transform: scale(1.1);
  // }
  }


const Museum = () => {
  const charactersRef = useRef(null);

  const scrollToCharacters = () => {
    charactersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Header />
      <MainSection scrollToCharacters={scrollToCharacters} />
      <div ref={charactersRef}>
        <CharactersSection />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Museum;