import React from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'

export default function NotFound() {
    const history = useHistory()
    return (
        <div className="not-found">
            <h1>Route not found</h1>
            <button onClick={() => history.push('/products')}>See Our Products</button>
        </div>
    )
}
