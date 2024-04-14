//C:\Users\NEWOWNER\local_only\local_ruiztechservices\nextjs_luis-ruiz\app\components\main\bitcoinbot.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const BitcoinPriceClock = () => {
  const [price, setPrice] = useState("Loading...");

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        setPrice(`$${response.data.bpi.USD.rate}`);
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        setPrice("Failed to load");
      }
    };

    fetchPrice();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-black text-white font-mono text-4xl p-10 rounded-lg shadow-lg">
        <h1>Bitcoin Price:</h1>
        <p className="text-6xl">{price}</p>
      </div>
    </div>
  );
};

export default BitcoinPriceClock;
