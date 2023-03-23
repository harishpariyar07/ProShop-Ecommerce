import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'
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

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else {
            console.log(user)
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(password, confirmPassword)
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch()
        }

    }

    return (<Row>
        <Col md={5}>
            <FormContainer>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}

                {error && <Message variant='danger'>{error}</Message>}

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
        </Col>
    </Row>);
}

export default ProfileScreen