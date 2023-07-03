import React from 'react'
import shoppingCartImage from "../assets/shoppingCart.jpg";
import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div className="aboutTop" style={{ backgroundImage: `url(${shoppingCartImage})` }}> 
      
      </div>
      <div className="aboutBottom"> 
        <h1>ABOUT THE WEBSITE</h1>
        <p className="paragraph"> Welcome to the certified ape zone where you got five absolute
            dumbasses working on a website together to learn react over the
            summer like the giant fucking losers they are. Their names
            are Justin Li, Danny Zhang, Emma Gui, Benjamin Wang, Vincent Sun 
            (2396 North Ridge Trail). You may be asking what the point 
            of this ridiculous and stupid useless page is, and to answer
            your question, Yeah. We needed another page to look cool and
            I just needed a bunch of filler text so I'm just writing this
            to take up space to see how this ends up turning out. please
            work otherwise im gonna cry myself to sleep tonight thank you
            very much. 
        </p>
      </div>
    </div>
  )
}

export default About
