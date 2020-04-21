import React, { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Link } from 'react-router-dom'

import './style.css'

function Main() {
    const [ products, setProducts ] = useState([])
    const [ Page, setPage ] = useState({})

    useEffect(() => {
        apiResolve()
    }, [])    

    async function apiResolve() {
        try{
            const response = await api.get(`/products`)

            setProducts(response.data.docs)
            setPage({ 
                page: response.data.page,
                pages: response.data.pages
            })
        }catch(err) {console.error(err)}
    }

    async function prevPage() {
        if(Page.page === 1) return;
        try {
            const response = await api.get(`/products?page=${Math.floor(Page.page)-1}`)
            
            setProducts(response.data.docs)
            setPage({ page: response.data.page, pages: response.data.pages })
        }catch(err){console.error(err)}
        
    }

    async function nextPage() {
        if(Page.page === Page.pages) return;

        try {
            const response = await api.get(`/products?page=${Page.page+1}`)
            
            setProducts(response.data.docs)
            setPage({ page: response.data.page, pages: response.data.pages })
        }catch(err){console.error(err)}
        
    }

    return (
        <div className="products">
            { products.map(product => (
                <article key={product._id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <Link to={`/products/${product._id}`}>Go</Link>
                    <Link style={{ marginTop: 15 }} to={`/delete-product/${product._id}`}>Delete</Link>
                </article>
            )) }

            <div className="actions">
                <button disabled={Page.page === 1} onClick={prevPage}>Previous</button>
                <p>Page: {Page.page}</p>
                <button disabled={Page.page === Page.pages} onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}

export default Main
