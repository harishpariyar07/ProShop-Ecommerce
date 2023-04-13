import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductsDetails } from '../actions/productsActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const ProductEditScreen = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if (!product.name || product._id !== id) {
            dispatch(listProductsDetails(id))
        }
        else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [id, dispatch, product])

    const submitHandler = (e) => {
        e.preventDefault()
        // update product
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>
                            Brand
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label>
                            Count in stock
                        </Form.Label>
                        <Form.Control type='number' placeholder='Enter email' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control type='email' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Update
                    </Button>
                </Form>}
            </FormContainer>
        </>

    );
}

export default ProductEditScreen