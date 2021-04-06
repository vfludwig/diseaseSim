import React from 'react';
import './App.css';
import './styles.css';
import {
	AppBar,
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select, TextField,
	Toolbar,
	Typography, withStyles
} from "@material-ui/core";
import * as theme from "@material-ui/system";

const styles = {
	body: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	inputs: {
		marginTop: "2em",
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		textAlign: 'center'
	},
	formControl: {
		minWidth: 120,
	},
	display: {
		marginTop: "16px",
		flexGrow: 100,
		backgroundColor: "#d8d8d8"
	}
};

class Sim extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startDisabled: true,
			disease: null,
			population: null
		}
	}

	componentDidMount() {
		document.title = "Disease Sim"
	}

	handleChange = (e) => {
		const value = e.target.value;
		this.setState({ disease: value });
		if (e.target.value !== null && this.state.population > 0) { this.setState({ startDisabled: false }); }
	}

	onPopChange = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, "");
		this.setState({ population: value });
	}

	startSim = () => {
		console.log("Start sim");
	}

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">Disease Sim</Typography>
					</Toolbar>
				</AppBar>
				<div className={classes.body}>
					<div className={classes.inputs}>
						<TextField
							style={{
								marginRight: "2em"
							}}
							label="Population Size"
							type="number"
							value={this.state.population}
							onChange={this.onPopChange}
						/>
						<FormControl className={classes.formControl}>
							<InputLabel id="demo-simple-select-label">Disease</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={this.state.disease}
								onChange={this.handleChange}
							>
								<MenuItem value={"covid19"}>COVID-19</MenuItem>
								<MenuItem value={"flu"}>Flu</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className={classes.inputs}>
						<Button variant="contained" color="primary" onClick={this.startSim} disabled={this.state.startDisabled}>Start</Button>
					</div>
					<div className={classes.display}>

					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(Sim);