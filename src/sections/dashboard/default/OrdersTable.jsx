import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from '@mui/material';

// third-party
import Dot from 'components/@extended/Dot';
import FormatDate from '../../../utils/defult/FormatDate';
import { getEnquiries } from '../../../pages/container/enquries/slice';

const statusMap = {
  0: { color: 'warning', label: 'High' },
  1: { color: 'primary', label: 'Medium' },
  2: { color: 'orange', label: 'Low' }
};

// ==============================|| ENQUIRIES TABLE FROM REDUX ||============================== //

export default function EnquiriesTable() {
  const dispatch = useDispatch();
  const { enquiries } = useSelector((state) => state.enquiries);

  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Enquiry ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enquiries?.length > 0 ? (
              enquiries.slice(0, 5).map((enq, index) => (
                <TableRow key={enq.enqNo || index}>
                  <TableCell>{enq.enqNo}</TableCell>
                  <TableCell>{enq.fName}</TableCell>
                  <TableCell>{enq.mobile}</TableCell>
                  <TableCell>{enq.email}</TableCell>
                  <TableCell>{FormatDate(enq.updatedAt)}</TableCell>
                  <TableCell>{enq.location}</TableCell>
                </TableRow>
              ))

            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No enquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
