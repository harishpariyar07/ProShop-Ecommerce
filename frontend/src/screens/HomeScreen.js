import Product from '../components/Product'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('/api/products')
            setProducts(res.data)
        }
        fetchProducts()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => {
                    return (<Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} key={product._id} />
                    </Col>)
                })}
            </Row>
        </>
    )
}

export default HomeScreen