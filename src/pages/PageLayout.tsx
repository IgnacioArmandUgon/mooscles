import React from 'react';
import { Navbar } from './../components/Navbar';
const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='max-w-[1300px] mx-auto p-4'>{children}</div>
    </>
  );
};

export default PageLayout;
