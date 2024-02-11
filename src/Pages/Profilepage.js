import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Button,
    TextField,
    Stack,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Alert
} from '@mui/material';


const ProfilePage = () => {

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const [contactNo, setContactNo] = useState('');
    const [cityName, setCityName] = useState('');
    const [stateName, setStateName] = useState('');
    const [countryName, setCountryName] = useState('');

    const [profileErr, setProfileErr] = useState('');

    const navigate = useNavigate();

    const handlelogout = () => {
        window.localStorage.clear();
        navigate("/login");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`http://localhost:8000/api/v1/profile/${window.localStorage.getItem("user-Id")}`,
                    {
                        headers: {
                            token: "Bearer " + String(window.localStorage.getItem("token")),
                        },
                    }
                );
                setFirstName(data.data.user_first_name);
                setMiddleName(data.data.user_middle_name);
                setLastName(data.data.user_last_name);
                setGender(data.data.user_gender);
                setContactNo(data.data.user_mobile_number);
                setCityName(data.data.user_city);
                setStateName(data.data.user_state);
                setCountryName(data.data.user_country);
            } catch (err) {
                setProfileErr(err.message);
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            const data = await axios.post(`http://localhost:8000/api/v1/profile/${window.localStorage.getItem("user-Id")}`,
                {
                    user_first_name: firstName,
                    user_middle_name: middleName,
                    user_last_name: lastName,
                    user_gender: gender,
                    user_mobile_number: contactNo,
                    user_city: cityName,
                    user_state: stateName,
                    user_country: countryName
                },
                {
                    headers: {
                        token: "Bearer " + String(window.localStorage.getItem("token")),
                    }
                });

            console.log("updated");
            setProfileErr("");
        } catch (err) {
            console.log(err);
            setProfileErr(err.message);
        }
    }
    return (
        <>
            <h1>Profile</h1>
            <Stack style={{ width: '25%' }}>
                <TextField
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="outlined-helperText"
                    label="First Name"
                    helperText="Some important text"
                />
                <TextField
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    id="outlined-helperText"
                    label="Middle Name"
                    helperText="Some important text"
                />
                <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="outlined-helperText"
                    label="Last Name"
                    helperText="Some important text"
                />
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                    id="outlined-helperText"
                    label="ContactNo"
                    helperText="Some important text"
                />
                <TextField
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    id="outlined-helperText"
                    label="City"
                    helperText="Some important text"
                />
                <TextField
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    id="outlined-read-only-input"
                    label="State"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    id="outlined-read-only-input"
                    label="Country"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Stack>
            {profileErr !== '' && <Alert severity="error">{profileErr}</Alert>}
            <Button variant="contained" color="success" onClick={handleUpdate}>Update</Button>
            <Button variant="contained" onClick={handlelogout}>LogOut</Button>
        </>
    );
};

export default ProfilePage;