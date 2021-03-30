//material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

// https://react-google-charts.com/
import Chart from "react-google-charts";

const barChart = (props) => (
    <Grid container justify="center" style={{ margin: "50px auto" }}>
        <Grid item xs={12} sm={12} md={10} lg={6}>
            <Typography variant="h4">BarChart</Typography>
            <Chart
                width={'100%'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={props.data}
                options={{
                    chart: {
                        title: 'BarChart',
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </Grid>
    </Grid>
)

export default barChart