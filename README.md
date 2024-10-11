# Crypto Vista

Crypto Vista is a modern web application for tracking and analyzing cryptocurrencies, built with React and styled-components. It provides real-time data, portfolio management, and detailed information about various cryptocurrencies.

## Features

- 📊 Real-time cryptocurrency data display
- 💼 Personal cryptocurrency portfolio management
- 🌓 Light and dark theme support
- 📈 Detailed information and price charts for each cryptocurrency
- 🚀 Optimized performance with data caching
- 🔍 Cryptocurrency search with autocomplete functionality

## Technologies

- React
- React Router
- Styled Components
- Axios
- React Table
- Recharts

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (version 14.0.0 or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/s1rusOne/crypto_vista.git
   ```

2. Navigate to the project directory:

   ```
   cd crypto-vista
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application in development mode, run:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create a production-ready build, run:

```
npm run build
```

This will create an optimized version of the application in the `build` folder.

## Project Structure

```
crypto-vista/
  ├── src/
  │   ├── components/
  │   │   ├── Dashboard.js
  │   │   ├── CoinDetails.js
  │   │   ├── Portfolio.js
  │   │   ├── Header.js
  │   │   └── ErrorBoundary.js
  │   ├── contexts/
  │   │   └── ThemeProvider.js
  │   ├── styles/
  │   │   └── StyledComponents.js
  │   ├── App.js
  │   └── index.js
  ├── public/
  ├── package.json
  └── README.md
```

## Usage

- **Dashboard**: The main page displays a list of cryptocurrencies with current prices and 24-hour changes.
- **Coin Details**: Click on any cryptocurrency to view detailed information and price charts.
- **Portfolio**: Add cryptocurrencies to your portfolio to track their value. The portfolio data persists across sessions.
- **Theme Toggle**: Use the theme toggle in the header to switch between light and dark themes.

## API Usage and Rate Limiting

This application uses the CoinGecko API to fetch cryptocurrency data. Please note that there are rate limits for API requests. The application implements caching to minimize the number of requests and handle potential API unavailability.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
