import React, { useState, useEffect, useContext } from 'react';
import VehicleCard from './VehicleCard';
import { Pagination, PaginationItem, PaginationLink, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap';
import { ReservationContext } from '../../context/ReservationContext';

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [brand, setBrand] = useState('All');
  const [brandsToFilter, setBrandsToFilter] = useState({ 'All': '' });

  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterBrand, setFilterBrand] = useState('All');

  const { selectedDate } = useContext(ReservationContext);

  const fetchVehicles = async (page, pageSize) => {
    const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters: 'brand@=' + brandsToFilter[filterBrand],
        sorts: '',
        page: page,
        pageSize: pageSize,
        from: filterFrom === '' ? null : filterFrom,
        to: filterTo === '' ? null : filterTo
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
  }, [currentPage, pageSize, filterBrand, filterFrom, filterTo]);

  useEffect(() => {
    if (selectedDate) {
      setFrom(selectedDate.from);
      setTo(selectedDate.to);
    }
  }, [selectedDate]);

  useEffect(() => {
    const getOptions = async () => {
      const response = await fetch('https://localhost:44403/api/v1/Vehicle/get-filtered', {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        let brands = {
          'All': '', ...data.brand.reduce((obj, item) => {
            obj[item] = item;
            return obj;
          }, {})
        };

        setBrandsToFilter(brands);
      }
    };

    getOptions();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const applyFilters = () => {
    setFilterFrom(from);
    setFilterTo(to);
    setFilterBrand(brand);
  };

  const clearFilters = () => {
    setFrom('');
    setTo('');
    setBrand('All');
    setFilterFrom('');
    setFilterTo('');
    setFilterBrand('All');
  };

  return (
    <div className="container">
      <Row className="mb-3">
        <Col md={3}>
          <FormGroup>
            <Label for="brandSelect">Brand:</Label>
            <Input type="select" id="brandSelect" value={brand} onChange={(e) => setBrand(e.target.value)}>
              {Object.keys(brandsToFilter).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="fromDate">From:</Label>
            <Input type="date" id="fromDate" value={from} onChange={(e) => setFrom(e.target.value)} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="toDate">To:</Label>
            <Input type="date" id="toDate" value={to} onChange={(e) => setTo(e.target.value)} />
          </FormGroup>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button color="primary" className="me-2" onClick={applyFilters}>Filter</Button>
          <Button color="secondary" onClick={clearFilters}>Clear Filters</Button>
        </Col>
      </Row>

      {vehicles.map((vehicle, index) => (
        <VehicleCard key={index} vehicle={vehicle} />
      ))}

      <div className="mt-2 d-flex justify-content-center align-items-center">
        <Pagination size="">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={() => handlePageChange(1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem active={i + 1 === currentPage} key={i}>
              <PaginationLink onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
          </PaginationItem>
        </Pagination>
        <div className="ms-2 d-flex">
          <Input type="select" className="form-select form-select-sm me-2" style={{ width: 'auto' }} value={pageSize} onChange={(e) => { const newSize = Number(e.target.value); setPageSize(newSize); handlePageChange(1); }}>
            <option value={2}>2</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Input>
          <div className="ms-2">Total items: {totalItems}</div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;
