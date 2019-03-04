import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hide',
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  },
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class ListUser extends Component {
  constructor(props) {
      super(props)
      this.state = {
          users: []
      }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id){
    var value = {
      id: id,
    }
    fetch("http://localhost:3001/user/delete/"+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'
        },
         body: JSON.stringify(value)
    }).then(function(response) {
        if (response.status >= 400) {
            alert("Bad response from server");
        }
    }).then(function(val) {
          window.location.reload();
    }).catch(function(err) {
          alert(err)
    });
  };

  

	componentDidMount() {
        let self = this;
        fetch('http://localhost:3001/user', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({users: data});
        }).catch(err => {
        console.log(err);
        })
	}

    render() {
        const { classes } = this.props;
        const message = this.state.users.message;
        return (
            <div>
             <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell >First Name </CustomTableCell>
                    <CustomTableCell align="right">Last Name </CustomTableCell>
                    <CustomTableCell align="right">Email </CustomTableCell>
                    <CustomTableCell align="right">Phone</CustomTableCell>
                    <CustomTableCell align="right"></CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {message ? (
                    <TableRow className={classes.row} >
                      <CustomTableCell colSpan="5" component="th" scope="row">
                              "No Record Found"
                      </CustomTableCell>
                    </TableRow>    
                  ) : (
                    this.state.users.map(row =>
                      <TableRow className={classes.row} key={row.id}>
                          <CustomTableCell component="th" scope="row">
                              {row.fname}
                          </CustomTableCell>
                          <CustomTableCell align="right">{row.lname}</CustomTableCell>
                          <CustomTableCell align="right">{row.email}</CustomTableCell>
                          <CustomTableCell align="right">{row.phone}</CustomTableCell>
                          <CustomTableCell align="right">
                              <Link to={{ pathname:'edit',state: { id: row.id}  }} >
                                  <IconButton aria-label="Edit">
                                        <EditIcon />
                                      </IconButton>

                              </Link>
                              
                              <IconButton onClick={() => { if (window.confirm('Are you sure you wish to delete this Address?')) this.handleDelete(row.id) } } aria-label="Delete">
                                    <DeleteIcon />
                              </IconButton>
                              
                          </CustomTableCell>
                      </TableRow>
                    )
                  )}
                
                   
                </TableBody>
            </Table>
            <Link to={{ pathname:'add' }} >
                <Fab color="secondary" className={classes.absolute}>
                  <AddIcon />
                </Fab>
            </Link>
        
            </div>
        );
    }
}


export default withStyles(styles)(ListUser);