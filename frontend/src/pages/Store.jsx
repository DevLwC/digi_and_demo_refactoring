import React from 'react'

function Store() {
    // Placeholder data; replace with real data as needed
    const balance = 126
    const items = [
        {
            id: 1,
            image: '/images/item1.png',
            title: 'Cool Hat',
            amount: 100,
        },
        {
            id: 2,
            image: '/images/item2.png',
            title: 'Fancy Glasses',
            amount: 80,
        },
        {
            id: 3,
            image: '/images/item3.png',
            title: 'Magic Cape',
            amount: 120,
        },
        {
            id: 4,
            image: '/images/item4.png',
            title: 'Sneakers',
            amount: 90,
        },
    ]

    return (
        <>
            <div className="container mt-3">
                <h3>Cosmetic Store</h3>
                <span className="d-flex align-items-center mb-3">
          <img src="/icons/currency.svg" alt="Currency Icon" width="40" height="40" className="me-1"/>
          <span>{balance}</span>
        </span>
                <div className="scroll-container" style={{height: '80vh', overflowY: 'auto'}}>
                    <div className="row g-3">
                        {items.length > 0 ? (
                            items.map(item => (
                                <div className="col-md-6" key={item.id}>
                                    <div className="card">
                                        <img src={item.image} className="card-img-top" alt="Item"/>
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.title}</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img src="/icons/currency.svg" alt="Currency Icon" width="20"
                                                     height="20" className="me-1"/>
                                                <span>{item.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            Array.from({length: 4}).map((_, i) => (
                                <div className="col-md-6" key={i}>
                                    <div className="card">
                                        <img src="/icons/placeholder.png" className="card-img-top" alt="Placeholder"/>
                                        <div className="card-body text-center">
                                            <h5 className="card-title text-muted">Placeholder</h5>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img src="/icons/currency.svg" alt="Currency Icon" width="20"
                                                     height="20" className="me-1"/>
                                                <span className="text-muted">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Store
