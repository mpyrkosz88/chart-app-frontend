//material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

// https://react-google-charts.com/
import Chart from "react-google-charts";

const lineChart = (props) => (
    <Grid container justify="center">
        <Grid item xs={12} sm={12} md={10} lg={6} >
            <Typography variant="h4">LineChart</Typography>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={props.data}
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
)

export default lineChart