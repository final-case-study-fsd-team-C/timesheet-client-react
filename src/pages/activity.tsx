import React from 'react'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ActivityLog extends React.Component{
    constructor(props:any)
{
    super(props);
}

render() {
  
    return ( 
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> <b>Data </b> </TableCell>
            <TableCell> <b>Activity </b> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">  25/09/19
              </TableCell>
              <TableCell> Demo </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    )

}
}