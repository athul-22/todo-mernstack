import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import axios from "axios";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fingerprint from "./fingerprint.gif";

const defaultTheme = createTheme();

export default function SignIn() {
  const register = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post("/api/auth/register", user);
      toast.success("Account created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: -17,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          boxShadow: "0.9px 0.7px 2.2px rgba(0, 0, 0, 0.007)",
          backgroundColor: "#fff",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "#E3F2FD",
                color: "#1E88E5",
                width: "80px",
                height: "80px",
                fontSize: "60px",
              }}
            >
              <img src={fingerprint} height="90px" />
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onSubmit={register}
                sx={{
                  mt: 3,
                  mb: 2,
                  cursor: "pointer",
                  fontSize: "17px",
                  borderRadius: "5px",
                  boxShadow: "#1890ff 0px 4px 16px 0px",
                  backgroundColor: "#1890ff",
                  color: "white",
                  border: "none",
                }}
              >
                Sign Up
              </Button>
              <Link href="/login" variant="body2">
                <Button
                  fullWidth
                  style={{
                    mt: 3,
                    mb: 2,
                    cursor: "pointer",
                    fontSize: "17px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "#1890ff",
                    border: "1px solid #1890ff",
                  }}
                >
                  Login
                </Button>
              </Link>
              <Grid container justifyContent="flex-end">
                {/* <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
