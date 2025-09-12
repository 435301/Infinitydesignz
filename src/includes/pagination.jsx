// src/components/PaginationComponent.js
import React from 'react';
import { Pagination } from 'react-bootstrap';
import "../css/user/pagination.css";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-3" >
      <Pagination>
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
