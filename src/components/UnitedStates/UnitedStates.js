import React, {useState, useEffect} from 'react';

import {Card, Typography, Grid} from '@material-ui/core';
import { Doughnut} from 'react-chartjs-2';
import CountUp from 'react-countup';
import './UnitedStates.css';
import {fetchUsaData} from '../../api';
import medicaldoctor from '../../images/medicaldoctor.svg';

const HeroSection = () => {

  const [usaData, setUsaData] = useState({});

  useEffect(() => {
    const fetchedUsaData = async() => {
      const data = await fetchUsaData();
      setUsaData(data);
    }
    
    fetchedUsaData();
  },[setUsaData]);

  const doughnutChart = ( usaData.confirmed ? (<Doughnut data= {{
    labels:[ 'Infected', 'Recovered', 'Deaths'],
    datasets:[{
      data: [usaData.confirmed.value, usaData.recovered.value, usaData.deaths.value],
      backgroundColor: ['rgba(20, 20, 255, 0.8)', 'rgba(20, 255, 20, 0.8)','rgba(255, 20, 20, 0.8)'],
      hoverBackgroundColor:['rgba(0, 0, 255, 1)', 'rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)']
    }]
  }}
  ></Doughnut>) : null)
  

    return(
        <div className="usa">
          <h1 className="us-heading"><img src={medicaldoctor} className="us-img" alt="Medical doctor" /><span style={{borderBottom:'2px solid '}}>UNITED STATES's REPORT</span></h1>
          {usaData.confirmed ? (
          <Grid container className="us-content" spacing={2}>

          <Grid item lg={6} md={6}>
          <Grid className="stats" container spacing={3}>
            <Grid className="g-card infected" component={Card} item lg={6} spacing={3}>  
            <Typography color="textSecondary" gutterBottom className="box-heading">Infected</Typography>
                            <Typography variant="h4">
                              <CountUp
                                start={0}
                                end={usaData.confirmed.value}
                                duration={2}
                                separator=","
                              >
                              </CountUp>
                                </Typography>
                            <Typography color="textSecondary" gutterBottom  ><Typography variant="h6" className="update">Updated:</Typography> {new Date(usaData.lastUpdate).toDateString()}</Typography>
                            <Typography color="textPrimary" className="bottom-line">Number of infected cases of COVID-19 in United States</Typography>
            </Grid>
            <Grid className="g-card recovered" component={Card} item lg={6} spacing={3}>
            <Typography color="textSecondary" gutterBottom className="box-heading">Recovered</Typography>
                            <Typography variant="h4">
                            <CountUp
                                start={0}
                                end={usaData.recovered.value}
                                duration={2}
                                separator=","
                              >
                              </CountUp>
                                </Typography>
                            <Typography color="textSecondary" gutterBottom><Typography variant="h6" className="update">Updated:</Typography> {new Date(usaData.lastUpdate).toDateString()}</Typography>
                            <Typography color="textPrimary" className="bottom-line">Number of recoveries from COVID-19 in United States</Typography>
            </Grid>
            <Grid className="g-card deaths" component={Card} item lg={6} spacing={3}>
            <Typography color="textSecondary" gutterBottom className="box-heading">Deaths</Typography>
                            <Typography variant="h4">
                            <CountUp
                                start={0}
                                end={usaData.deaths.value}
                                duration={2}
                                separator=","
                              >
                              </CountUp>
                                </Typography>
                            <Typography color="textSecondary" gutterBottom><Typography variant="h6" className="update">Updated:</Typography> {new Date(usaData.lastUpdate).toDateString()}</Typography>
                            <Typography color="textPrimary" className="bottom-line">Number of deaths due to COVID-19 in United States</Typography>
            </Grid>
          </Grid>
          </Grid>

          <Grid item lg={6} md={6} className="doughnut">
              {doughnutChart}
          </Grid>
        </Grid>) : <h6>Loading...</h6>}
        </div>
    );
}

export default HeroSection;
