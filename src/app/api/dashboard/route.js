import { NextResponse } from 'next/server';

const generateData = (factor = 1) => ({
  aum: {
    value: `${(12.19 * factor).toFixed(2)} Cr`,
    change: `+${(0.77 * factor).toFixed(2)}%`,
  },
  sip: {
    value: `${(1.39 * factor).toFixed(2)} Lakh`,
    change: `+${(0.5 * factor).toFixed(2)}%`,
  },
  summary: [
    { title: "Purchases", value: Math.floor(15 * factor), amount: `${(25000 * factor).toFixed(2)} INR` },
    { title: "Redemptions", value: Math.floor(5 * factor), amount: `${(8000 * factor).toFixed(2)} INR` },
    { title: "Rej. Transactions", value: Math.floor(1 * factor), amount: `${(500 * factor).toFixed(2)} INR` },
    { title: "SIP Rejections", value: Math.floor(2 * factor), amount: `${(1000 * factor).toFixed(2)} INR` },
    { title: "New SIP", value: Math.floor(10 * factor), amount: `${(15000 * factor).toFixed(2)} INR` },
  ],
  clients: [
    { name: 'Online', value: 3824 + Math.floor(50 * factor) },
    { name: 'Active', value: 541 + Math.floor(20 * factor) },
    { name: 'New', value: 60 + Math.floor(10 * factor) },
    { name: 'Inactive', value: 2 + Math.floor(factor) },
  ],
  sipBusiness: [
      { name: 'Apr', bar: 18 * factor, line: 110 * factor },
      { name: 'May', bar: 15 * factor, line: 95 * factor },
      { name: 'Jun', bar: 16 * factor, line: 105 * factor },
  ],
  monthlyMis: [
      { name: 'Jan', line1: 200 * factor, line2: 300 * factor },
      { name: 'Feb', line1: 280 * factor, line2: 320 * factor },
      { name: 'Mar', line1: 350 * factor, line2: 310 * factor },
      { name: 'Apr', line1: 320 * factor, line2: 380 * factor },
      { name: 'May', line1: 400 * factor, line2: 350 * factor },
      { name: 'Jun', line1: 380 * factor, line2: 410 * factor },
  ],
});


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || '7days';

  let factor = 1;
  switch(filter) {
    case '3days': factor = 0.5; break;
    case '7days': factor = 1; break;
    case '10days': factor = 1.2; break;
    case '30days': factor = 2.5; break;
    default: factor = 1;
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const data = generateData(factor);
  return NextResponse.json(data);
}