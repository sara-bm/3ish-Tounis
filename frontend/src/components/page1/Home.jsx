import React from "react";
import "./Home.css";
import videoBg from './assets/background.mp4.mov';
import logo from './assets/logo.png';
import clothes from './assets/clothes.jpg';
import food from './assets/food.jpg';
import jmal from './assets/jmal.jpg';
import museum  from "./assets/museum.webp";

const Home = () => {
 


  return (
      <div>
        <div class="hero">
            <div className='main'>
            <div className="overlay"></div>
            <video src={videoBg} autoPlay loop muted />
            <div className="content">
          
                    <h1>Welcome to Tunisia</h1>
                    <p>Discover the rich culture and heritage of our beautiful country!</p>
                    <a href="#contes" class="btn">Explore</a>
            </div>
          
        </div>
            <nav>
                <h2 class="logo">
                    <img src={logo} alt="" width="50"/>
                </h2>
                  
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="#rules">Service</a></li>
        
                </ul>
            </nav>

        </div>     

        <section id="contes">
            <h2>Marahba! "Welcome"</h2>
            <div class="contes-content">
                <div class="contes-card">
                    <img src={clothes} class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">El Marro: Tunisia’s Timeless Closet</h4>
                        <p class="card-info">El Marro, blends tradition and elegance, featuring intricate carvings and rich wood, preserving heritage while adding authentic charm to any space.</p>
                        <button class="card-btn"><a href="conte1.html"></a></button>
                    </div>
                </div>
                <div class="contes-card">
                    <img src={food} class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">Koujinetna: The Heart of Tunisian Flavor</h4>
                        <p class="card-info"> Koujinetna, our Tunisian kitchen, is where tradition and spices blend, creating rich, authentic flavors that bring people together with every meal.</p>
                        <button class="card-btn"><a href="conte1.html"></a></button>
                    </div>
                </div>
                <div class="contes-card">
                    <img src={museum} class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">Tarikhna: The Soul of Tunisia's Legacy</h4>
                        <p class="card-info">Tarikhna, our history, is a vibrant tapestry of ancient cultures, inspiring legends, and timeless traditions that shaped Tunisia’s identity.</p>
                        <button class="card-btn"><a href="conte1.html"></a></button>
                    </div>
                </div>
                <div class="contes-card">
                    <img src={jmal} class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">Jawna: The Heartbeat of Tunisian Entertainment</h4>
                        <p class="card-info">Jawna is where fun and tradition collide. Whether it’s music, dance, or lively gatherings, it’s the spirit of Tunisia coming alive. From the vibrant streets to cozy corners, experience the joy and energy that fills every moment of our entertainment culture.</p>
                        <button class="card-btn"><a href="conte1.html"></a></button>
                    </div>
                </div>
            </div>
        </section>
    
        <footer>
            <p>&copy; 2025 3ish Tounsi. Tous droits réservés.</p>
        </footer>
       
    </div>
  );
};


export default Home;
