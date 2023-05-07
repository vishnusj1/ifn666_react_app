import React from "react";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="about">
        <div className="description">
          <h2>About</h2>
          <p>
            Welcome to <span>stox</span>, where we empower investors and traders to make
            informed decisions about their investments. Our app is designed to
            provide you with the latest stock market data and analysis, all at
            your fingertips. We achieve this by leveraging the power of two
            industry-leading APIs - the FMP API and the Alpha Vantage API. These
            APIs enable us to provide you with up-to-date and accurate stock
            market data, including real-time stock prices, historical prices,
            financial statements, and much more.{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
