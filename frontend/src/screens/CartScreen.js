import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

const CartScreen = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    // const cart = useSelector((state) => state.cart)

    return (<div>Cart</div>);
}

export default CartScreen;
