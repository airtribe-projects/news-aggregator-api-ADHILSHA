const axios = require("axios");

exports.news = async (req, res) => {
  try{
    const apiURL = `${process.env.NEWS_URL}?country=${process.env.NEWS_COUNTRY}&category=${process.env.NEWS_CATEGORY}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(apiURL);
    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: "No news found." });
    }

    res.status(200).json({ articles: response.data.articles });
  } catch (error) {
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({
        message: "Error fetching news from API.",
        details: error.response.data,
      });
    }
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
}
