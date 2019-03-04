import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ListUser from './addressbook/ListUser';
import EditUser from './addressbook/EditUser';
import AddUser from './addressbook/AddUser';
import DeleteUser from './addressbook/DeleteUser';
import Header from './layout/Header';

import { BrowserRouter,Route} from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    
  },
  container:{
  	margin: '0 auto',
  },
});

const App = (props) =>{
	const { classes } = props;
	return(
		<div className={classes.root}>
		<Grid container spacing={16}>
			<Grid item xs={10} className={classes.container}>
				<Header />
			</Grid>
			<Grid item xs={10} className={classes.container}>
				<BrowserRouter>
					<div>
						<Route path="/" exact component={ListUser} />
						<Route path="/edit"  component={EditUser} />
						<Route path="/add"  component={AddUser} />
						<Route path="/delete"  component={DeleteUser} />
						 
					</div>
				</BrowserRouter>
			</Grid> 
		</Grid>

		
		
		</div>
	);
};


export default withStyles(styles)(App);