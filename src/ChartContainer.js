import React, { Component } from 'react';

import openSocket from 'socket.io-client';

//material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

// https://react-google-charts.com/
import Chart from "react-google-charts";

const uri = process.env.REACT_APP_API_URL;

class ChartContainer extends Component {

    state = {
        chartData:[
            ['x', 'x(y)'],
          ],
        minRange: -100,
        maxRange: 100,
        rangeData: [],
        barChartData: [['Range','Counter']],
        currentNumber: 0,
        inputValue: '',
    }

    componentDidMount() {
      this.createRange(this.state.minRange, this.state.maxRange)
        const socket = openSocket(uri);
        socket.on('data', data => {
            let updatedArray = this.state.chartData
            updatedArray.push([data.timestamp, data.value])
            this.setState({
                chartData:updatedArray,
                currentNumber: data.value
            })
            this.addToCounter(data.value)
        })
    }

    //creataing array with range for barChart
    createRange(start, end) {
      const arr =[]
      for(var i=start; i<end-9; i=i+10) {
        arr.push([i, i+10, 0])
      }
      this.setState({
        rangeData: arr
      })
    }


    // adding amount of numbers from the range
    addToCounter(number) {
      const arr = this.state.rangeData
      if (arr.length>0) {
        for(let i=0; i<20; i++) {
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
      for(var i=0; i<20; i++) {
        barChartData[i+1] = [arr[i][0].toString() + ':' + arr[i][1].toString(), arr[i][2]]
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
      if(this.state.inputValue >= this.state.minRange && this.state.inputValue <= this.state.maxRange) {
        if (this.state.currentNumber > this.state.inputValue) {
          toast = <p  style={{fontSize: 24}}> Toast: {this.state.currentNumber} </p>
        }
        else {
          toast = null
        }
      }
      else {
        toast = <p style={{color: "red"}}>Please enter number from range -100 to 100</p>
      }

      // data for line chart
      let lineChartData = [['x', 'x(y)'], [0,0]]
      if(this.state.chartData.length > 1) {
        lineChartData = this.state.chartData
      }

      // data for bar chart
      let barChartData = [['Range','Counter'], [0,0]]
      if(this.state.barChartData.length >1 ){
        barChartData = this.state.barChartData

      }

          return (
            <Grid container style={{ padding: 20 }}> 
            <Grid container justify="center">
                
                <Grid item xs={12} sm={12} md={10} lg={6} >
                <Typography variant="h4">LineChart</Typography>
                  <Chart
                  width={'100%'}
                  height={'400px'}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={lineChartData}
                  options={{
                    hAxis: {
                      title: 'Time',
                    },
                    vAxis: {
                      title: 'Number value',
                    },
                  }}
                  rootProps={{ 'data-testid': '1' }}
                  />
                </Grid>
              </Grid>
            
              <Grid container justify="center" style={{margin: "50px auto"}}>
                  <Grid item xs={12} sm={12} md={10} lg={6}>
                  <Typography variant="h4">BarChart</Typography>
                    <Chart
                        width={'100%'}
                        height={'300px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={barChartData}
                        options={{
                          chart: {
                            title: 'BarChart',
                          },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                      />
                  </Grid>
              </Grid>
              <Grid container justify="center" style={{margin: "50px auto"}}>
                <Grid item xs={12} sm={12} md={10} lg={6}>
                <Typography variant="h4">Alert threshold</Typography>
                <p>Current number: {this.state.currentNumber}</p>
                  <input 
                  type="number" 
                  value={this.state.inputValue} 
                  min={this.state.minRange} 
                  max={this.state.maxRange}
                  style={{width: "50%"}}
                  onChange={(e) => this.handleChange(e)}/>
                  {toast}
                </Grid>
              </Grid>
            </Grid>
        )
    }
}

export default ChartContainer