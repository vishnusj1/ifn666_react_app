import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";

const Stocks = () => {
  const [nasdaqList, setNasdaqList] = useState([]);
  const [searchTerm,setSearchTerm] = useState('');

  const fetchNasdaqList = async () => {
    console.log('apicalled');
    setSearchTerm('')
    const response = await axios.get(
      "https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=af4918b3db2e900571001a068fa41140"
    );
    const data = response.data;
    const companies = data.map((company) => {
      return {
        symbol: company.symbol,
        name: company.name,
        sector: company.sector,
        founded: company.founded,
      };
    });
    console.log(data);
    setNasdaqList(companies);
  }
  const handleSearch = (text) => {
    setSearchTerm(text);
    console.log(text);
  };

  const filteredList = nasdaqList.filter((company) => {
    return company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <div>
        <h1>Stock Page</h1>
        <SearchBar onSearch = {handleSearch}/>
        <button className="quick-link-button" onClick={fetchNasdaqList}>List of Nasdaq 100 companies</button>
        <ul>
          {filteredList.map((company) => (
            <li key={company.symbol}>
              <Link to={`/stocks/${company.symbol}`}>
                {company.symbol} - {company.name} - {company.sector}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
export default Stocks;
