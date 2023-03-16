import React, { useState } from 'react';

const CustomersTable = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value.toUpperCase());
  };

  const filterCustomers = (customers) => {
    return customers.filter((customer) => {
      const name = customer.name.toUpperCase();
      return name.includes(searchQuery);
    });
  };

  const customers = [
    { name: 'Alfreds Futterkiste', country: 'Germany' },
    { name: 'Berglunds snabbkop', country: 'Sweden' },
    { name: 'Island Trading', country: 'UK' },
    { name: 'Koniglich Essen', country: 'Germany' },
    { name: 'Laughing Bacchus Winecellars', country: 'Canada' },
    { name: 'Magazzini Alimentari Riuniti', country: 'Italy' },
    { name: 'North/South', country: 'UK' },
    { name: 'Paris specialites', country: 'France' },
  ];

  const filteredCustomers = filterCustomers(customers);

  return (
    <div>
      <h2>My Customers</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for names.."
        title="Type in a name"
      />
      <table>
        <thead>
          <tr>
            <th style={{ width: '60%' }}>Name</th>
            <th style={{ width: '40%' }}>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;