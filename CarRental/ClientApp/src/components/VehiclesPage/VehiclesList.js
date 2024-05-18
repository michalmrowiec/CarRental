﻿import React, { useState, useEffect, useContext } from 'react';
import VehicleCard from './VehicleCard';
import { Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
import { ReservationContext } from '../../context/ReservationContext';

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [brandsToFiltier, setBrandsToFiltier] = useState({ 'Wszystkie': '' });
  const [brand, setBrand] = useState('Wszystkie');

  const { selectedDate } = useContext(ReservationContext);

  const fetchVehicles = async (page, pageSize) => {
    const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters: 'brand@=' + brandsToFiltier[brand],
        sorts: '',
        page: page,
        pageSize: pageSize,
        from: from === '' ? null : from,
        to: to === '' ? null : to
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      setVehicles(data.items);
      setTotalPages(data.totalPages);
      setCurrentPage(page);
      setPageSize(pageSize);
      setTotalItems(data.totalItems);
    }
  };

  useEffect(() => {
    fetchVehicles(currentPage, pageSize);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (selectedDate) {
      setFrom(selectedDate.from);
      setTo(selectedDate.to);
    }
  }, [selectedDate]);

  return (
    <div className="container">
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        {Object.keys(brandsToFiltier).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <div>
        <label>From: </label>
        <Input type="date" onChange={(e) => setFrom(e.target.value)} value={from} />
        <label>To: </label>
        <Input type="date" onChange={(e) => setTo(e.target.value)} value={to} />
        <button onClick={() => fetchVehicles(1, pageSize)}>Filtruj</button>
        <button onClick={() => {
          setFrom('');
          setTo('');
          setBrand('Wszystkie');
          fetchVehicles(1, pageSize);
        }}>Wyczyść filtry</button>
      </div>

      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} />
      ))}

      <div className="mt-2 d-flex justify-content-center align-items-center">
        <Pagination size="">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => setCurrentPage(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => setCurrentPage(currentPage - 1)} />
          </PaginationItem>
          {[...Array(totalPages)].map((page, i) =>
            <PaginationItem active={i === currentPage - 1} key={i}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={() => setCurrentPage(currentPage + 1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={() => setCurrentPage(totalPages)} />
          </PaginationItem>
        </Pagination>
        <div className="ms-2 d-flex">
          <select
            className="form-select form-select-sm"
            style={{ width: 'auto', marginBottom: '1rem' }}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={2}>2</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <div className="ms-2">
            Total items: {totalItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;
