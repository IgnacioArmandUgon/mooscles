import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import { Exercise } from '../api/api';

export const Home = () => {
  return (
    <div className='m-2'>
      <PageTitle>Aquí están tus moocles</PageTitle>
    </div>
  );
};
