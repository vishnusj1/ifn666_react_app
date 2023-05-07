import React, { useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Loader from "../components/Loader";

const Stocks = () => {
  const [nasdaqList, setNasdaqList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNasdaqList = async () => {
    setIsLoading(true);
    console.log("apicalled");
    setSearchTerm("");
    const response = await axios.get(
      "https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=88599ea4a7ca6da8cfcf788acd88cea6"
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
    setNasdaqList(companies);
    setIsLoading(false);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    console.log(text);
  };

  const handleSectorChange = (sector) => {
    setSelectedSector(sector);
    console.log(sector);
  };

  const filteredList = nasdaqList.filter((company) => {
    const matchSearchTerm = company.symbol
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchSelectedSector = selectedSector
      ? company.sector === selectedSector
      : true;
    return matchSearchTerm && matchSelectedSector;
  });

  const sectorOptions = [
    ...new Set(nasdaqList.map((company) => company.sector)),
  ];

  return (
    <Layout>
      <section className="stocks">
        <h1 className="hero-text">Stocks</h1>
        <SearchBar
          onSearch={handleSearch}
          sectorOptions={sectorOptions}
          selectedSector={selectedSector}
          onHandleSectorChange={handleSectorChange}
          data={nasdaqList}
        />
        <div className="quick-links">
          <h3>Quick Links:</h3>
          <button className="quick-link-button" onClick={fetchNasdaqList}>
            List of Nasdaq 100 companies
          </button>
        </div>
        <div className="stock-info">
          {isLoading ? (
            <Loader />
          ) : nasdaqList.length === 0 ? (
            <p>
              <i>Select any quick link to display the corresponding data.</i>
            </p>
          ) : (
            <Table data={filteredList} />
          )}
        </div>
      </section>
    </Layout>
  );
};
export default Stocks;
