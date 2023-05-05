import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

function ResultsPage() {
  const [results, setResults] = useState([]);
  const { symbol } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol||searchTerm}&apikey=T3H0OF5ZXYZAWJWA`
      );
      const data = await response.json();
      console.log(data);
      setResults(data);
    };

    fetchData();
  }, [symbol,searchTerm]);

  return (
    <Layout>
      <div>
        <h1>Results for {results.Name}</h1>
        <p>{results.Description}</p>
        <ul></ul>
      </div>
    </Layout>
  );
}

export default ResultsPage;
