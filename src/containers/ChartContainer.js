import React, { Component } from 'react';

import openSocket from 'socket.io-client';

//material UI
import Grid from '@material-ui/core/Grid';

import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import InputThresHold from '../components/InputThresHold';

const uri = process.env.REACT_APP_API_URL;

class ChartContainer extends Component {

  state = {
    chartData: [
      ['x', 'x(y)'],
    ],
    minRange: -100,
    maxRange: 100,
    rangeData: [],
    barChartData: [['Range', 'Counter']],
    currentNumber: 0,
    inputValue: 0,
  }

  componentDidMount() {
    this.createRange(this.state.minRange, this.state.maxRange)
    const socket = openSocket(uri);
    socket.on('data', data => {
      let updatedArray = this.state.chartData
      updatedArray.push([data.timestamp, data.value])
      this.setState({
        chartData: updatedArray,
        currentNumber: data.value
      })
      this.addToCounter(data.value)
    })
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  //creataing array with range for barChart
  createRange(start, end) {
    const arr = []
    for (var i = start; i < end - 9; i = i + 10) {
      arr.push([i, i + 10, 0])
    }
    this.setState({
      rangeData: arr
    })
  }


  // adding amount of numbers from the range
  addToCounter(number) {
    const arr = this.state.rangeData
    if (arr.length > 0) {
      for (let i = 0; i < 20; i++) {
        if (number >= arr[i][0] && number < arr[i][1]) {
          let counter = arr[i][2]
          arr[i][2] = counter + 1
          this.setState({
            rangeData: arr
          })
        }
      }
    }
    this.changeDataForBarChart()
  }

  //changing data for Bar Chart
  changeDataForBarChart() {
    const barChartData = this.state.barChartData
    const arr = this.state.rangeData
    for (var i = 0; i < 20; i++) {
      barChartData[i + 1] = [arr[i][0].toString() + ':' + arr[i][1].toString(), arr[i][2]]
    }
    this.setState({
      barChartData: barChartData
    })
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }


  render() {
    let toast = null
    if (this.state.inputValue >= this.state.minRange && this.state.inputValue <= this.state.maxRange) {
      if (this.state.currentNumber > this.state.inputValue) {
        toast = <p style={{ fontSize: 24 }}> Toast: {this.state.currentNumber} </p>
      }
      else {
        toast = null
      }
    }
    else {
      toast = <p style={{ color: "red" }}>Please enter number from range -100 to 100</p>
    }

    // data for line chart
    let lineChartData = [['x', 'x(y)'], [0, 0]]
    if (this.state.chartData.length > 1) {
      lineChartData = this.state.chartData
    }

    // data for bar chart
    let barChartData = [['Range', 'Counter'], [0, 0]]
    if (this.state.barChartData.length > 1) {
      barChartData = this.state.barChartData

    }

    return (
      <Grid container style={{ padding: 20 }}>
        <LineChart data={lineChartData} />
        <BarChart data={barChartData} />
        <InputThresHold
          currentNumber={this.state.currentNumber}
          value={this.state.inputValue}
          minRange={this.state.minRange}
          maxRange={this.state.maxRange}
          onChangeHandler={(e) => this.handleChange(e)}
          toastData={toast}
        />
      </Grid>
    )
  }
}

export default ChartContainer