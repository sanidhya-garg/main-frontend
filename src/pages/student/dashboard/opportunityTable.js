import { Typography, Grid, CardContent, Card, Box, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import JobListing from '../../../components/student/JobListing';
import logo from './../logo.png';
import { useQuery } from '@tanstack/react-query';



// TODO : security and performance issue in the way student is varified if he/she has applied
// TODO : error handling

const checkStatus = (studentsApplied, studentId) => {
  for (let i = 0; i < studentsApplied.length; i++) {
    if (studentsApplied[i].studentId === studentId) {
      return studentsApplied[i].status;
    }
  }
  return 'Not Applied';
};

const convertToTableRows = (jsonData, studentId) => {
  const jsonDataArray = [];
  for (let i = 0; i < jsonData.length; i++) {
    const oneJsonData = jsonData[i];
    const convertedJsonData = {
      id: i + 1,
      company: oneJsonData.companyName,
      designation: oneJsonData.designation,
      stipend: oneJsonData.stipend,
      deadline: oneJsonData.deadline,
      status: checkStatus(oneJsonData.studentsApplied, studentId),
      details: oneJsonData.id,
      apply: {
        jobId: oneJsonData.id,
        status: checkStatus(oneJsonData.studentsApplied),
        deadline: oneJsonData.deadline,
      },
    };
    jsonDataArray.push(convertedJsonData);
  }
  console.log(jsonDataArray);
  return jsonDataArray;
};

const getOpportunityList = async (BASE_URL, type, studentId) => {
  const response = await fetch(`${BASE_URL}/api/student/jobs?type=${type}`)
  const data = await response.json()
  const jobList = data.jobs
  return convertToTableRows(jobList, studentId)
};

export default function Dashboard({ BASE_URL, studentDetails, setShowAlert, setAlertMessage, setAlertSeverity }) {
  const type = useLocation().state?.type || "Internship";
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(
    {
      queryKey: [`opportunites`, type], 
      queryFn: () => getOpportunityList(BASE_URL, type, studentDetails.id)
    }
  );


  return (
    <>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {type} Opportunities
            </Typography>
            {isLoading ? (
              <Box
                sx={{
                  height: 370.5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {data?.map((internship) => (
                  <Grid item xs={12} key={internship.id}>
                    <JobListing
                      logo={logo}
                      companyName={internship.company}
                      mission={internship.mission}
                      role={internship.designation}
                      salary={internship.stipend}
                      deadline={internship.deadline}
                      type={type}
                      status={internship.status}
                      hasApplied={internship.status === 'Applied'}
                      detailsButtonClick={() => {
                        navigate('../details', { state: { jobId: internship.details } });
                      }}
                      applyButtonClick={() => {
                        // Handle the apply button click
                        if (internship.status in ['Applied', 'Shortlisted', 'Selected', 'Not Shortlisted', 'Not Selected']) {
                          setShowAlert(true);
                          setAlertMessage('You have already applied for this job');
                          setAlertSeverity('warning');
                          navigate('../dashboard', { state: { type: type } });
                        } else {
                          navigate('../apply', { state: { jobId: internship.details, type: type } });
                        }
                      }}
                    />
                  </Grid>
                ))}
              </>
            )}
          </CardContent>
        </Card>
    </>
  );
}
