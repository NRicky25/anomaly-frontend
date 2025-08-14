import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select, Pagination } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { getReports } from "../services/api.js";
import axios from "axios";

const { Option } = Select;

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0,
  });

  const [filters, setFilters] = useState({
    min_amount: null,
    max_amount: null,
    is_fraud: null,
  });

  // Function to fetch data from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getReports(
        pagination.current,
        pagination.pageSize,
        filters
      );
      setTransactions(data.transactions);
      setPagination({
        ...pagination,
        total: data.total_count,
      });
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/reports/transactions",
        {
          params: { ...filters, download: true },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "fraud_report.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, filters]); // Re-fetch data whenever pagination or filters change

  const columns = [
    { title: "Time", dataIndex: "Time", key: "Time" },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Probability",
      dataIndex: "probability",
      key: "probability",
      render: (prob) => `${(prob * 100).toFixed(2)}%`,
    },
    {
      title: "Is Fraud",
      dataIndex: "is_fraud",
      key: "is_fraud",
      render: (isFraud) => (isFraud ? "Yes" : "No"),
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Fraud Reports</h1>
      <p className="text-gray-400 mb-8">
        View and filter historical transaction data.
      </p>

      <div className="flex justify-between mb-4">
        <div>
          <Input.Group compact>
            <Input
              style={{ width: 150 }}
              placeholder="Min Amount"
              prefix="$"
              onChange={(e) =>
                setFilters({ ...filters, min_amount: e.target.value })
              }
            />
            <Input
              style={{ width: 150 }}
              placeholder="Max Amount"
              prefix="$"
              onChange={(e) =>
                setFilters({ ...filters, max_amount: e.target.value })
              }
            />
            <Select
              placeholder="Fraud Status"
              style={{ width: 150 }}
              allowClear
              onChange={(value) => setFilters({ ...filters, is_fraud: value })}
            >
              <Option value={true}>Fraudulent</Option>
              <Option value={false}>Non-Fraudulent</Option>
            </Select>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={fetchData}
            >
              Search
            </Button>
          </Input.Group>
        </div>
        <Button icon={<DownloadOutlined />} onClick={handleDownload}>
          Download CSV
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={transactions}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={false}
      />

      <div className="mt-4 text-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={(page, pageSize) =>
            setPagination({ ...pagination, current: page, pageSize: pageSize })
          }
        />
      </div>
    </>
  );
};

export default Reports;
