import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'

import './style.css'

export default function Products({ match }) {
    const [ product, setProduct ] = useState([])
    const [ error, setError ] = useState({})

    useEffect(() => {
        async function fetchData() {

            try{
                const response = await api.get(`/products/${match.params.id}`)

                setError({})
                setProduct(response.data)
            }catch(err){
                console.error(err)
                const { status, statusText, data } = err.response

                setError({
                    status,
                    message: data.message,
                    statusText
                })
            }
        }
        fetchData()
    })
    console.log(product)
    return (
        <>
            { JSON.stringify(error) === '{}' ? (
                <>
                    <div className="product-container">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <p>
                            URL: <a href={product.url} rel="noopener noreferrer" target="_blank">{product.url}</a>
                        </p> 
                    </div> 
                <Link className="create-products" to='/create-product'>Add your product</Link>
                </>
            ) : (
                <div className="error-container">
                    <h1>{error.status} {error.statusText}</h1>

                    <p>Server message: '{error.message}'</p>
                    <Link to="/products">Products</Link>
                </div>
            ) }
        </>
    )
}
