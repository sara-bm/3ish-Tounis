import React from "react";
import "./Home.css";


const Home = () => {


  const rules = [
    {
      title: "1. Regarder les Contes",
      details: "Explorez les contes fascinants disponibles sur la plateforme.",
      buttonText: "En savoir plus",
      icon: "icons/icon1.svg"
    },
    {
      title: "2. Répondre aux Questions",
      details: "Montrez votre compréhension en répondant aux questions à la fin.",
      buttonText: "Répondre",
      icon: "icons/icon2.svg"
    },
    {
      title: "3. Gagner des Prix",
      details: "Le meilleur lecteur recevra des récompenses spéciales.",
      buttonText: "Participer",
      icon: "icons/icon3.svg"
    }
  ];  


  return (
<div>
        <div class="hero">
            <video autoplay loop muted plays-inline class="background-clip">
                <source src="./assets/background.mp4.mov" type="video/mp4"/>
            </video>
            <nav>
                <h2 class="logo">
                    <img src="./assets/logo.png" alt="Compétition Logo" width="50"/>
                </h2>
                  
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="#rules">Règles</a></li>
                    <li><a href="#price">Prices</a></li>
                </ul>
            </nav>
            <header>
                <div class="header-content">
                 <h1>Bienvenue à la Compétition de Lecture</h1>
                 <p>Encourageons nos jeunes lecteurs à découvrir le plaisir de la lecture !</p>
                 <a href="#contes" class="btn">Commencer</a>
                 </div>
             </header>
        </div>     

        <section id="price">
            <h2>Prices</h2>
            <div class="price-cards">
                <div class="card">
                    <h3>Lot de Livres</h3>
                    <p>Une sélection de livres passionnants pour le gagnant.</p>
                    <img src="images/photo_book.webp" alt="Prix - Livres"/>
                </div>
                <div class="card">
                    <h3>Jeux Éducatifs</h3>
                    <p>Des jeux éducatifs amusants pour stimuler l'apprentissage.</p>
                    <img src="images/photo_jeux.jpg" alt="Prix - Jeux"/>
                </div>
            </div>
        </section>

        <section id="contes">
            <h2>Découvrir les Contes</h2>
            <div class="contes-content">
                <div class="contes-card">
                    <img src="images/photo_cendrillon.jpg" class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">Cendrillon</h4>
                        <p class="card-info">Cendrillon, maltraitée par sa belle-mère, rencontre un prince grâce à une fée. Elle perd sa chaussure, et le prince la retrouve.</p>
                        <button class="card-btn"><a href="conte1.html">Démarrer</a></button>
                    </div>
                </div>
                <div class="contes-card">
                    <img src="images/photo_chaperon_rouge.jpg" class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">Le Petit Chaperon Rouge</h4>
                        <p class="card-info">Le Petit Chaperon Rouge visite sa grand-mère, rencontre un loup déguisé, mais un chasseur courageux intervient pour sauver la grand-mère et la petite fille.</p>
                        <button class="card-btn"><a href="conte2.html">Démarrer</a></button>
                    </div>
                </div>
                <div class="contes-card">
                    <img src="images/photo_blanche_neige.webp" class="card-img" alt="Chaperon-rouge"/>
                    <div class="card-body">
                        <h4 class="card-title">Blanche Neige</h4>
                        <p class="card-info">Blanche-Neige fuit une reine jalouse, trouve refuge chez sept nains, mais une pomme empoisonnée la plonge dans un sommeil, jusqu'au baiser d’un prince.</p>
                        <button class="card-btn"><a href="conte3.html">Démarrer</a></button>
                    </div>
                </div>
            </div>
        </section>
    
        <footer>
            <p>&copy; 2025 Compétition de Lecture. Tous droits réservés.</p>
        </footer>
       
    </div>
  );
};


export default Home;
