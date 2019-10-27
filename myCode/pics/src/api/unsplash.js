import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 6644c1abd390d9e0b2dfcd21c4cd5a8f4bbadff06fee100f6a8e893bd2590929'
    }
});