const API_KEY = "3c6685e4dce14a5487df0d6a03301cd6";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  fetchNews("India")
});

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardContainer = document.querySelector("#card-container");
  const newsCardTemplate = document.querySelector("#template-news-card");

  cardContainer.innerHTML = "";

  articles.forEach(articles => {
    if (!articles.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, articles);
    cardContainer.appendChild(cardClone);
  });

  function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

  }
}

