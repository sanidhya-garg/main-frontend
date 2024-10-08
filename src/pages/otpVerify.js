import { Card, CardContent, CardHeader, Container, Typography,CardActions, Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useCountDown from 'react-countdown-hook';
import OtpBox from "../components/otpBox/otpBox.js"

export default function OTPVerify({ BASE_URL, setStartUpDetails,
  setStudentDetails, setShowAlert, setAlertMessage, setAlertSeverity, user, signInOrSignUp, email, name }) {
  const navigate = useNavigate();



  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const initialTime = 99 * 1000;
  const interval = 1000;

  const handleOtpChange = (otp,length) => {
    
    if(length===6){ setOtp(otp)}};

  const [timeLeft, { start }] = useCountDown(initialTime, interval);

  useEffect(() => {
    start();
  }, []);

  const restart = useCallback(() => {
    const newTime = 99 * 1000;
    start(newTime);
  }, []);

  const resendOTP = () => {
    restart();
    if (user === 'Student') {
      if (signInOrSignUp === 'SignIn') {
        resendOTPLoginStudent();
      } else {
        resendOTPregisterStudent();
      }
    } else {
      if (signInOrSignUp === 'SignIn') {
        resendOTPLoginStartUp();
      } else {
        resendOTPregisterStartUp();
      }
    }
  };

  const verifyStartUpSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/startUp/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStartUpId', data.startUpDetails.id);
            localStorage.setItem('localStorageStartUpToken', data.token);
            setStartUpDetails(data.startUpDetails);
            setLoading(false);
            setAlertMessage('Sign in successfully.');
            setAlertSeverity('success');
            setShowAlert(true);
            navigate('../startUp/dashboard', {
              state: { type: 'Internship' },
            });
          } else if (data.status === 401) {
            setLoading(false);
            setAlertMessage('Wrong OTP.');
            setAlertSeverity('error');
            setShowAlert(true);
          } else {
            setLoading(false);
            setAlertMessage(data);
            setAlertSeverity('error');
            setShowAlert(true);
            console.log(data)
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyStartUpSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/startUp/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStartUpId', data.startUpDetails.id);
            localStorage.setItem('localStorageStartUpToken', data.token);
            setStartUpDetails(data.startUpDetails);
            setLoading(false);
            setAlertMessage('Sign Up successfully.');
            setAlertSeverity('success');
            setShowAlert(true);
            navigate('../startUp/dashboard');
          } else if (data.status === 401) {
            setLoading(false);
            setAlertMessage('Wrong OTP.');
            setAlertSeverity('error');
            setShowAlert(true);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyStudentSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const url = `${BASE_URL}/api/student/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.status);

          if (data.status === 200) {
            localStorage.setItem('localStorageStudentId', data.studentDetails.id);
            localStorage.setItem('localStorageStudentToken', data.token);
            setStudentDetails(data.studentDetails);
            setLoading(false);
            setAlertMessage('Sign in successfully.');
            setAlertSeverity('success');
            navigate('../student/home',);

          } else if (data.status === 401) {
            setLoading(false);
            setAlertMessage('Wrong OTP.');
            setAlertSeverity('error');
            setShowAlert(true);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const verifyStudentSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
      otp: otp,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/student/login/otp/verify`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem('localStorageStudentId', data.studentDetails.id);
            localStorage.setItem('localStorageStudentToken', data.token);
            setStudentDetails(data.studentDetails);
            setLoading(false);
            setAlertMessage('Sign Up successfully.');
            setAlertSeverity('success');
            setShowAlert(true);
            navigate('../student/home');
          } else if (data.status === 401) {
            setLoading(false);
            setAlertMessage('Wrong OTP');
            setAlertSeverity('error');
            setShowAlert(true);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTPLoginStudent = async () => {
    const formData = {
      email: email,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/student/login`;
    try {
      await fetch(url, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTPLoginStartUp = async (e) => {
    const formData = {
      email: email,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/startUp/login`;
    try {
      await fetch(url, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTPregisterStudent = async () => {
    const formData = {
      name: name,
      email: email,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/student/register`;
    try {
      await fetch(url, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const resendOTPregisterStartUp = async () => {
    const formData = {
      companyName: name,
      email: email,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/startUp/register`;
    try {
      await fetch(url, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const submitOTP = (e) => {
    if (user === 'Student') {
      if (signInOrSignUp === 'SignIn') {
        verifyStudentSignIn(e);
      } else {
        verifyStudentSignUp(e);
      }
    } else {
      if (signInOrSignUp === 'SignIn') {
        verifyStartUpSignIn(e);
      } else {
        verifyStartUpSignUp(e);
      }
    }
  };

  return (
    <Container style={{width:"100%"}}>
      <form onSubmit={submitOTP}>
        <Card>
          <CardHeader title={'Email Verification'} subheader="Please enter the 6-digit OTP that was sent to the email" />
          <CardContent  className='flex flex-row justify-center'>
            
            <OtpBox length={6} onChange={handleOtpChange} />





          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {loading ? <CircularProgress sx={{ color: 'white' }} size={25} /> : <Typography>Verify</Typography>}
            </Button>


          </CardActions>
          <CardActions sx={{ ml: 1, }}>
            <Typography>
              Didn't receive the OTP?{' '}
              {timeLeft === 0 ? (
                <Typography
                  color="primary"
                  display="inline"
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  }}
                  onClick={resendOTP}
                >
                  Resend
                </Typography>
              ) : (
                <Typography display="inline" color="primary">
                  0:{timeLeft / 1000} Sec
                </Typography>
              )}
            </Typography>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
}
