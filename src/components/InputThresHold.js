//material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

const inputThresHold = (props) => (
    <Grid container justify="center" style={{ margin: "50px auto" }}>
        <Grid item xs={12} sm={12} md={10} lg={6}>
            <Typography variant="h4">Alert threshold</Typography>
            <p>Current number: {props.currentNumber}</p>
            <input
                type="number"
                value={props.value}
                min={props.minRange}
                max={props.maxRange}
                placeholder="0"
                style={{ width: "50%" }}
                onChange={props.onChangeHandler} />
            {props.toastData}
        </Grid>
    </Grid>
)

export default inputThresHold