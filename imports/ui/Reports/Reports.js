import React from 'react';
import NumberOfJobs from './NumberOfJobs.js';
import TotalSales from './TotalSales.js';
import CashJobs from './CashJobs.js';
import AccountJobs from './AccountJobs.js';
import JobsPerDriver from './NumberOfJobs.js';
import JobsPerVehicle from './JobsPerVehicle.js';
import ValueOfJobsPerDriver from './ValueOfJobsPerDriver.js';
import ValueOfJobsPerVehicle from './ValueOfJobsPerVehicle.js';


class Reports extends React.Component<{}> {
  render() {
    return (
      <div>
        <NumberOfJobs />
        <TotalSales />
        <CashJobs />
        <AccountJobs />
        <JobsPerDriver />
        <JobsPerVehicle />
        <ValueOfJobsPerDriver />
        <ValueOfJobsPerVehicle />
      </div>
    );
  }
}

export default Reports;
