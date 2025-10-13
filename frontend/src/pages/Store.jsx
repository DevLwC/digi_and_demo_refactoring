import React, {useState, useEffect} from 'react'
import './Store.css'

const storeItems = [
    {id: 1, name: 'Seed Boost', price: 50, icon: '🌱', description: 'Double your next post reach'},
    {id: 2, name: 'Growth Potion', price: 100, icon: '🧪', description: 'Instant level up'},
    {id: 3, name: 'Eco Badge', price: 75, icon: '🏆', description: 'Show off your green status'},
    {id: 4, name: 'Plant Pack', price: 200, icon: '🌿', description: 'Unlock new avatar plants'},
    {id: 5, name: 'Nature Frame', price: 150, icon: '🖼️', description: 'Special post border'},
    {id: 6, name: 'Green Streak', price: 300, icon: '🔥', description: 'Streak protection for 7 days'}
]

const achievements = [
    {id: 1, name: 'First Steps', description: 'Create your first post', reward: 25, icon: '👶', unlocked: true},
    {id: 2, name: 'Social Butterfly', description: 'Make 10 friends', reward: 50, icon: '🦋', unlocked: false},
    {id: 3, name: 'Green Thumb', description: 'Post for 7 days straight', reward: 100, icon: '👍', unlocked: true},
    {id: 4, name: 'Eco Warrior', description: 'Get 100 likes on eco posts', reward: 150, icon: '⚔️', unlocked: false},
    {id: 5, name: 'Community Leader', description: 'Help 5 newcomers', reward: 200, icon: '👑', unlocked: false}
]

const leaderboard = [
    {rank: 1, name: 'EcoEmma', score: 2450, avatar: '🌺'},
    {rank: 2, name: 'GreenGuru', score: 2380, avatar: '🌿'},
    {rank: 3, name: 'PlantPal', score: 2210, avatar: '🌱'},
    {rank: 4, name: 'NatureLover', score: 1950, avatar: '🍃'},
    {rank: 5, name: 'EarthFriend', score: 1820, avatar: '🌍'}
]

export default function Store() {
    const [ecoCoins, setEcoCoins] = useState(325)
    const [level, setLevel] = useState(12)
    const [streak, setStreak] = useState(parseInt(localStorage.getItem('streakCount')) || 7)

    const handlePurchase = (item) => {
        if (ecoCoins >= item.price) {
            setEcoCoins(prev => prev - item.price)
            alert(`Successfully purchased ${item.name}!`)
        } else {
            alert('Not enough EcoCoins!')
        }
    }

    return (
        <div className="store-bg">
            <div className="store-center-container">
                <main className="store" role="main">
                    <header className="store__header">
                        <h1 className="store__title">EcoCoins Store</h1>
                        <p className="store__subtitle">Spend your coins on amazing eco-friendly rewards!</p>
                    </header>

                    <section className="store__stats">
                        <div className="stat">
                            <span className="stat__value">{ecoCoins}</span>
                            <div className="stat__label">💰 EcoCoins</div>
                        </div>
                        <div className="stat">
                            <span className="stat__value">{level}</span>
                            <div className="stat__label">🌟 Level</div>
                        </div>
                        <div className="stat">
                            <span className="stat__value">{streak}</span>
                            <div className="stat__label">🔥 Day Streak</div>
                        </div>
                    </section>

                    <div className="store__sections">
                        <section className="section">
                            <h2 className="section__title">🛍️ Store Items</h2>
                            <div className="items-grid">
                                {storeItems.map(item => (
                                    <div key={item.id} className="item">
                                        <span className="item__icon">{item.icon}</span>
                                        <h3 className="item__name">{item.name}</h3>
                                        <p className="item__price">{item.price} EcoCoins</p>
                                        <button
                                            className="item__btn"
                                            onClick={() => handlePurchase(item)}
                                            disabled={ecoCoins < item.price}
                                        >
                                            {ecoCoins >= item.price ? 'Buy Now' : 'Not Enough Coins'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="section">
                            <h2 className="section__title">🏆 Achievements</h2>
                            <div className="achievements-list">
                                {achievements.map(achievement => (
                                    <div
                                        key={achievement.id}
                                        className={`achievement ${achievement.unlocked ? 'achievement--unlocked' : ''}`}
                                    >
                                        <span className="achievement__icon">{achievement.icon}</span>
                                        <div className="achievement__info">
                                            <h3 className="achievement__name">{achievement.name}</h3>
                                            <p className="achievement__description">{achievement.description}</p>
                                        </div>
                                        <div className="achievement__reward">+{achievement.reward}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="section">
                            <h2 className="section__title">🥇 Leaderboard</h2>
                            <div className="leaderboard-list">
                                {leaderboard.map(user => (
                                    <div
                                        key={user.rank}
                                        className={`leaderboard-item ${user.rank <= 3 ? 'leaderboard-item--top' : ''}`}
                                    >
                                        <span className="leaderboard__rank">#{user.rank}</span>
                                        <div className="leaderboard__avatar">{user.avatar}</div>
                                        <span className="leaderboard__name">{user.name}</span>
                                        <span className="leaderboard__score">{user.score}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}