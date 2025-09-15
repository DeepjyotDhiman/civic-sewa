import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // This links the separate CSS file

// --- CORRECT IMAGE IMPORTS ---
// This is the standard React way to use images from within the 'src' folder.
// The path '../' goes up one level from 'pages' to 'src', then into 'assets'.
import GujaratBackgroundImage from '../assets/GUJARAT.jpg';
import streetsIcon from '../assets/icons/streets.png';
import roadsIcon from '../assets/icons/roads.png';
import electricityIcon from '../assets/icons/electricity.png';
import sewageIcon from '../assets/icons/sewage.png';
import forestIcon from '../assets/icons/forest.png';
import garbageIcon from '../assets/icons/garbage.png';

// --- Language Translations Data (Updated for Gujarat and 6 categories) ---
const languageContent = {
  en: {
    heroTitle: "Civic Sewa",
    heroDescription: "Your Voice for a Better Community. Report local issues, track their progress, and help build a cleaner, safer Gujarat.",
    citizenButton: "For Citizens",
    authorityButton: "For Authorities",
    knowMoreButton: "Know More ↓",
    aboutTitle: "What is Civic Sewa?",
    aboutDescription1: "Civic Sewa is a modern, crowdsourced platform connecting the citizens of Gujarat directly with municipal authorities. We empower you to report non-emergency civic issues—from potholes and broken streetlights to garbage overflow—and see them get resolved.",
    aboutDescription2: "Our mission is to foster transparency, accountability, and collaboration to make our state better, one reported issue at a time.",
    catStreets: "Streets",
    catRoads: "Roads",
    catElectricity: "Electricity",
    catSewage: "Sewage",
    catForest: "Forest",
    catGarbage: "Garbage",
  },
  gu: {
    heroTitle: "સિવિક સેવા",
    heroDescription: "એક સારા સમુદાય માટે તમારો અવાજ. સ્થાનિક સમસ્યાઓની જાણ કરો, તેમની પ્રગતિને ટ્રેક કરો અને સ્વચ્છ, સુરક્ષિત ગુજરાત બનાવવામાં મદદ કરો.",
    citizenButton: "નાગરિકો માટે",
    authorityButton: "સત્તાધીશો માટે",
    knowMoreButton: "વધુ જાણો ↓",
    aboutTitle: "સિવિક સેવા શું છે?",
    aboutDescription1: "સિવિક સેવા એ ગુજરાતના નાગરિકોને સીધા મ્યુનિસિપલ સત્તાવાળાઓ સાથે જોડતું એક આધુનિક, ક્રાઉડસોર્સ્ડ પ્લેટફોર્મ છે. અમે તમને બિન-ઇમરજન્સી નાગરિક સમસ્યાઓ—ખાડા, તૂટેલી સ્ટ્રીટલાઇટથી લઈને કચરાના ઓવરફ્લો સુધી—ની જાણ કરવા અને તેનું નિરાકરણ જોવા માટે સશક્ત બનાવીએ છીએ.",
    aboutDescription2: "અમારું લક્ષ્ય પારદર્શિતા, જવાબદારી અને સહયોગને પ્રોત્સાહન આપવાનું છે જેથી આપણું રાજ્ય વધુ સારું બને, એક સમયે એક સમસ્યાની જાણ કરીને.",
    catStreets: "શેરીઓ",
    catRoads: "રસ્તાઓ",
    catElectricity: "વીજળી",
    catSewage: "ગટર",
    catForest: "વન",
    catGarbage: "કચરો",
  },
  hi: {
    heroTitle: "सिविक सेवा",
    heroDescription: "एक बेहतर समुदाय के लिए आपकी आवाज़। स्थानीय मुद्दों की रिपोर्ट करें, उनकी प्रगति को ट्रैक करें और एक स्वच्छ, सुरक्षित गुजरात बनाने में मदद करें।",
    citizenButton: "नागरिकों के लिए",
    authorityButton: "अधिकारियों के लिए",
    knowMoreButton: "और जानें ↓",
    aboutTitle: "सिविक सेवा क्या है?",
    aboutDescription1: "सिविक सेवा गुजरात के नागरिकों को सीधे नगर निगम के अधिकारियों से जोड़ने वाला एक आधुनिक, क्राउडसोर्स्ड प्लेटफॉर्म है। हम आपको गैर-आपातकालीन नागरिक मुद्दों—गड्ढों, टूटी स्ट्रीटलाइट्स से लेकर कचरे के ओवरफ्लो तक—की रिपोर्ट करने और उनका समाधान देखने के लिए सशक्त बनाते हैं।",
    aboutDescription2: "हमारा मिशन पारदर्शिता, जवाबदेही और सहयोग को बढ़ावा देना है ताकि हमारा राज्य बेहतर बन सके, एक समय में एक रिपोर्ट किए गए मुद्दे के साथ।",
    catStreets: "गलियां",
    catRoads: "सड़कें",
    catElectricity: "बिजली",
    catSewage: "सीवेज",
    catForest: "वन",
    catGarbage: "कचरा",
  },
};

const CategoryIcon = ({ label, iconSrc }) => (
  <div className="category-icon">
    <img src={iconSrc} alt={label} className="icon-image" />
    <span className="icon-label">{label}</span>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const text = languageContent[language];

  const handleScrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage-wrapper">
      <section
        className="hero-section"
        // The background image is now applied using this inline style.
        // React replaces 'GujaratBackgroundImage' with the correct public path.
        style={{ backgroundImage: `url(${GujaratBackgroundImage})` }}
      >
        <div className="language-switcher">
          <button onClick={() => setLanguage('en')} className={`lang-btn ${language === 'en' ? 'active' : ''}`}>English</button>
          <button onClick={() => setLanguage('hi')} className={`lang-btn ${language === 'hi' ? 'active' : ''}`}>हिन्दी</button>
          <button onClick={() => setLanguage('gu')} className={`lang-btn ${language === 'gu' ? 'active' : ''}`}>ગુજરાતી</button>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{text.heroTitle}</h1>
          <p className="hero-description">{text.heroDescription}</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/login')} className="hero-btn primary">{text.citizenButton}</button>
            <button onClick={() => navigate('/authority')} className="hero-btn secondary">{text.authorityButton}</button>
          </div>
          <button onClick={handleScrollToAbout} className="know-more-btn">{text.knowMoreButton}</button>
        </div>
      </section>

      <section id="about-section" className="about-section">
        <div className="about-container">
          <div className="about-left">
            <div className="category-grid">
              {/* We now pass the imported image variables to the component */}
              <CategoryIcon label={text.catStreets} iconSrc={streetsIcon} />
              <CategoryIcon label={text.catRoads} iconSrc={roadsIcon} />
              <CategoryIcon label={text.catElectricity} iconSrc={electricityIcon} />
              <CategoryIcon label={text.catSewage} iconSrc={sewageIcon} />
              <CategoryIcon label={text.catForest} iconSrc={forestIcon} />
              <CategoryIcon label={text.catGarbage} iconSrc={garbageIcon} />
            </div>
          </div>
          <div className="about-right">
            <h2 className="about-title">{text.aboutTitle}</h2>
            <p className="about-description">{text.aboutDescription1}</p>
            <p className="about-description">{text.aboutDescription2}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;