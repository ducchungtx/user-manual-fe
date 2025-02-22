"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Manual } from '@/interface/IManual';

const ManualsPage = () => {

  const [manuals, setManuals] = useState<Manual[]>([]);

  useEffect(() => {
    fetch('/api/manuals')
      .then(response => response.json())
      .then(data => setManuals(data))
      .catch(error => console.error('Error fetching manuals:', error));
  }, []);

  return (
    <Layout>
      <h2>Manuals</h2>
      <Table>
        <TableCaption>A list of manuals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Model Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Release Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manuals.map(manual => (
            <TableRow key={manual.id}>
              <TableCell>{manual.modelName}</TableCell>
              <TableCell>{manual.description}</TableCell>
              <TableCell>{manual.releaseDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default ManualsPage;
