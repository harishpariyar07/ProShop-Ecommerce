import bcrypt from 'brcyptjs'

const users = [
    {
        name: 'Harish Pariyar',
        email: 'pariyar@gmail.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
    {
        name: 'Rabin Pariyar',
        email: 'rabin@gmail.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Manish Pariyar',
        email: 'manish@gmail.com',
        password: bcrypt.hashSync('12345', 10),
    },
]

export default users