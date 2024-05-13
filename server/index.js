const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const axios = require("axios")
const app = express();
app.use(cors());
app.use(bodyParser.json());

const otplessApiUrl = 'https://auth.otpless.app/auth/userInfo';
const client_id = '1B5XKOSUI4YK7DVAZS9Z2SP79I46HR0S';
const client_secret = 'dc7qh17h6e2px5gsskqy6u9m96ncsa16';

app.post('/authenticate', async (req, res) => {
    try {
        const { token } = req.body;

        const data = new URLSearchParams();
        data.append('token', token);
        data.append('client_id', client_id);
        data.append('client_secret', client_secret);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        axios.post('https://auth.otpless.app/auth/userInfo', data, config)
            .then((response) => {
                console.log(response.data);
                res.json({ success: true, data: response.data }); // Move this line here
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            });

    } catch (error) {
        console.error('Error calling OTPless API:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})