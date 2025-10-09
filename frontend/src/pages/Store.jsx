import React from "react";
import "./Store.css";

const storeItems = [
    {
        id: 1,
        name: "Eco Badge",
        desc: "Show off your eco-consciousness.",
        price: "50 points",
        img: "/badges/eco.png"
    },
    {
        id: 2,
        name: "Avatar: Fox",
        desc: "Unlock the fox avatar.",
        price: "100 points",
        img: "/avatars/fox.png"
    },
    {
        id: 3,
        name: "Avatar: Panda",
        desc: "Unlock the panda avatar.",
        price: "100 points",
        img: "/avatars/panda.png"
    },
    {
        id: 4,
        name: "Custom Title",
        desc: "Set a custom profile title.",
        price: "200 points",
        img: "/icons/title.png"
    },
];

export default function Store() {
    return (
        <div className="store-bg">
            <div className="store-center-container">
                <main className="store" role="main">
                    <section className="card">
                        <h2 className="store__title">Store</h2>
                        <div className="store__grid">
                            {storeItems.map(item => (
                                <div key={item.id} className="store__item">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="store__item-img"
                                        loading="lazy"
                                    />
                                    <div className="store__item-name">{item.name}</div>
                                    <div className="store__item-desc">{item.desc}</div>
                                    <div className="store__item-price">{item.price}</div>
                                    <button className="store__item-btn" type="button">
                                        Redeem
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}