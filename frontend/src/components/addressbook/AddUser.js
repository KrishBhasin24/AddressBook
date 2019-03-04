import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link,Redirect } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReplyIcon from '@material-ui/icons/Reply'
import SimpleReactValidator from 'simple-react-validator';

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
            'fname':'',
            'lname':'',
            'email':'',
            'phone':'',
            success:''
        }
       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleModify = this.handleModify.bind(this);
       this.validator = new SimpleReactValidator();
  }
  handleModify(e) {
    if (!this.validator.fieldValid([e.target.name])) {
        this.validator.showMessages();  
      }
      this.setState({
          [e.target.name]: e.target.value 
      });
  }

  handleSubmit(event) {
    if (this.validator.allValid()) {
      let self = this;
      event.preventDefault()
      const data = new FormData(event.target);
      var value = {
          fname: data.get('fname'),
          lname: data.get('lname'),
          email:data.get('email'),
          phone:data.get('phone')
      }
      fetch("http://localhost:3001/user/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
        body: JSON.stringify(value)
      }).then(function(response) {
        if (response.status >= 400) {
          alert("Bad response from server");
        }
        return response.json();
      }).then(function(data) {
          if(data === "success"){
            alert('Address Added');
            self.setState({success:true});
          }
      }).catch(function(err) {
          alert(err);
      });
    }
    else {
        this.validator.showMessages();
        event.preventDefault()
    }
  }
  render() {
        const { classes } = this.props;
        if (this.state.success === true) {
          return <Redirect to='/' />
        }
        return (
            <div className="container register-form">
                <form onSubmit={this.handleSubmit} method="POST" >
                    <TextField id="standard-full-width" label="First Name" style={{ margin: 8 }} fullWidth name="fname" margin="normal" onChange={this.handleModify} />
                    {this.validator.message('First Name', this.state.fname, 'required|alpha_space')}
                    <TextField id="standard-full-width" label="Last Name" style={{ margin: 8 }} fullWidth name="lname" margin="normal" onChange={this.handleModify} />
                    {this.validator.message('Last Name', this.state.lname, 'required|alpha_space')}
                    <TextField id="standard-full-width" label="Email" style={{ margin: 8 }} fullWidth  name="email" margin="normal" onChange={this.handleModify} />
                    {this.validator.message('Email', this.state.email, 'required|email')}
                    <TextField id="standard-full-width" label="Phone" style={{ margin: 8 }} fullWidth  type="phone" margin="normal" name="phone" value={this.state.phone} onChange={this.handleModify} />
                     {this.validator.message('Phone', this.state.phone, 'required|phone|max:10')}
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