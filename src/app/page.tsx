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
    return advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience === parseInt(searchTerm)
      );
    });
  }, [advocates, searchTerm])

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for:
        </p>
        <input style={{ border: "1px solid black" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={() => setSearchTerm('')}>Reset Search</button>
      </div>
      <br />
      <br />
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>Degree</TableHeaderCell>
            <TableHeaderCell>Specialties</TableHeaderCell>
            <TableHeaderCell>Years of Experience</TableHeaderCell>
            <TableHeaderCell>Phone Number</TableHeaderCell>
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
