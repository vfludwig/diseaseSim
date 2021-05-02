import React from 'react';
import './App.css';
import './styles.css';
import {AppBar, Button, TextField, Toolbar, Typography, withStyles} from "@material-ui/core";
import CanvasJSReact from "./canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
            population: "",
            immunity: "",
            startInfected: "",
            daysContagious: "",
            lockdownStart: "",
            maskStart: "",
            dataPoints: []
        }
    }

    componentDidMount() {
        document.title = "Disease Sim"
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.checkFilled() && prevState.startDisabled) {
            this.setState({startDisabled: false})
        }
    }

    checkFilled() {
        return (this.state.population && this.state.immunity && this.state.startInfected && this.state.daysContagious && this.state.lockdownStart && this.state.maskStart);
    }

    onNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        this.setState({[e.target.name]: value});
        this.checkFilled();
    }

    onLockdownChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value >= 0 && value <= 100) {
            this.setState({lockdownStart: value});
            this.checkFilled();
        } else {
            this.setState({lockdownStart: this.state.lockdownStart});
        }
    }

    onMaskChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value >= 0 && value <= 100 && !value.includes("e")) {
            this.setState({maskStart: value});
            this.checkFilled();
        } else {
            this.setState({maskStart: this.state.maskStart});
        }
    }

    startSim = () => {
        fetch("/run-sim", {
            method: "POST",
            cache: "no-cache",
            headers: {
                "content_type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(data => {
            let dataArray = [];
            let i = 0;
            for (i; i < data.contagiousList.length; i++) {
                dataArray.push({"x": i, "y": data.contagiousList[i]})
            }
            this.setState({dataPoints: dataArray});
        });
        this.chart.render()
    }

    render() {
        const {classes} = this.props;
        const options = {
            animationEnabled: true,
            theme: "light1",
            title: {
                text: ""
            },
            axisY: {
                title: "Number of Contagious",
                minimum: 0,
                maximum: this.state.population
            },
            axisX: {
                title: "Days"
            },
            data: [{
                type: "line",
                toolTipContent: "Day {x}: Number of Contagious = {y}",
                dataPoints: this.state.dataPoints
            }]
        }
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
                            name="population"
                            label="Population Size"
                            type="number"
                            value={this.state.population}
                            onChange={this.onNumberChange}
                            onKeyDown={e => (e.key === "E" || e.key === "e" || e.key === ".") && e.preventDefault()}
                        />
                        <TextField
                            style={{
                                marginRight: "2em"
                            }}
                            name="immunity"
                            label="Immunity Percentage"
                            type="number"
                            value={this.state.immunity}
                            onChange={this.onNumberChange}
                            onKeyDown={e => (e.key === "E" || e.key === "e" || e.key === ".") && e.preventDefault()}
                        />
                        <TextField
                            style={{
                                marginRight: "2em"
                            }}
                            name="startInfected"
                            label="Starting # of Infected"
                            type="number"
                            value={this.state.startInfected}
                            onChange={this.onNumberChange}
                            onKeyDown={e => (e.key === "E" || e.key === "e" || e.key === ".") && e.preventDefault()}
                        />
                        <TextField
                            style={{
                                marginRight: "2em"
                            }}
                            name="daysContagious"
                            label="Days Contagious"
                            type="number"
                            value={this.state.daysContagious}
                            onChange={this.onNumberChange}
                            onKeyDown={e => (e.key === "E" || e.key === "e" || e.key === ".") && e.preventDefault()}
                        />
                        <TextField
                            style={{
                                marginRight: "2em",
                                width: 199
                            }}
                            name="lockdownStart"
                            label="Start of Lockdown"
                            placeholder="0-100"
                            type="number"
                            value={this.state.lockdownStart}
                            onChange={this.onLockdownChange}
                            inputProps={{
                                "min": 0,
                                "max": 100
                            }}
                            onKeyDown={e => (e.key === "E" || e.key === "e" || e.key === ".") && e.preventDefault()}
                        />
                        <TextField
                            style={{
                                marginRight: "2em",
                                width: 199
                            }}
                            name="maskStart"
                            label="Start of Mask Mandate"
                            placeholder="0-100"
                            type="number"
                            value={this.state.maskStart}
                            onChange={this.onMaskChange}
                            inputProps={{
                                "min": 0,
                                "max": 100
                            }}
                            onKeyDown={e => (e.key === "E" || e.key === "e" || e.key === ".") && e.preventDefault()}
                        />
                    </div>
                    <div className={classes.inputs}>
                        <Button variant="contained" color="primary" onClick={this.startSim}
                                disabled={this.state.startDisabled}>Start</Button>
                    </div>
                    <div className={classes.display}>
                        <CanvasJSChart
                            key={this.state.dataPoints.toString()}
                            options={options}
                            onRef={ref => this.chart = ref}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Sim);