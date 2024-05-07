import React from "react";
import styled from "styled-components";
import { formatCurrency } from "../utils";

const StatisticsContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
`;

const StatTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const Statistics = ({ statistics }) => {
  const { totalCount, totalSale, soldCount, unsoldCount } = statistics;

  return (
    <StatisticsContainer>
      <StatCard>
        <StatTitle>Total Transactions</StatTitle>
        <StatValue>{totalCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Total Sale</StatTitle>
        <StatValue>{formatCurrency(totalSale)}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Sold Items</StatTitle>
        <StatValue>{soldCount}</StatValue>
      </StatCard>
      <StatCard>
        <StatTitle>Unsold Items</StatTitle>
        <StatValue>{unsoldCount}</StatValue>
      </StatCard>
    </StatisticsContainer>
  );
};

export default Statistics;
