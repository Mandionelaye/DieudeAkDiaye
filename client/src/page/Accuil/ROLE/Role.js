import React from 'react'
import './role.css'
export default function Role() {
  return (
    <>
          <div className="role">
          <div className="titre">
            <p className="line"></p><samp className="titreR">Role du client</samp><p className="line"></p>
          </div>
          <div className="cardre">
            <div className="cercle1"></div>
            <div className="cercle2"></div>
            <div className="cercle3"></div>
            <div className="cercle4"></div>
            <div className="cercle5"></div>
            <div className="cercle6"></div>
            <div className="elme">
              <div className="vendeur">
              <img src="/image/acteur.png" alt="img" />
              <h1>Vendeur</h1>
                <p>Pour le vendeur il poura ajouter des porduits, fixe ces propre prix</p>
                </div>
                <div className="acheteur">
              <img src="/image/acteur.png" alt="img" />
              <h1>Acheteur</h1>
                <p>Pour l’acheteur, il pourra acheter des produits, discuter du prix avec le vendeur</p>
                </div>
            </div>
          </div>
         </div>
    </>
  )
}
