import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fingerprint from "./fingerprint.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });
      navigate("/");
      localStorage.setItem("username", email);
    } catch (error) {
      console.log(error);
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
              {" "}
              {/* <LockOutlinedIcon /> */}
              <img src={fingerprint} height="90px" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                Sign In
              </Button>
              <Link href="/register" variant="body2">
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
                      Create Account
                    </Button>
                    {/* {"Don't have an account? Sign Up"} */}
                  </Link>

              <Grid container>
                <Grid item>
                  
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
