import Product from "../components/Product";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productsActions";
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { Link, useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
    const { keyword, pageNumber = 1 } = useParams()
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);

    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta title={"Welcome to ProShop | Home"} />
            {!keyword && <ProductCarousel />}
            {keyword && <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>}
            {keyword ? <h1 className="my-3">Search Results</h1> : <h1 className='my-3'>Latest Products</h1>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => {
                            return (
                                <Col sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} key={product._id} />
                                </Col>
                            );
                        })}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    );
};

export default HomeScreen;
