import React, { useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import {
    Table, Th, Td, Title, Button, Input, Subtitle, ErrorMessage, LoadingMessage
} from '../styles/StyledComponents';
import styled from 'styled-components';

const AutocompleteContainer = styled.div`
  position: relative;
`;

const AutocompleteList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.darkMode ? '#2c3e50' : '#ffffff'};
  border: 1px solid ${props => props.theme.darkMode ? '#34495e' : '#ced4da'};
  border-top: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
`;

const AutocompleteItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.darkMode ? '#34495e' : '#f8f9fa'};
  }
`;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [coinInput, setCoinInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [allCoins, setAllCoins] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchAllCoins = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const cachedData = localStorage.getItem('coinList');
            const cachedTimestamp = localStorage.getItem('coinListTimestamp');

            if (cachedData && cachedTimestamp) {
                const now = new Date().getTime();
                if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                    setAllCoins(JSON.parse(cachedData));
                    setIsLoading(false);
                    return;
                }
            }

            const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
            setAllCoins(response.data);
            localStorage.setItem('coinList', JSON.stringify(response.data));
            localStorage.setItem('coinListTimestamp', new Date().getTime().toString());
        } catch (err) {
            console.error('Failed to fetch coin list:', err);
            setError('Failed to load coin list. Please try again later.');
            const cachedData = localStorage.getItem('coinList');
            if (cachedData) {
                setAllCoins(JSON.parse(cachedData));
                setError('Using cached data. Some information might be outdated.');
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllCoins();
        loadPortfolio();
    }, [fetchAllCoins]);

    const loadPortfolio = () => {
        try {
            const savedPortfolio = localStorage.getItem('portfolio');
            if (savedPortfolio) {
                setPortfolio(JSON.parse(savedPortfolio));
            }
        } catch (err) {
            console.error('Failed to load portfolio from localStorage:', err);
            setError('Failed to load your portfolio. Please try again.');
        }
    };

    const savePortfolio = useCallback((newPortfolio) => {
        try {
            localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
        } catch (err) {
            console.error('Failed to save portfolio to localStorage:', err);
            setError('Failed to save your portfolio. Please try again.');
        }
    }, []);

    useEffect(() => {
        if (portfolio.length > 0) {
            savePortfolio(portfolio);
        }
    }, [portfolio, savePortfolio]);

    useEffect(() => {
        if (coinInput.length > 1) {
            const filtered = allCoins.filter(coin =>
                coin.name.toLowerCase().includes(coinInput.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(coinInput.toLowerCase())
            ).slice(0, 5);
            setFilteredCoins(filtered);
        } else {
            setFilteredCoins([]);
        }
    }, [coinInput, allCoins]);

    const addCoin = () => {
        const selectedCoin = allCoins.find(coin =>
            coin.name.toLowerCase() === coinInput.toLowerCase() ||
            coin.symbol.toLowerCase() === coinInput.toLowerCase()
        );

        if (selectedCoin && amountInput) {
            const amount = parseFloat(amountInput);
            if (isNaN(amount) || amount <= 0) {
                setError('Please enter a valid positive number for amount.');
                return;
            }

            const newPortfolio = [...portfolio, { coin: selectedCoin.name, id: selectedCoin.id, amount }];
            setPortfolio(newPortfolio);
            savePortfolio(newPortfolio);
            setCoinInput('');
            setAmountInput('');
            setError('');
        } else {
            setError('Please select a valid coin and enter an amount.');
        }
    };

    const removeCoin = (index) => {
        const newPortfolio = portfolio.filter((_, i) => i !== index);
        setPortfolio(newPortfolio);
        savePortfolio(newPortfolio);
    };

    const selectCoin = (coin) => {
        setCoinInput(coin.name);
        setFilteredCoins([]);
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Coin',
                accessor: 'coin',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <Button onClick={() => removeCoin(row.index)}>Remove</Button>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: portfolio });

    if (isLoading) return <LoadingMessage>Loading coin list...</LoadingMessage>;

    return (
        <div>
            <Title>Your Portfolio</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div style={{ marginBottom: '20px' }}>
                <AutocompleteContainer>
                    <Input
                        type="text"
                        value={coinInput}
                        onChange={(e) => setCoinInput(e.target.value)}
                        placeholder="Coin name or symbol"
                    />
                    {filteredCoins.length > 0 && (
                        <AutocompleteList>
                            {filteredCoins.map(coin => (
                                <AutocompleteItem key={coin.id} onClick={() => selectCoin(coin)}>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </AutocompleteItem>
                            ))}
                        </AutocompleteList>
                    )}
                </AutocompleteContainer>
                <Input
                    type="number"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="Amount"
                />
                <Button onClick={addCoin}>Add to Portfolio</Button>
            </div>
            {portfolio.length > 0 ? (
                <Table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            ) : (
                <Subtitle>Your portfolio is empty. Add some coins to get started!</Subtitle>
            )}
        </div>
    );
};

export default Portfolio;