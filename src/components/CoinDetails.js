import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    Title, Subtitle, LoadingMessage, ErrorMessage
} from '../styles/StyledComponents';
import styled from 'styled-components';

const CoinInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CoinImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const CoinData = styled.div`
  margin-bottom: 20px;
`;

const CoinDescription = styled.div`
  margin-top: 20px;
`;

const CoinDetails = () => {
    const { id } = useParams();
    const [coinData, setCoinData] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const [coinResponse, historyResponse] = await Promise.all([
                    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
                    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`)
                ]);

                setCoinData(coinResponse.data);
                setPriceHistory(historyResponse.data.prices.map(([timestamp, price]) => ({
                    date: new Date(timestamp).toLocaleDateString(),
                    price
                })));
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch coin data');
                setLoading(false);
            }
        };

        fetchCoinData();
    }, [id]);

    if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
    if (!coinData) return null;

    return (
        <div>
            <CoinInfo>
                <CoinImage src={coinData.image.small} alt={coinData.name} />
                <Title>{coinData.name} ({coinData.symbol.toUpperCase()})</Title>
            </CoinInfo>

            <CoinData>
                <Subtitle>Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}</Subtitle>
                <Subtitle>Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}</Subtitle>
                <Subtitle>24h Change:
                    <span style={{ color: coinData.market_data.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                        {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </Subtitle>
            </CoinData>

            <Subtitle>Price History (Last 30 Days)</Subtitle>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

            <CoinDescription>
                <Subtitle>Description</Subtitle>
                <div dangerouslySetInnerHTML={{ __html: coinData.description.en }}></div>
            </CoinDescription>
        </div>
    );
};

export default CoinDetails;