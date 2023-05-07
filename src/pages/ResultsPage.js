import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import uniqid from 'uniqid';


function ResultsPage() {
  const [results, setResults] = useState([]);
  const [news, setNews] = useState([]);

  const { symbol } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      const overviewResponse = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${
          symbol || searchTerm
        }&apikey=T3H0OF5ZXYZAWJWA`
      );
      const newsResponse = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${
          symbol || searchTerm
        }&apikey=T3H0OF5ZXYZAWJWA`
      );

      const companyData = await overviewResponse.json();
      const companyNews = await newsResponse.json();

      setNews(companyNews);
      setResults(companyData);
      console.log(companyNews);
    };
    fetchData();
  }, [symbol, searchTerm]);

  return (
    <Layout>
      <section className="stock-page">
        {results.length === 0 || !news.feed ? (
          <Loader />
        ) : (
          <>
            <div className="result-page-component overview">
              <h1 className="ov-title">
                {results.Name && results.Symbol
                  ? `${results.Name} (${results.Symbol})`
                  : ""}
              </h1>
              <span className="ov-industry">{results.Industry}</span>
              <p className="ov-description">{results.Description}</p>
              <ul></ul>
            </div>
            <div className="result-page-component news">
              <h1>News related to <span>{results.Name}</span></h1>
              {news.feed && news.feed.length > 0 && (
                <ul className="article-list">
                  {news.feed.slice(0, 3).map((article) => (
                    <li key={uniqid()}>
                      <h3>{article.title}</h3>
                      <a href={article.url} className="article-url">
                        {article.url}
                      </a>
                      <p className="summary">Summary: {article.summary}</p>
                      <p className="author">by {article.authors[0]}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}

export default ResultsPage;
