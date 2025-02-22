"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Brand } from '@/interface/IBrand';

const HomePage = () => {

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch('/api/brands')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  return (
    <Layout>
      <h2>Brands</h2>
      <div>
        {brands.map(brand => (
          <Card key={brand.id}>
            <h3>{brand.name}</h3>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
