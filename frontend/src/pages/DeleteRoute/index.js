import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

import * as allowedIPs from '../../json/blackListIP.json'
import { api } from '../../services/api'

export default function DeleteRoute({ match }) {
    const [ allowed, setAllowed ] = useState(false)

    useEffect(() => {
        async function load() {
            const res = await axios.get('https://api.ipify.org?format=json');

            if(!allowedIPs.allowedIPs.includes(res.data.ip)) {
                setAllowed(true);
            }else{ 
                await api.delete(`/products/${match.params.id}`);
                setAllowed(false);
            }
        }load();
    })

    return (
        <>
        {allowed ? (
            <Redirect to={{ pathname: '/products' }} />
        ) : (
            <div className="not-allowed">
                <h1>403: UNAUTHORIZED</h1>
                <h3>ERROR: you aren't allowed to delete any post</h3>
                <Link to={{ pathname: '/products' }} className="product-btn">Products</Link>
            </div>
        )}
        </>
    )
}
