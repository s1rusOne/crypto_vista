import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import {
    Table, Th, Td, Title, Button, Input, Subtitle
} from '../styles/StyledComponents';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [coinInput, setCoinInput] = useState('');
    const [amountInput, setAmountInput] = useState('');

    useEffect(() => {
        const savedPortfolio = localStorage.getItem('portfolio');
        if (savedPortfolio) {
            setPortfolio(JSON.parse(savedPortfolio));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    const addCoin = () => {
        if (coinInput && amountInput) {
            setPortfolio([...portfolio, { coin: coinInput, amount: parseFloat(amountInput) }]);
            setCoinInput('');
            setAmountInput('');
        }
    };

    const removeCoin = (index) => {
        const newPortfolio = [...portfolio];
        newPortfolio.splice(index, 1);
        setPortfolio(newPortfolio);
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

    return (
        <div>
            <Title>Your Portfolio</Title>
            <div style={{ marginBottom: '20px' }}>
                <Input
                    type="text"
                    value={coinInput}
                    onChange={(e) => setCoinInput(e.target.value)}
                    placeholder="Coin name"
                />
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