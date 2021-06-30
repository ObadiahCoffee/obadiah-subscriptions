const cors = require('cors')({ origin: true });
const axios = require('axios');

const handler = async (req, res) => {
  const data = req.body;

  try {
    const response = await axios.post(data?.checkoutUrl, data?.cartJSON, data?.headers);
    // console.log('checkoutURL', data?.checkoutUrl);
    // console.log('cartJSON', data?.cartJSON);
    // console.log('headers', data?.headers);
    console.log(response.data);
  } catch (error) {
    console.log(error)
    res.status(200).json({ error: 'error' });
  }
};

export default handler;
