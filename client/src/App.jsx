import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "./App.css";
const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const MonthSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;

  @media (max-width: 768px) {
  }
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [search, setSearch] = useState("");
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  const fetchData = async () => {
    try {
      const [transactionsResponse, combinedDataResponse] = await Promise.all([
        axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/transactions?month=${month}&search=${search}&page=${page}&limit=${limit}`
        ),
        axios.get(
          `${import.meta.env.VITE_SERVER_URL}/combined-data?month=${month}`
        ),
      ]);

      const { transactions, totalCount } = transactionsResponse.data;
      const { statsData, barChartData, pieChartData } =
        combinedDataResponse.data;

      setTransactions(transactions);
      setTotalCount(totalCount);
      setStatistics(statsData);
      setBarChartData(barChartData);
      setPieChartData(pieChartData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, search, page, limit]);

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <AppContainer>
      <Header>
        <h1>Transaction Dashboard</h1>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={handleSearchChange}
          />
          <MonthSelect value={month} onChange={handleMonthChange}>
            <option value={0}>All Months</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((monthIndex) => (
              <option key={monthIndex} value={monthIndex}>
                {new Date(0, monthIndex - 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </MonthSelect>
        </SearchBar>
      </Header>
      <Content>
        <LeftColumn>
          <TransactionTable
            transactions={transactions}
            totalCount={totalCount}
            page={page}
            limit={limit}
            onPageChange={handlePageChange}
          />
        </LeftColumn>
        <RightColumn>
          <Statistics statistics={statistics} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <BarChart data={barChartData} />
            <PieChart data={pieChartData} />
          </div>
        </RightColumn>
      </Content>
    </AppContainer>
  );
};

export default App;
