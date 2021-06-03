const axios = require("axios");
const cheerio = require("cheerio");
const LIMIT = 5;

// title, body, img, source, publisher
const getFrontPageNewsFromEP = async () => {
  try {
    const { data: epData } = await axios.get("https://elpais.com/");
    const $ = cheerio.load(epData);
    const newsList = [];
    $("article").each((index, article) => {
      const mainNew = {
        title: $(article).find(".headline").text(),
        body: $(article).find(".description").text(),
        img: $(article).find("img").attr("src"),
        source: $(article).find(".author").text(),
        publisher: "El Pais",
      };
      newsList.push(mainNew);
      if (index === LIMIT - 1) return false;
    });
    return newsList;
  } catch (error) {
    console.log("ERROR", error);
  }
};

const getFrontPageNewsFromEM = async () => {
  try {
    const { data: emData } = await axios.get("https://www.elmundo.es/");
    const $ = cheerio.load(emData);
    const newsList = [];
    $("article").each((index, article) => {
      const mainNew = {
        title: $(article).find(".ue-c-cover-content__kicker").text().trim(),
        body: $(article).find(".ue-c-cover-content__headline").text().trim(),
        img: $(article).find("img").attr("src"),
        source: $(article)
          .find(".ue-c-cover-content__byline-name")
          .text()
          .replace(/\n/g, "")
          .trim(),
        publisher: "El Mundo",
      };
      newsList.push(mainNew);
      if (index === LIMIT - 1) return false;
    });
    return newsList;
  } catch (error) {
    console.log("ERROR", error);
  }
};

const getAllFrontPagesNews = async () => {
  try {
    // console.log("Scraping...");
    const epNews = await getFrontPageNewsFromEP();
    const emNews = await getFrontPageNewsFromEM();
    // console.log("Scraping done");
    return [...epNews, ...emNews];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllFrontPagesNews,
};
