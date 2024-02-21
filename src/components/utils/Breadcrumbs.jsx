import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <div className='pl-8 py-5'>
      {paths.map((path, index) => (
        <span key={index} className={`${index == true ? 'text-[#176b87]': 'text-gray-600' } font-medium `}>
          <Link to={path.url}>{path.name}</Link>
          {index < paths.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
