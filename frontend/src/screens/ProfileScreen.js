import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import FormContainer from '../components/FormContainer'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user,])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
            setMessage('')
        }
    }

    return (<Row>
        <Col md={5}>
            <FormContainer>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}

                {error && <Message variant='danger'>{error}</Message>}

                {success && <Message variant='success'>Profile Updated</Message>}

                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>
                            Email Address
                        </Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3'>
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </Col>
        <Col md={7}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.createdAt.toString().substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.toString().substring(0, 10) : (
                                    <i className='fas fa-time' style={{
                                        color: 'red'
                                    }}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.toString().substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red', textAlign: 'center' }}></i>
                                )}
                                </td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>);
}

export default ProfileScreen