import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { Image, Carousel } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const URL = process.env.REACT_APP_BASE_URL
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, products, error } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : (
            <Carousel pause='hover' className='bg-primary mb-4'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`${URL}/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h2 className='text-white text-right'>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
}

export default ProductCarousel;