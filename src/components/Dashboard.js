import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeProvider';
import {
    Table, Th, Td, Title, LoadingMessage, ErrorMessage, StyledLink
} from '../styles/StyledComponents';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const Dashboard = () => {
    const [coinsData, setCoinsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchCoins = async () => {
            const cachedData = localStorage.getItem('coinsData');
            const cachedTimestamp = localStorage.getItem('coinsDataTimestamp');

            if (cachedData && cachedTimestamp) {
                const now = new Date().getTime();
                if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
                    setCoinsData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
            }

            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 100,
                        page: 1,
                        sparkline: false
                    }
                });
                setCoinsData(response.data);
                localStorage.setItem('coinsData', JSON.stringify(response.data));
                localStorage.setItem('coinsDataTimestamp', new Date().getTime().toString());
                setLoading(false);
            } catch (err) {
                if (cachedData) {
                    setCoinsData(JSON.parse(cachedData));
                    setError('Using cached data. Failed to fetch latest coin data.');
                } else {
                    setError('Failed to fetch coin data');
                }
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Coin',
                accessor: 'name',
                Cell: ({ row }) => (
                    <StyledLink to={`/coin/${row.original.id}`}>
                        <img src={row.original.image} alt={row.original.name} width="20" height="20" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                        {row.original.name}
                    </StyledLink>
                ),
            },
            {
                Header: 'Price',
                accessor: 'current_price',
                Cell: ({ value }) => `$${value.toLocaleString()}`,
            },
            {
                Header: '24h Change',
                accessor: 'price_change_percentage_24h',
                Cell: ({ value }) => (
                    <span style={{ color: value > 0 ? (darkMode ? '#4cd137' : 'green') : (darkMode ? '#e84118' : 'red') }}>
                        {value.toFixed(2)}%
                    </span>
                ),
            },
            {
                Header: 'Market Cap',
                accessor: 'market_cap',
                Cell: ({ value }) => `$${value.toLocaleString()}`,
            },
        ],
        [darkMode]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: coinsData }, useSortBy);

    if (loading) return <LoadingMessage>Loading...</LoadingMessage>;

    return (
        <div>
            <Title>Cryptocurrency Dashboard</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {coinsData.length > 0 ? (
                <Table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </Th>
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
                <p>No data available</p>
            )}
        </div>
    );
};

export default Dashboard;