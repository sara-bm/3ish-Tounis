import React, { useState } from 'react';
import './Saletna.css';
import flashback from "./image/flachback.jpeg";
import maistro from "./image/maistro.jpeg";
import layam from "./image/layam.jpeg";
import maktoub from "./image/Maktoub.jpg";
import nsibtilaziza from "./image/nsibtilaziza.jpeg";
import mnametarousia from "./image/mnametarousia.jpeg";
import khotabalbeb from "./image/khotabalbeb.jpeg";
import choflihal from "./image/choflihal.jpeg";
import dawama from "./image/dawama.jpeg";
import naouretlhwa from "./image/naouretlhwa.jpeg";
import awledmoufida from "./image/awledmoufida.jpeg";
import nouba from "./image/nouba.jpeg";
import tajlhadhra from "./image/tajlhadhra.jpeg";
import foundou from "./image/foundou.jpeg";
import sbouai from "./image/sbouai.jpeg"
import fathi from "./image/fathi.jpeg"
import mouna from "./image/mouna.jpeg"
import kamal from "./image/kamal.jpeg"

export default function Saletna() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEnglish, setIsEnglish] = useState(false);
  const [translatedDescriptions, setTranslatedDescriptions] = useState({});
  const [recommendedSeries, setRecommendedSeries] = useState([
    { id: 1, title: 'فلاشباك', img: flashback },
    { id: 2, title: 'المايسترو', img: maistro },
    { id: 3, title: 'ليام', img: layam },
  ]);

    const seriesList = [
    {
      "title": "مكتوب",
      "titleEnglish": "Maktoub",
      "description": "دراما تحكي على خالد، شاب يعاني في الحب والمكتوب والصعوبات الاجتماعية في تونس اليوم. المسلسل يستكشف علاش الفلوس والسلطة والطموحات الشخصية يتقاطعو.",
      "traduction": "A drama about Khaled, a young man navigating love, fate, and social struggles in modern Tunisia. The series explores the intersections of wealth, power, and personal ambitions.",
      "genre": ["دراما", "رومانسي"],
      "img": maktoub
    },
    {
      "title": "نسيبتي العزيزة",
      "titleEnglish": "Nsibti L3ziza",
      "description": "سيتكوم هزلي على عايلة تونسية تتعامل مع الحماة الغريبة، سوء الفهم الثقافي، والمشاكل اليومية، الكل بطريقة مضحكة.",
      "traduction": "A comedic sitcom centered around a Tunisian family dealing with their eccentric in-laws, cultural misunderstandings, and everyday life struggles, leading to hilarious situations.",
      "genre": ["كوميديا", "عائلي"],
      "img": nsibtilaziza
    },
    {
      "title": "منامة عروسة",
      "titleEnglish": "Mnamet 3rousia",
      "description": "سلسلة فكاهية خفيفة تحكي على عروسة المستقبل وهي تواجه ضغوط العائلة، تعقيدات الحب، والتقاليد.",
      "traduction": "A lighthearted comedy series about a young bride-to-be experiencing pre-wedding struggles, as she faces family pressures, love complications, and cultural traditions.",
      "genre": ["كوميديا", "دراما"],
      "img": mnametarousia
    },
    {
      "title": "الخطاب عالباب",
      "titleEnglish": "Lkhotab 3albeb",
      "description": "كوميديا درامية تحكي على العرسان في تونس، كيفاش يحاولو يربحو قلوب البنات، بين العادات والتقاليد والعصرنة.",
      "traduction": "A romantic comedy-drama revolving around matchmaking and love in Tunisian society. Young men try to win the hearts of potential brides, exploring traditions and modernity.",
      "genre": ["كوميديا", "رومانسي", "دراما"],
      "img": khotabalbeb
    },
    {
      "title": "شوفلي حل",
      "titleEnglish": "Choufli Hal",
      "description": "سيتكوم كلاسيكي تونسي يحكي على طبيب نفساني ومرضاه الغريبين، بمواقف مضحكة ولحظات عائلية، واحد من أكثر المسلسلات المحبوبة.",
      "traduction": "A cult classic Tunisian sitcom that follows the daily life of a psychiatrist and his quirky patients. The humorous situations and family moments make it one of the most beloved series.",
      "genre": ["كوميديا", "سيتكوم"],
      "img": choflihal
    },
    {
      "title": "دوامة",
      "titleEnglish": "Dawama",
      "description": "دراما مشوقة تحكي على أسرار وخيانات وصراعات السلطة داخل عايلة تونسية من الطبقة الراقية، تمس الحب، الانتقام، والمصير.",
      "traduction": "A thrilling drama that unravels secrets, betrayals, and power struggles in a high-class Tunisian family. It delves into love, revenge, and destiny.",
      "genre": ["دراما", "تشويق"],
      "img": dawama
    },
    {
      "title": "ليام",
      "titleEnglish": "Layem",
      "description": "دراما اجتماعية عميقة تحكي على الحب والخيانة، والعلاقات المعقدة بين مجموعة أصدقاء يواجهو مشاكل المجتمع والحياة الشخصية.",
      "traduction": "A deep social drama that portrays the struggles of love and betrayal, following the complex relationships of a group of friends facing societal and personal conflicts.",
      "genre": ["دراما", "رومانسي"],
      "img": layam
    },
    {
      "title": "ناعورة الهوى",
      "titleEnglish": "Naouret El Hawa",
      "description": "دراما رومانسية تحكي على زوج شاب يواجه معارضة العايلة والصعوبات المالية، مسلسل يحكي على الحب والتضحية والصبر.",
      "traduction": "A romantic drama that tells the story of a young couple facing family opposition and financial struggles. The series captures love, sacrifice, and resilience.",
      "genre": ["دراما", "رومانسي"],
      "img": naouretlhwa
    },
    {
      "title": "أولاد مفيدة",
      "titleEnglish": "Awled Moufida",
      "description": "دراما قوية تحكي على أم تحاول تحمي ولادها من مخاطر الشارع، الجريمة، والفساد، وتتناول قضايا اجتماعية وأخلاقية في تونس.",
      "traduction": "A gripping drama about a mother trying to protect her sons from the dangers of the streets, crime, and corruption, highlighting social and moral dilemmas in Tunisia.",
      "genre": ["دراما", "جريمة"],
      "img": awledmoufida
    },
    {
      "title": "المايسترو",
      "titleEnglish": "El Maestro",
      "description": "دراما مؤثرة تحكي على أستاذ موسيقى يساعد شباب في إصلاحية، يوري كيفاش الفن ينجم يغير المصير ويخلق الأمل.",
      "traduction": "A powerful drama about a music teacher who mentors troubled students in a juvenile detention center, showing the impact of art and hope in difficult circumstances.",
      "genre": ["دراما", "اجتماعي"],
      "img": maistro
    },
    {
      "title": "نوبة",
      "titleEnglish": "Nouba",
      "description": "دراما موسيقية تدور في الماضي التونسي، تستعرض قصص حب، النوستالجيا، وموسيقى 'النوبة' اللي تجمع القديم بالجديد.",
      "traduction": "A musical drama set in Tunisia’s past, exploring love stories, nostalgia, and the traditional 'Nouba' music scene, bringing old and new generations together.",
      "genre": ["دراما", "موسيقي", "تاريخي"],
      "img": nouba
    },
    {
      "title": "تاج الحاضرة",
      "titleEnglish": "Tej El Hadhra",
      "description": "دراما تاريخية تصور تونس في القرن 19، تركز على الصراعات السياسية، الحب الممنوع، والمؤامرات داخل القصر.",
      "traduction": "A historical drama depicting life in Tunisia during the 19th century, focusing on power struggles, forbidden love, and political intrigue within the royal court.",
      "genre": ["دراما", "تاريخي"],
      "img": tajlhadhra
    },
    {
      "title": "فلاشباك",
      "titleEnglish": "Flashback",
      "description": "دراما نفسية غامضة تتبع محقق يحاول يكشف مؤامرة خفية وهو يعاني من صدمات الماضي وذكريات ترجعله.",
      "traduction": "A dark psychological drama following a detective trying to uncover a hidden conspiracy while dealing with personal trauma and flashbacks from his past.",
      "genre": ["دراما", "تشويق", "جريمة"],
      "img": flashback
    },
    {
      "title": "الفوندو",
      "titleEnglish": "El Foundou",
      "description": "مسلسل درامي يحكي على الظلم والانتقام، يتبع شاب مظلوم تم اتهامه في قضية باطلة، وبعد سنوات يرجع باش ياخذ حقه.",
      "traduction": "A dramatic series exploring injustice and revenge, following the life of a young man wrongly accused of a crime, who later seeks justice and redemption.",
      "genre": ["دراما", "جريمة"],
      "img": foundou
    }
  ];

  // Define the fetchRecommendations function
  const fetchRecommendations = async (query) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/mousalsel-recommend?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log("User output:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
      return null;
    }
  };

  // Handle search button click
  const handleSearchClick = async () => {
    console.log("User query:", searchTerm); // Print the query to the console
    if (searchTerm) {
      const recommendation = await fetchRecommendations(searchTerm);
      if (recommendation) {
        setRecommendedSeries([{ id: 1, title: recommendation.title }]); // Update with the correct image
      }
    } else {
      // Reset to default recommendations if the search term is empty
      setRecommendedSeries([
        { id: 1, title: 'فلاشباك', img: flashback },
        { id: 2, title: 'المايسترو', img: maistro },
        { id: 3, title: 'ليام', img: layam },
      ]);
    }
  };

  const translateDescription = async (description, toEnglish) => {
    try {
      const response = await fetch('http://10.2.1.130:10000/tn_2_en', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: description })
      });
      const data = await response.json();
      return data.translation;
    } catch (error) {
      console.error("Translation failed", error);
      return description;
    }
  };

  const toggleLanguage = async () => {
    setIsEnglish(!isEnglish);

    const updatedDescriptions = {};
    for (const series of seriesList) {
      if (isEnglish) {
        updatedDescriptions[series.title] = await translateDescription(series.traduction, false);
        // updatedDescriptions[series.title] = await translateDescription(series.titleEnglish, false);

      } else {
        updatedDescriptions[series.title] = await translateDescription(series.description, true);
        // updatedDescriptions[series.title] = await translateDescription(series.title, true);

      }
    }
    setTranslatedDescriptions(updatedDescriptions);
  };

  const filteredSeries = seriesList.filter((series) =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [chatMessage, setChatMessage] = useState(''); // State for chat input

  // const handleChatSubmit = () => {
  //   console.log("Chat message:", chatMessage); // Handle the chat message submission
  //   setChatMessage(''); // Clear the input after submission
  // };
    // Function to handle chat submission
    const handleChatSubmit = async () => {
      console.log("Chat message:", chatMessage);
      if (chatMessage) {
        const recommendation = await fetchRecommendations(chatMessage);
        if (recommendation && recommendation.title) {
          // Find the series in the seriesList that matches the recommended title
          const recommendedSeriesItem = seriesList.find(
            (series) => series.title === recommendation.title || series.titleEnglish === recommendation.title
          );
  
          if (recommendedSeriesItem) {
            // Update the recommended series list with the new recommendation
            setRecommendedSeries([
              {
                id: recommendedSeries.length + 1, // Generate a new ID
                title: recommendedSeriesItem.title,
                img: recommendedSeriesItem.img,
              },
            ]);
          }
        }
      }
      setChatMessage(''); // Clear the input after submission
    };

  return (
    <div className="Mar7ba bik fi Saletna">
      <div className="header">
        <h1>Saletna</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Lawej bel arbi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term as the user types
            className="search-input"
          />
          <button onClick={handleSearchClick} className="search-button">
            <i className="fa fa-search search-icon"></i> {/* Add a search icon */}
          </button>
        </div>
      </div>

       {/* Chat Bar */}
       <div className="chat-bar">
        <input
          type="text"
          placeholder="Es2lni btounsi ..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleChatSubmit} className="chat-button">
          click
        </button>
      </div>
      <h2>Recommended Series</h2>
      <h3> تفرج في الي يواتيك</h3>
      <br></br>

      <div className="recommended-series">
        {recommendedSeries.map((series) => (
          <div key={series.id} className="series-card">
            <img src={series.img} alt={series.title} />
            <p>{series.title}</p>
          </div>
        ))}
      </div>
      <h2>Most Popular Characters</h2>
        <div className="character-container">
          <div className="character">
            <img src={sbouai} alt="Sbouai Character" />
            <p className="character-name">Soufien Chaari</p>
          </div>
          <div className="character">
            <img src={fathi} alt="Fathi Character" />
            <p className="character-name">Fathi Hadaoui</p>
          </div>
          <div className="character">
            <img src={mouna} alt="Mouna Character" />
            <p className="character-name">Mouna Nourdin</p>
          </div>
          <div className="character">
            <img src={kamal} alt="Kamal Character" />
            <p className="character-name">Kamel touiti</p>
          </div>
        </div>


      
  


      <h2>All Series</h2>
      <h3>مسلسلاتنا التونسية</h3>
      <br></br>
      <div className="series-list">
        {filteredSeries.map((series, index) => (
          <div key={index} className="series-card">
            <img src={series.img} alt={series.title} />
            <p>{series.title}</p>
            <p>{isEnglish ? translatedDescriptions[series.titleEnglish] || series.traduction : translatedDescriptions[series.title] || series.description}</p>
            <div>
              {series.genre.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={toggleLanguage}>
        {isEnglish ? 'Show in Arabic' : 'Show in English'}
      </button>
    </div>
  );
}