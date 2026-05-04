import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";

import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FftSpectrumService } from "../../../../../../services/LoginPageService";

const COLORS = {
    primary: "#2196F3",
    secondary: "#FF5722",
    background: "#F5F5F5",
};



const SmallCard = ({ id, title, value, date, time, isActive, onClick, setActiveCard }) => {
    const cardColor = isActive ? COLORS.secondary : COLORS.primary;



    return (
        <Tooltip title={`${date} ${time}`} arrow>
            <Card
                sx={{
                    minWidth: 55,
                    maxWidth: 55,
                    height: 45,
                    margin: 1,
                    borderRadius: 3,
                    backgroundColor: isActive ? COLORS.secondary : COLORS.primary,
                    transition: "background-color 0.2s ease",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: isActive ? COLORS.secondary : COLORS.primary,
                    },
                }}
                onClick={() => {
                    setActiveCard(id); // Set this card as active when clicked
                    onClick();
                }}
            >
                <CardContent>
                    <Typography variant="body2" color="text.primary" align="center">
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};
const CardGroup = ({ onCardClick, fftList, setFftList, analogSensorList, deviceId }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchStartDate, setSearchStartDate] = useState("");
    const [searchEndDate, setSearchEndDate] = useState("");
    const [selectedTimeInterval, setSelectedTimeInterval] = useState("");
    const [currentDate, setCurrentDate] = useState(""); // Added state for current date
    const [displayedDate, setDisplayedDate] = useState(""); // State to track displayed date
    const [displayedDateIndex, setDisplayedDateIndex] = useState(0);
    const [activeCard, setActiveCard] = useState(null);



    const timeIntervals = [
        "0-4",
        "4-6",
        "6-8",
        "8-12",
        "12-16",
        "16-20",
        "20-24",
    ];

    useEffect(() => {
        if (fftList.length > 0) {
            setDisplayedDateIndex(0); // Reset displayed date index when data changes
            setCurrentDate(fftList[0]?.date || ""); // Initialize current date
        }
    }, [fftList]);


    useEffect(() => {
        // Check if both fromDate and toDate are not provided
        if (!searchStartDate && !searchEndDate) {
            // If both are not provided, set them to today's date
            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
            setSearchStartDate(formattedDate);
            setSearchEndDate(formattedDate);
        }

        FftSpectrumService(
            {
                deviceId: deviceId.deviceId || "",
                slaveId: parseInt(analogSensorList[0]?.slaveId || ""),
                fromDate: searchStartDate,
                toDate: searchEndDate
            },
            handleSuccess,
            handleException
        );
    }, [searchStartDate, searchEndDate]);


    const handleSuccess = (dataObject) => {
        setFftList(dataObject?.data || []);
    };
    console.log("")

    const handleException = (errorObject) => { };

    const filterFftListByDateRange = () => {
        const filteredList = fftList.filter((item) => {
            const itemDate = new Date(item.date);
            const startDate = new Date(searchStartDate);
            const endDate = new Date(searchEndDate);
            return itemDate >= startDate && itemDate <= endDate;
        });

        return filteredList;
    };

    const handleNextDateClick = () => {
        const filteredFftList = filterFftListByDateRange();
        const nextIndex = displayedDateIndex + 1;

        // Check if the next index is within the bounds of the filteredFftList
        if (nextIndex < filteredFftList.length) {
            // Update the displayed date index and current date
            setDisplayedDateIndex(nextIndex);
            setCurrentDate(filteredFftList[nextIndex].date);
        }
    };

    const handlePreviousDateClick = () => {
        const filteredFftList = filterFftListByDateRange();
        const previousIndex = displayedDateIndex - 1;

        // Check if the previous index is within the bounds of the filteredFftList
        if (previousIndex >= 0) {
            // Update the displayed date index and current date
            setDisplayedDateIndex(previousIndex);
            setCurrentDate(filteredFftList[previousIndex].date);
        }
    };


    const filterFftListByDateRangeAndTime = () => {
        const filteredList = fftList.filter((item) => {
            const itemDate = new Date(item.date);
            const startDate = new Date(searchStartDate);
            const endDate = new Date(searchEndDate);

            // Check if the selectedTimeInterval matches the item's time range
            if (selectedTimeInterval) {
                const [startTime, endTime] = selectedTimeInterval.split("-");
                const itemTime = parseInt(item.time, 10);
                return (
                    itemDate >= startDate &&
                    itemDate <= endDate &&
                    itemTime >= parseInt(startTime, 10) &&
                    itemTime < parseInt(endTime, 10)
                );
            }

            return itemDate >= startDate && itemDate <= endDate;
        });

        return filteredList;
    };



    console.log("fftList==", fftList);

    return (
        <Grid container justifyContent="center" alignItems="center" marginLeft={"10%"}>
            <Grid item sm={12} sx={12} md={12} lg={12} >
                <Card
                    sx={{
                        padding: 1,
                        width: "80%",
                        height: 330,
                        marginLeft: "2%",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle box-shadow
                        transition: "box-shadow 0.3s ease", // Smooth box-shadow transition
                        "&:hover": {
                            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.15)", // Increased shadow on hover
                        },

                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column", // Stack the components vertically on smaller screens
                            alignItems: "center", // Center the components horizontally
                            padding: "8px", // Add some padding for spacing
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item sm={6} sx={6} md={3} lg={3}>
                                <TextField
                                    type="date"
                                    value={searchStartDate}
                                    onChange={(e) => setSearchStartDate(e.target.value)}
                                    variant="outlined"
                                    inputProps={{
                                        style: { height: "26px", padding: "8px" },
                                    }}
                                    sx={{ marginBottom: "8px", width: "100%" }} // Add width for better responsiveness
                                />
                            </Grid>
                            <Grid item sm={6} sx={6} md={3} lg={3}>
                                <TextField
                                    type="date"
                                    value={searchEndDate}
                                    onChange={(e) => setSearchEndDate(e.target.value)}
                                    variant="outlined"
                                    inputProps={{
                                        style: { height: "26px", padding: "8px" },
                                    }}
                                    sx={{ marginBottom: "8px", width: "100%" }} // Add width for better responsiveness
                                />
                            </Grid>
                            <Grid item sm={6} sx={6} md={3} lg={3}>
                                <FormControl
                                    sx={{ minWidth: "100%", marginBottom: "8px" }} // Add width and marginBottom
                                    size="small"
                                >
                                    <InputLabel id="demo-select-small-label">
                                        Time Interval
                                    </InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={selectedTimeInterval}
                                        label="Time Interval"
                                        onChange={(e) => setSelectedTimeInterval(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {timeIntervals.map((interval) => (
                                            <MenuItem key={interval} value={interval}>
                                                {interval}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={6} sx={6} md={3} lg={3}>
                                <Button
                                    size="medium"
                                    variant="outlined"
                                    // onClick={handleSearch}
                                    sx={{ width: "100%", height: "40px" }} // Add width for better responsiveness

                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box >
                        <Typography variant="h6" color="text.primary" align="center">
                            {currentDate}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                height: "140px",

                                overflowY: "auto",
                            }}
                            marginLeft={"2%"}
                        >
                            {filterFftListByDateRangeAndTime().map((item) => {
                                // Display data for the current date only
                                if (item.date === currentDate) {
                                    return (
                                        <SmallCard
                                            key={item.id}
                                            id={item.id}
                                            title='FFT'
                                            value={item.time}
                                            date={item.date}
                                            time={item.time}

                                            isActive={item.id === activeCard} // Check if this card is active
                                            onClick={() => onCardClick(item.id, item.date, item.time)} // Handle card click
                                            setActiveCard={setActiveCard} // Pass setActiveCard function
                                        />
                                    );
                                }
                                return null;
                            })}

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            position: "relative",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            // marginTop: 1,
                        }}
                    >
                        <ArrowBackIosNewIcon
                            onClick={handlePreviousDateClick} // Call handlePreviousDateClick when clicking back arrow
                            disabled={displayedDateIndex === 0} // Disable the button if on the first page
                            sx={{
                                cursor: "pointer",
                                color: "#87CEFA",
                                "&:hover": {
                                    color: "#007BFF"
                                },
                                "&:disabled": {
                                    opacity: 0.5,
                                    cursor: "not-allowed"
                                }
                            }}
                        />
                        <ArrowForwardIosIcon
                            onClick={handleNextDateClick} // Call handleNextDateClick when clicking forward arrow
                            sx={{
                                cursor: "pointer",
                                color: "#87CEFA",
                                "&:hover": {
                                    color: "#007BFF"
                                },
                                "&:disabled": {
                                    opacity: 0.5,
                                    cursor: "not-allowed"
                                }
                            }}
                        />
                    </Box>
                </Card>
            </Grid>
        </Grid>

    );
};

export default CardGroup;