"use client";

import { useEffect, useMemo, useState } from "react";
import { Advocate } from './api/advocates/model'
import { Table, TableCell, TableHeader, TableHeaderCell, TableRow, Tag } from './components';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const filteredAdvocates = useMemo(() => {
    if (!searchTerm) return advocates;
    const loweredTerm = searchTerm.toLowerCase();
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(loweredTerm) ||
        advocate.lastName.toLowerCase().includes(loweredTerm) ||
        advocate.city.toLowerCase().includes(loweredTerm) ||
        advocate.degree.toLowerCase().includes(loweredTerm) ||
        advocate.specialties.some((specialty) => specialty.toLowerCase().includes(loweredTerm)) ||
        advocate.yearsOfExperience === parseInt(loweredTerm) ||
        advocate.phoneNumber.toString().includes(loweredTerm)
      );
    });
  }, [advocates, searchTerm])

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div className="flex flex-col sm:flex-row items-center gap-2 pb-4">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
          className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSearchTerm('')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Reset
        </button>
      </div>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell width="10%">First Name</TableHeaderCell>
            <TableHeaderCell width="10%">Last Name</TableHeaderCell>
            <TableHeaderCell width="10%">City</TableHeaderCell>
            <TableHeaderCell width="5%">Degree</TableHeaderCell>
            <TableHeaderCell width="45%">Specialties</TableHeaderCell>
            <TableHeaderCell width="10%">Years of Experience</TableHeaderCell>
            <TableHeaderCell width="10%">Phone Number</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {filteredAdvocates.map((advocate, index) => (
            <TableRow
              key={advocate.firstName}
            >
              <TableCell>{advocate.firstName}</TableCell>
              <TableCell>{advocate.lastName}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                {advocate.specialties.map((s, index) => (
                  <Tag key={index}>{s}</Tag>
                ))}
              </TableCell>
              <TableCell>{advocate.yearsOfExperience}</TableCell>
              <TableCell>{advocate.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </main>
  );
}
