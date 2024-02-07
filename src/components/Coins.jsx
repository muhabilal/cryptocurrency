import React, { useState, useEffect } from "react";
import axios from "axios";
import { Baseurl } from "./baseUrl";
import Loader from "./Loader";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./Res.css";
const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const currencySymbol = currency === "usd" ? "$" : "€";
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${Baseurl}/coins/markets?vs_currency=${currency}`
      );
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinsData();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search your coins"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency("usd")}>usd</button>
            <button onClick={() => setCurrency("eur")}>eur</button>
          </div>
          {coins
            .filter((data) => {
              if (data == "") {
                return data;
              } else if (
                data.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((item, index) => {
              return (
                <CoinCard
                  item={item}
                  index={index}
                  currencySymbol={currencySymbol}
                  id={item.id}
                />
              );
            })}
        </>
      )}
    </>
  );
};
const CoinCard = ({ item, index, currencySymbol, id }) => {
  const profit = item.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      style={{ color: "white", textDecoration: "none" }}
    >
      <div className="ex-cards" key={index}>
        <div className="image">
          <img height={"80px"} src={item.image} alt="eth" />
        </div>
        <div className="name">{item.name}</div>
        <div className="price">
          {currencySymbol} {item.current_price.toFixed(0)}
        </div>
        <div
          className="rank"
          style={profit ? { color: "green" } : { color: "red" }}
        >
          {profit
            ? "+" + item.price_change_percentage_24h.toFixed(2)
            : item.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};
export default Coins;
