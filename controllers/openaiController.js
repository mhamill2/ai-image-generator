const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size, count } = req.body;

  const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt,
      n: count || 1,
      size: imageSize
    });

    // get all the image urls
    const imageUrls = response.data.data.map((image) => image.url);

    res.status(200).json({
      success: true,
      data: imageUrls
    });
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
    res.status(400).json({
      success: false,
      error: 'The image could not be generated'
    });
  }
};

module.exports = {
  generateImage
};
