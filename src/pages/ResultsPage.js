import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChartComponent from "../components/Chart";
import uniqid from "uniqid";

function ResultsPage() {
  const { symbol } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query");

  const [companyOverview, setCompanyOverview] = useState([]);
  const [news, setNews] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [stockPriceData, setStockPriceData] = useState({});

  useEffect(() => {
    const fetchCompanyOverview = async () => {
      try {
        const overviewResponse = await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${
            symbol || searchTerm
          }&apikey=7OFH89SZBB5ECMON`
        );
        const overview = await overviewResponse.json();
        setCompanyOverview(overview);

        // Call fetchCompanyData() only after fetchCompanyOverview() is successful
        const dataResponse = await fetch(
          `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=88599ea4a7ca6da8cfcf788acd88cea6`
        );
        const data = await dataResponse.json();
        setHistoricalData(data.historical);

        const stockPriceResponse = await fetch(
          `https://financialmodelingprep.com/api/v3/stock-price-change/${symbol}?apikey=88599ea4a7ca6da8cfcf788acd88cea6`
        );
        const stockPrice = await stockPriceResponse.json();
        setStockPriceData({
          ...stockPrice[0],
        });
      } catch (error) {
        console.error("Error fetching company overview:", error);
      }
    };

    const fetchCompanyNews = async () => {
      try {
        const newsResponse = await fetch(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${
            symbol || searchTerm
          }&apikey=7OFH89SZBB5ECMON`
        );
        const news = await newsResponse.json();
        setNews(news);
      } catch (error) {
        console.error("Error fetching company news:", error);
      }
    };

    fetchCompanyOverview();
    fetchCompanyNews();
  }, [symbol, searchTerm]);

  return (
    <Layout>
      <section className="stock-page">
        {companyOverview.length === 0 || !news.feed ? (
          <Loader />
        ) : (
          <div>
            <div className="result-page-component overview">
              <h1 className="ov-title">
                {companyOverview.Name && companyOverview.Symbol
                  ? `${companyOverview.Name} (${companyOverview.Symbol})`
                  : ""}
              </h1>
              <span className="ov-industry">{companyOverview.Industry}</span>
              <div className="stock-price box">
                <div className="title">{stockPriceData.symbol}</div>
                <div className="content">
                  {Object.keys(stockPriceData).map((key) => {
                    if (key !== "symbol") {
                      return (
                        <div key={uniqid()} className="row">
                          <span>{key}:</span> {stockPriceData[key]}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <p className="ov-description">{companyOverview.Description}</p>
              <ul></ul>
            </div>
            {historicalData && historicalData.length > 0 && companyOverview ? (
              <div className="chart">
                <ChartComponent
                  historicalData={historicalData}
                  stockPriceData={stockPriceData}
                  companyName={companyOverview.Name}
                />
              </div>
            ) : (
              <p>No data to display</p>
            )}
            <div className="result-page-component news">
              <h1>
                News related to <span>{companyOverview.Name}</span>
              </h1>
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
          </div>
        )}
      </section>
    </Layout>
  );
}

export default ResultsPage;
