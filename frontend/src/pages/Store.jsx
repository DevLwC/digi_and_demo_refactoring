import React, {useState} from 'react'
import './Store.css'

// If your currency file has a different name/extension, update this:
const CURRENCY_ICON = '/shop/currency.png'

const storeItems = [
    {
        id: 1,
        name: 'Camel',
        price: 25,
        image: '/shop/camel.png',
        category: 'Animals',
        description: 'A sturdy desert companion.',
        rating: 4.8,
        reviews: 156,
    },
    {
        id: 2,
        name: 'Castle',
        price: 45,
        image: '/shop/castle.png',
        category: 'Structures',
        description: 'Fortified stone keep with tall towers.',
        rating: 4.6,
        reviews: 89,
    },
    {
        id: 3,
        name: 'Dragon',
        price: 60,
        image: '/shop/dragon.png',
        category: 'Fantasy',
        description: 'Majestic, fire-breathing guardian.',
        rating: 4.9,
        reviews: 203,
    },
    {
        id: 4,
        name: 'Moon',
        price: 30,
        image: '/shop/moon.png',
        category: 'Space',
        description: 'A glowing lunar accent for night skies.',
        rating: 4.7,
        reviews: 124,
    },
    {
        id: 5,
        name: 'Pizza',
        price: 12,
        image: '/shop/pizza.png',
        category: 'Food',
        description: 'Cheesy slice—always a crowd pleaser.',
        rating: 4.5,
        reviews: 78,
    },
    {
        id: 6,
        name: 'Slime',
        price: 18,
        image: '/shop/slime.png',
        category: 'Creatures',
        description: 'Gelatinous buddy that bounces along.',
        rating: 4.8,
        reviews: 167,
    },
]

// Build the tab list dynamically from the items
const categories = ['All', ...Array.from(new Set(storeItems.map(i => i.category)))]

export default function Store() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [cart, setCart] = useState([])
    const [showCart, setShowCart] = useState(false)

    const filteredItems =
        selectedCategory === 'All'
            ? storeItems
            : storeItems.filter(item => item.category === selectedCategory)

    const addToCart = item => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? {...cartItem, quantity: cartItem.quantity + 1}
                        : cartItem
                )
            }
            return [...prevCart, {...item, quantity: 1}]
        })
    }

    const removeFromCart = itemId => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId))
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(itemId)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId ? {...item, quantity: newQuantity} : item
            )
        )
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    return (
        <div className="store-bg">
            <div className="store-center-container">
                <main className="store" role="main">
                    <header className="store-header">
                        <div className="store-title-section">
                            <h1 className="store-title">Eco Store</h1>
                            <p className="store-subtitle">Sustainable products for a greener lifestyle</p>
                        </div>
                        <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
                            🛒 <span className="cart-count">{getTotalItems()}</span>
                        </button>
                    </header>

                    <nav className="category-tabs">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`category-tab ${selectedCategory === category ? 'is-active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </nav>

                    <section className="products-grid">
                        {filteredItems.map(item => (
                            <article key={item.id} className="product-card">
                                <div className="product-image">
                                    {/* Swap emoji for a real image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="product-img"
                                        loading="lazy"
                                    />
                                    <div className="product-category">{item.category}</div>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{item.name}</h3>
                                    <p className="product-description">{item.description}</p>
                                    <div className="product-rating">
                    <span className="rating-stars">
                      {'★'.repeat(Math.floor(item.rating))}
                        {'☆'.repeat(5 - Math.floor(item.rating))}
                    </span>
                                        <span className="rating-text">
                      {item.rating} ({item.reviews} reviews)
                    </span>
                                    </div>
                                    <div className="product-footer">
                    <span className="product-price">
                      <img src={CURRENCY_ICON} alt="" className="currency-icon"/>
                        {item.price}
                    </span>
                                        <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                </main>

                {showCart && (
                    <div className="cart-overlay" onClick={() => setShowCart(false)}>
                        <div className="cart-modal" onClick={e => e.stopPropagation()}>
                            <div className="cart-header">
                                <h2>Shopping Cart</h2>
                                <button className="close-cart" onClick={() => setShowCart(false)}>
                                    ✕
                                </button>
                            </div>
                            <div className="cart-content">
                                {cart.length === 0 ? (
                                    <div className="empty-cart">
                                        <span className="empty-cart-icon">🛒</span>
                                        <p>Your cart is empty</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="cart-items">
                                            {cart.map(item => (
                                                <div key={item.id} className="cart-item">
                                                    {/* small thumbnail in cart */}
                                                    <img src={item.image} alt="" className="cart-item-thumb"/>
                                                    <div className="cart-item-info">
                                                        <div className="cart-item-name">{item.name}</div>
                                                        <div className="cart-item-price">
                                                            <img src={CURRENCY_ICON} alt=""
                                                                 className="currency-icon inline"/>
                                                            {item.price}
                                                        </div>
                                                    </div>
                                                    <div className="quantity-controls">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                            −
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            +
                                                        </button>
                                                    </div>
                                                    <button className="remove-item"
                                                            onClick={() => removeFromCart(item.id)}>
                                                        🗑️
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="cart-footer">
                                            <div className="cart-total">
                                                Total: {/*
                         * You can also use toFixed(2) if you want cents:
                         * ${getTotalPrice().toFixed(2)}
                         */}
                                                <img src={CURRENCY_ICON} alt="" className="currency-icon inline"/>
                                                {getTotalPrice()}
                                            </div>
                                            <button className="checkout-btn">Checkout</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
