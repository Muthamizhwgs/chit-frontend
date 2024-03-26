import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  const filteredPaths = paths.filter((_, index) => index !== 3);

  return (
    <div className='pl-8 py-5 '>
      <span className='font-medium text-gray-600 mr-1'>Admin &gt;</span>
      {filteredPaths.map((path, index) => (
        <span key={index} className={`${index === filteredPaths.length - 1 ? 'text-[#176b87] border-b-2 pb-0.5 border-[#176b87]': 'text-gray-600' } ${index === 0 ? 'hidden' : ''} font-medium mr-1`}>
          <Link to={path.url} className=''><span className=''></span>{path.name}</Link>
          {index < filteredPaths.length - 1 && ' >'}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
