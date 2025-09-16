import React from 'react';
import { useLocation } from 'react-router-dom';
import './FilterWidget.css';

const FilterWidget = ({ onFilterClick, productCount = 0 }) => {
  const location = useLocation();

  // Show filter widget only on product pages
  const showFilterWidget = location.pathname.startsWith('/productos');

  if (!showFilterWidget) return null;

  return (
    <button className="filter-widget" onClick={onFilterClick}>
      <svg className="filter-icon-main" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M7 12h10M10 18h4"></path>
      </svg>
    </button>
  );
};

export default FilterWidget;