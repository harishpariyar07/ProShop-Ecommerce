import Product from "../components/Product";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productsActions";
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";

const HomeScreen = () => {
    const { keyword } = useParams()
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <>
            <h1 className='my-3'>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => {
                        return (
                            <Col sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} key={product._id} />
                            </Col>
                        );
                    })}
                </Row>
            )}
        </>
    );
};

export default HomeScreen;
