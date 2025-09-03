'use client';
import { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ArrowUp, ShoppingCart, XCircle, Ban, PlusCircle } from 'lucide-react';
import { AreaChart, Area, Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// A reusable card component with dark mode and optional loading state
const Card = ({ title, children, viewReport = true, isLoading }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-gray-700 dark:text-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold">{title}</h3>
      {viewReport && <button className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded">View Report</button>}
    </div>
    {isLoading ? <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div> : children}
  </div>
);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('7days');
  const dashboardRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/dashboard?filter=${activeFilter}`);
      const result = await res.json();
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [activeFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleDownloadPdf = async () => {
    // PDF generation logic here...
  };

  const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];

  // THIS IS THE MAIN FIX: Show a loading message until the first data fetch is complete.
  if (!data) {
    return (
      <div className="p-4 text-center text-gray-700 dark:text-gray-200">
        <div className="animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex justify-end mb-4">
        <button onClick={handleDownloadPdf} className="bg-red-600 text-white font-bold py-2 px-4 rounded">
          Download PDF
        </button>
      </div>

      <div ref={dashboardRef} className="p-4 bg-gray-100 dark:bg-gray-900">
        {/* Main Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700 dark:text-gray-200">Current AUM</h3>
                {isLoading ? <div className="h-12 w-3/4 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div> : <>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{data.aum.value}</p>
                    <p className="text-sm text-green-500 flex items-center"><ArrowUp size={16} /> {data.aum.change} MoM</p>
                </>}
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-gray-700 dark:text-gray-200">Current SIP</h3>
                {isLoading ? <div className="h-12 w-3/4 mt-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div> : <>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{data.sip.value}</p>
                    <p className="text-sm text-gray-500 flex items-center"><ArrowUp size={16} /> {data.sip.change} MoM</p>
                </>}
            </div>
        </div>

        {/* Dynamic Filter Buttons */}
        <div className="mb-4">
            <div className="flex space-x-2 mb-4">
                {[ {label: '3 Days', value: '3days'}, {label: '7 Days', value: '7days'}, {label: '10 Days', value: '10days'}, {label: '30 Days', value: '30days'} ].map(filter => 
                    <button 
                        key={filter.value} 
                        onClick={() => handleFilterClick(filter.value)}
                        className={`px-3 py-1 text-xs rounded-full shadow ${activeFilter === filter.value ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                    >
                      {filter.label}
                    </button>
                )}
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card title="CLIENTS" isLoading={isLoading}>
                {!isLoading && (
                  <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                          <Pie data={data.clients} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                              {data.clients.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                          </Pie>
                          <Tooltip/>
                          <Legend/>
                      </PieChart>
                  </ResponsiveContainer>
                )}
            </Card>
            <Card title="SIP BUSINESS CHART" isLoading={isLoading}>
                {!isLoading && (
                  <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={data.sipBusiness}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="bar" barSize={20} fill="#413ea0" />
                          <Area type="monotone" dataKey="line" fill="#8884d8" stroke="#8884d8" />
                      </ComposedChart>
                  </ResponsiveContainer>
                )}
            </Card>
            <Card title="MONTHLY MIS" isLoading={isLoading}>
                {!isLoading && (
                  <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={data.monthlyMis}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="line1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="line2" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                  </ResponsiveContainer>
                )}
            </Card>
        </div>
      </div>
    </div>
  );
}