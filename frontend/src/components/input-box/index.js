import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { allowedIPs } from '../../json/blackListIP.json'
import { useHistory } from 'react-router-dom'
import { api } from '../../services/api'

import './style.css'

export default function InputBox() {
    const [ allowed, setAllowed ] = useState(true)

    const [ title, setTitle ] = useState('')
    const [ URL, setURL ] = useState('')
    const [ DESC, setDESC ] = useState('')

    const history = useHistory()

    async function handleFormSubmit(E) {
        E.preventDefault()
        try{
            await api.post('/products', {
                title,
                url: URL,
                description: DESC
            })

            return history.push('/products')
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        async function fetchRes() {
            const res = await axios.get('https://api.ipify.org?format=json')

            if(!allowedIPs.includes(res.data.ip)) {
                setAllowed(false)
            }
        }fetchRes()
    }, [])

    return (
        <>
        {allowed ? (
            <form onSubmit={handleFormSubmit}>
                <div className="input-form">
                    <h1>Add your product</h1>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required/>

                    <label htmlFor="desc">Description</label>
                    <input type="text" name="desc" value={DESC} onChange={e => setDESC(e.target.value)} required/>

                    <label htmlFor="url">URL</label>
                    <input type="text" name="url" value={URL} onChange={e => setURL(e.target.value)} required/>

                    <button type="submit">Send</button>
                </div>
            </form>
        ) : (
            <div className="not-allowed">
                <h1>403: UNAUTHORIZED</h1>
                <h3>ERROR: your ip is not registered as an admin here</h3>
                <Link to={{ pathname: '/products' }} className="product-btn">Products</Link>
            </div>
        )}
        </>
    )
}
