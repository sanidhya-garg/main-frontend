import { Container, Typography, CardContent, Card, Box, Button, CircularProgress } from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import React, { useState, useEffect } from 'react';
import InternshipTable from '../../components/table';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfirmApprovalDialogBox from '../../components/admin/confirmApprovalDialogBox';
// import PopOver from '../../components/student/popOver';

export default function AdminDashboard({ setShowAlert, setAlertMessage, setAlertSeverity }) {
  const [loading, setLoading] = useState(true);
  const [internshipTableRow, setInternshipTableRow] = useState([]);
  const navigate = useNavigate();

  const convertToTableRows = (jsonData) => {
    const jsonDataArray = [];
    
    for (let i = 0; i < jsonData.length; i++) {
      const oneJsonData = jsonData[i];
      console.log(oneJsonData);
      const convertedJsonData = {
        id: i + 1,
        company: oneJsonData.companyName,
        designation: oneJsonData.title,
        type: oneJsonData.type,
        stipend: oneJsonData.salary,
        deadline: oneJsonData.deadline,
        details: {id:oneJsonData.id,positions:oneJsonData.totalApplications,applied:10},
        update: oneJsonData.id,
        studentsApplied: oneJsonData.id,
        approval: oneJsonData.approval || 'pending',
      };
      jsonDataArray.push(convertedJsonData);
    }
    setInternshipTableRow(jsonDataArray);
  };

  const getInternship = async () => {
    const formData = {
      code: localStorage.adminCode,
      userID: localStorage.userID,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.adminCode,
      },
      body: JSON.stringify(formData),
     
      
    };
    const url = `${process.env.REACT_APP_ADMIN_URL}/job`;
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        convertToTableRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error: ', error);
      });
  };

  const internshipTableColumn = [
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'stipend',
      headerName: 'Stipend',
      flex: 1,
    },
    {
      field: 'approval',
      headerName: 'Approval Status',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <ConfirmApprovalDialogBox
            row={row}
            setShowAlert={setShowAlert}
            setAlertMessage={setAlertMessage}
            setAlertSeverity={setAlertSeverity}
            internshipTableRow={internshipTableRow}
            setInternshipTableRow={setInternshipTableRow}
          />
        );
      },
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <Button
            size="small"
            onClick={() => {
              return navigate('../details', { state: { jobId: value.id, applied: value.applied, positions:value.positions } });
            }}
          >
            <VisibilityRoundedIcon />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    getInternship();
  },[]);

  return (
    <Container sx={{ py: 2, mt: 9 }}>
      {/* <ConfirmApprovalDialogBox/> */}
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
           Opportunities
          </Typography>
          {loading ? (
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
            <InternshipTable column={internshipTableColumn} row={internshipTableRow} />
          )
          }
        </CardContent>
      </Card>
    </Container>
  );
}
