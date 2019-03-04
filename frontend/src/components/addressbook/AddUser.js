import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link,Redirect } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReplyIcon from '@material-ui/icons/Reply'




const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success:''
        }
       this.handleSubmit = this.handleSubmit.bind(this);
       this.validate = this.validate.bind(this);
	}

    validate(value){
        if(!value.fname){
            console.log("first name is empty");
            this.refs.fname.innerHTML = "first name is empty";
        }
    }


	handleSubmit(event) {
        let self = this;
        event.preventDefault()
        const data = new FormData(event.target);
        var value = {
            fname: data.get('fname'),
            lname: data.get('lname'),
            email:data.get('email'),
            phone:data.get('phone')

		}
        //this.validate(value);
		fetch("http://localhost:3001/user/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
            body: JSON.stringify(value)
		}).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
		}).then(function(data) {
            console.log(data)    
            if(data === "success"){
               self.setState({success:true});
            }
        }).catch(function(err) {
            console.log(err)
		});
        console.log(value) 
	}
	render() {
        const { classes } = this.props;

        console.log(this.state.success);
        if (this.state.success === true) {
          return <Redirect to='/' />
        }
        return (
            <div className="container register-form">
                <form onSubmit={this.handleSubmit} method="POST" >
                    <TextField
                      id="standard-full-width"
                      label="First Name"
                      style={{ margin: 8 }}
                      fullWidth
                      name="fname"
                      margin="normal"
                    />
                    <span ref='fname'></span>
                    <TextField
                      id="standard-full-width"
                      label="Last Name"
                      style={{ margin: 8 }}
                      fullWidth
                      required
                      name="lname"
                      margin="normal"
                    />
                    <TextField
                      id="standard-full-width"
                      label="Email"
                      type="email"
                      style={{ margin: 8 }}
                      fullWidth
                      required
                      name="email"
                      margin="normal"
                    />
                    <TextField
                      id="standard-full-width"
                      label="Phone"
                      style={{ margin: 8 }}
                      fullWidth
                      required
                      type="phone"
                      margin="normal"
                      name="phone"
                    />
                    
                    <Button type="submit" variant="contained" color="secondary" size="large" className={classes.button}>
                        <SaveIcon className={classes.leftIcon} />
                        Save
                    </Button>
                    <Link to={{ pathname:'/' }} >
                        <Button variant="contained" color="default" size="large" className={classes.button}>
                            <ReplyIcon className={classes.leftIcon} />
                            Back
                        </Button>
                    </Link>

                </form>
            </div>
        );
	}
}

export default withStyles(styles)(AddUser);