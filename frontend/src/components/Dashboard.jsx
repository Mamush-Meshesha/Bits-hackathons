import  { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    cashFlow: 50000,
    pendingPayments: 10000,
    availableCredit: 100000,
    newOrders: 5,
    pendingShipments: 3,
    completedOrders: 12,
    lowStockItems: 8,
    outOfStock: 2,
    totalSKUs: 150,
  });

  // Create refs to store chart instances
  const financialChartRef = useRef(null);
  const ordersChartRef = useRef(null);
  const inventoryChartRef = useRef(null);

  useEffect(() => {
    // Get canvas contexts
    const financialCtx = document
      .getElementById("financialChart")
      .getContext("2d");
    const ordersCtx = document.getElementById("ordersChart").getContext("2d");
    const inventoryCtx = document
      .getElementById("inventoryChart")
      .getContext("2d");

    // Destroy previous charts if they exist
    if (financialChartRef.current) financialChartRef.current.destroy();
    if (ordersChartRef.current) ordersChartRef.current.destroy();
    if (inventoryChartRef.current) inventoryChartRef.current.destroy();

    // Create new charts and save instances to refs
    financialChartRef.current = new Chart(financialCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Cash Flow",
            data: [30000, 35000, 40000, 45000, 50000, 55000],
            borderColor: "#ff9900",
            tension: 0.1,
          },
        ],
      },
    });

    ordersChartRef.current = new Chart(ordersCtx, {
      type: "bar",
      data: {
        labels: ["New", "Pending", "Completed"],
        datasets: [
          {
            label: "Orders",
            data: [5, 3, 12],
            backgroundColor: ["#ff9900", "#146eb4", "#66bb6a"],
          },
        ],
      },
    });

    inventoryChartRef.current = new Chart(inventoryCtx, {
      type: "doughnut",
      data: {
        labels: ["In Stock", "Low Stock", "Out of Stock"],
        datasets: [
          {
            data: [140, 8, 2],
            backgroundColor: ["#66bb6a", "#ffa726", "#ef5350"],
          },
        ],
      },
    });

    const updateDashboard = () => {
      const cashFlow = Math.floor(Math.random() * 50000) + 30000;
      const pendingPayments = Math.floor(Math.random() * 15000) + 5000;
      const availableCredit = Math.floor(Math.random() * 50000) + 75000;
      const newOrders = Math.floor(Math.random() * 10);
      const pendingShipments = Math.floor(Math.random() * 5) + 1;
      const completedOrders = Math.floor(Math.random() * 10) + 10;
      const lowStockItems = Math.floor(Math.random() * 10) + 5;
      const outOfStock = Math.floor(Math.random() * 5);
      const totalSKUs = 150;

      setDashboardData({
        cashFlow,
        pendingPayments,
        availableCredit,
        newOrders,
        pendingShipments,
        completedOrders,
        lowStockItems,
        outOfStock,
        totalSKUs,
      });

      // Update chart data
      financialChartRef.current.data.datasets[0].data.push(cashFlow);
      financialChartRef.current.data.datasets[0].data.shift();
      financialChartRef.current.update();

      ordersChartRef.current.data.datasets[0].data = [
        newOrders,
        pendingShipments,
        completedOrders,
      ];
      ordersChartRef.current.update();

      inventoryChartRef.current.data.datasets[0].data = [
        totalSKUs - lowStockItems - outOfStock,
        lowStockItems,
        outOfStock,
      ];
      inventoryChartRef.current.update();
    };

    const interval = setInterval(updateDashboard, 30000);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      if (financialChartRef.current) financialChartRef.current.destroy();
      if (ordersChartRef.current) ordersChartRef.current.destroy();
      if (inventoryChartRef.current) inventoryChartRef.current.destroy();
    };
  }, []);

  return (
    <div>
      <header>
        <div className="logo">B2B Wholesale</div>
        <div className="search-bar">
          <input className="text-black"
            type="text"
            placeholder="Search products, services, or businesses..."
          />
        </div>
        <div className="account">
          <a
            href="#account"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Account
          </a>
        </div>
      </header>

      <nav>
        <ul>
          <li>
            <a href="#dashboard" className="active">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#marketplace">Marketplace</a>
          </li>
          <li>
            <a href="#profile">Business Profile</a>
          </li>
          <li>
            <a href="#payments">Payments</a>
          </li>
          <li>
            <a href="#inventory">Inventory</a>
          </li>
          <li>
            <a href="#analytics">Analytics</a>
          </li>
          <li>
            <a href="#loans">Loans & Credit</a>
          </li>
          <li>
            <a href="#messages">
              Messages <span className="notification-badge">3</span>
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <h2>Business Dashboard</h2>
        <div className="dashboard">
          <div className="dashboard-card">
            <h3>Financial Overview</h3>
            <p>
              Cash Flow: <span id="cashFlow">${dashboardData.cashFlow}</span>
            </p>
            <p>
              Pending Payments:{" "}
              <span id="pendingPayments">${dashboardData.pendingPayments}</span>
            </p>
            <p>
              Available Credit:{" "}
              <span id="availableCredit">${dashboardData.availableCredit}</span>
            </p>
            <div className="chart-container">
              <canvas id="financialChart"></canvas>
            </div>
            <a href="#financials" className="button">
              View Details
            </a>
          </div>

          <div className="dashboard-card">
            <h3>Recent Orders</h3>
            <p>
              New Orders: <span id="newOrders">{dashboardData.newOrders}</span>
            </p>
            <p>
              Pending Shipments:{" "}
              <span id="pendingShipments">
                {dashboardData.pendingShipments}
              </span>
            </p>
            <p>
              Completed Orders:{" "}
              <span id="completedOrders">{dashboardData.completedOrders}</span>
            </p>
            <div className="chart-container">
              <canvas id="ordersChart"></canvas>
            </div>
            <a href="#orders" className="button">
              Manage Orders
            </a>
          </div>

          <div className="dashboard-card">
            <h3>Inventory Status</h3>
            <p>
              Low Stock Items:{" "}
              <span id="lowStockItems">{dashboardData.lowStockItems}</span>
            </p>
            <p>
              Out of Stock:{" "}
              <span id="outOfStock">{dashboardData.outOfStock}</span>
            </p>
            <p>
              Total SKUs: <span id="totalSKUs">{dashboardData.totalSKUs}</span>
            </p>
            <div className="chart-container">
              <canvas id="inventoryChart"></canvas>
            </div>
            <a href="#inventory" className="button">
              Update Inventory
            </a>
          </div>

          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <a href="#createInvoice" className="button">
              Create Invoice
            </a>
            <a href="#applyLoan" className="button button-secondary">
              Apply for Loan
            </a>
            <a href="#addProduct" className="button">
              Add New Product
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
