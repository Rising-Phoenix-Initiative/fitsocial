import React, { useState } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    FormControl,
    InputAdornment,
    IconButton,
    LinearProgress,
    FormHelperText,
    Grid,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    Event as EventIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../context/auth.context";

interface FormValues {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    birthdate?: Date;
}

const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length > 0) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength / 5; // Return a fraction between 0 and 1.
};

const currentYear = new Date().getFullYear();
const maxDate = new Date(
    currentYear - 18,
    new Date().getMonth(),
    new Date().getDate()
);

const Signup: React.FC = () => {
    const { handleSignup } = useAuth();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        setPasswordStrength(calculatePasswordStrength(e.target.value));
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email format").required("Required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 characters minimum."),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), undefined],
            "Passwords must match"
        ),
        gender: Yup.string().required("Required"),
        birthdate: Yup.date()
            .max(maxDate, "Must be at least 18 years old")
            .nullable(),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            birthdate: new Date(),
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log("values", values);
                await handleSignup({
                    ...values,
                    birthdate: selectedDate || new Date(),
                });
            } catch (error) {
                console.error("Signup Error:", error);
            }
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                    }
                    helperText={
                        formik.touched.username && formik.errors.username
                    }
                />
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                open={openDatePicker}
                                onOpen={() => setOpenDatePicker(true)}
                                onClose={() => setOpenDatePicker(false)}
                                value={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setOpenDatePicker(false); // Optionally close picker after selection
                                }}
                                maxDate={maxDate}
                                slots={{
                                    textField: (textFieldProps) => (
                                        <TextField
                                            {...textFieldProps}
                                            fullWidth
                                            margin="normal"
                                            InputProps={{
                                                ...textFieldProps.InputProps,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                setOpenDatePicker(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <EventIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                name="gender"
                                value={formik.values.gender}
                                label="Gender"
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.gender &&
                                    Boolean(formik.errors.gender)
                                }
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            transform:
                                                "translateY(5px) !important",
                                            // This will remove the ::before styling
                                            "&::before": {
                                                content: "none",
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em style={{ display: "none" }}>None</em>
                                </MenuItem>
                                <MenuItem sx={{ mt: "-12px" }} value={"male"}>
                                    Male
                                </MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                            <FormHelperText>
                                {formik.touched.gender && formik.errors.gender}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email && (
                    <FormHelperText error={true}>
                        {formik.errors.email}
                    </FormHelperText>
                )}

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={handlePasswordChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {formik.touched.password && formik.errors.password && (
                    <FormHelperText error={true}>
                        {formik.errors.password}
                    </FormHelperText>
                )}
                <LinearProgress
                    sx={{ mx: "5px", borderRadius: "6px" }}
                    variant="determinate"
                    value={passwordStrength * 100}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                        <FormHelperText error={true}>
                            {formik.errors.confirmPassword}
                        </FormHelperText>
                    )}

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
            </FormControl>
        </Box>
    );
};

export default Signup;
