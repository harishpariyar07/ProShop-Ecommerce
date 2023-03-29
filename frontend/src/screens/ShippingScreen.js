import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


const ShippingScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address)
            setCity(shippingAddress.city)
            setPostalCode(shippingAddress.postalCode)
            setCountry(shippingAddress.country)
        }
    }, [dispatch, shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (<FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='address'
                    placeholder='Enter address'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='city'
                    placeholder='Enter address'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='postalCode'
                    placeholder='Enter address'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='country'
                    placeholder='Enter address'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
                Continue
            </Button>
        </Form>
    </FormContainer>)
}

export default ShippingScreen