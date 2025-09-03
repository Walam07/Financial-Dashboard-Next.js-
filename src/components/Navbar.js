export default function Navbar() {
  const menuItems = ['HOME', 'CRM', 'UTILITIES', 'INSURANCE', 'ASSETS', 'MUTUAL', 'RESEARCH', 'TRANSACT ONLINE', 'GOAL GPS', 'FINANCIAL PLANNING', 'WEALTH REPORT', 'OTHER'];
  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex justify-center space-x-4 px-4 py-2 text-xs font-semibold overflow-x-auto">
        {menuItems.map(item => (
          <li key={item} className="cursor-pointer hover:bg-gray-700 p-2 rounded whitespace-nowrap">{item}</li>
        ))}
      </ul>
    </nav>
  );
}