import React, { useState, useEffect, useContext } from "react";
import RentalCard from "./RentalCard";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Input,
    Row,
    Col,
} from "reactstrap";
import UserContext from '../../context/UserContext';

const RentalList = () => {
    const { state: userState } = useContext(UserContext);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [reservations, setReservations] = useState([]);

    const fetchRentals = async (page, pageSize) => {
        const response = await fetch(
            "https://localhost:44403/api/v1/Rental/get-filtered",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userState.token}`
                },
                body: JSON.stringify({
                    filters: "",
                    sorts: "",
                    page: page,
                    pageSize: pageSize
                }),
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            setReservations(data.items);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
            setCurrentPage(page);
        } else {
            console.error(`HTTP error! status: ${response.status}`);
        }
    };

    useEffect(() => {
        fetchRentals(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container">
            <h1>Menage reservations</h1>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {reservations.map((rental, index) => (
                    <Col key={index}>
                        <RentalCard rental={rental} />
                    </Col>
                ))}
            </Row>

            <Row className="mt-2">
                <Col md={12} className="d-flex justify-content-center align-items-center">
                    <Pagination size="">
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink first onClick={() => handlePageChange(1)} />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                                previous
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem active={i + 1 === currentPage} key={i}>
                                <PaginationLink onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink
                                next
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </PaginationItem>
                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
                        </PaginationItem>
                    </Pagination>
                    <div className="ms-2 d-flex">
                        <Input
                            type="select"
                            className="form-select form-select-sm me-2"
                            style={{ width: "auto" }}
                            value={pageSize}
                            onChange={(e) => {
                                const newSize = Number(e.target.value);
                                setPageSize(newSize);
                                handlePageChange(1);
                            }}
                        >
                            <option value={2}>2</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </Input>
                        <div className="ms-2">Total items: {totalItems}</div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RentalList;
