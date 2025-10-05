import React from 'react'
import './Store.css'

// TODO: implement the store items into an database and give and array of objects to the frontend
const items = [
    {
        id: 1,
        image: '/shop/castle.png',
        title: 'Celestial Cats',
        amount: 210,
    },
    {
        id: 2,
        image: '/shop/dragon.png',
        title: 'Dragon Riders',
        amount: 260,
    },
    {
        id: 3,
        image: '/shop/camel.png',
        title: 'Desert Exporers',
        amount: 180,
    },
    {
        id: 4,
        image: '/shop/moon.png',
        title: 'Cloud Friends',
        amount: 170,
    },
    {
        id: 5,
        image: '/shop/slime.png',
        title: 'Monster Party',
        amount: 250,
    },
    {
        id: 6,
        image: '/shop/pizza.png',
        title: 'Galcctic Garden',
        amount: 160,
    },
]

function Store() {
    // TODO: balance and item purchase logic
    const balance = 225

    return (
        <div className="store-root">
            {/* Header */}
            <div className="store-header">
                <div className="store-header__balance">
                    <img src="/shop/currency.png" alt="Currency" className="store-header__currency"/>
                    <span className="store-header__amount">{balance}</span>
                    <img src="/assets/shop/settings.svg" alt="Settings" className="store-header__settings"/>
                </div>
            </div>
            {/* Title */}
            <div className="store-title">
                <h2 className="store-title__text">COSMETIC STORE</h2>
            </div>
            {/* Store Grid */}
            {/* TODO: the whole screen is scrollable, but only the grid container with the items should be*/}
            <div className="store-grid-container">
                <div className="store-grid">
                    {items.map(item => (
                        <button
                            key={item.id}
                            className="store-item store-item--clickable"
                            onClick={() => handleItemClick(item)}
                            type="button"
                        >
                            <img src={item.image} alt={item.title} className="store-item__image"/>
                            <div className="store-item__title">{item.title}</div>
                            <div className="store-item__price">
                                <img src="/shop/currency.png" alt="Currency" className="store-item__currency"/>
                                <span>{item.amount} ORO</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Store
