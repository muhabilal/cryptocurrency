import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Baseurl } from "./baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
// import coinImg from "../coin.png";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import "./CoinDetail.css";
import CoinChart from "./CoinChart";
const CoinDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const profit = coin.market_data?.price_change_percentage_24h > 0;
  const currencySymbol = currency === "usd" ? "$" : "€";
  useEffect(() => {
    const getCoins = async () => {
      const { data } = await axios.get(`${Baseurl}/coins/${id}`);
      console.log(data);
      setCoin(data);
      setLoading(false);
      try {
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoins();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="coin-detail"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div className="coin-info">
              <div className="btn">
                <button onClick={() => setCurrency("usd")}>usd</button>
                <button onClick={() => setCurrency("eur")}>eur</button>
              </div>
              <div className="time">{coin.last_updated}</div>
              <div className="coin-image">
                <img height={"150px"} src={coin.image.large} alt="coin" />
              </div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price ">
                {currencySymbol} {coin.market_data.current_price[currency]}
              </div>
              <div className="coin-profit">
                {profit ? (
                  <BiSolidUpArrow color="green" />
                ) : (
                  <BiSolidDownArrow color="red" />
                )}
                {coin.market_data.price_change_percentage_24h} %
              </div>
              <div className="market-rank">
                <IoPulseOutline color="orange" />#
                {coin.market_data.market_cap_rank}
              </div>
              <div className="coin-desc">
                <p>{coin.description["en"].split(".")[0]}</p>
              </div>
            </div>
            <CoinChart currency={currency} />
          </div>
        </>
      )}
    </>
  );
};

export default CoinDetails;
