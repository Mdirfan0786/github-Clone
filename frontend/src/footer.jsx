import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#0D1117",
        padding: "2rem 1rem",
        mt: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <GitHubIcon sx={{ fontSize: 25, color: "#9198A1" }} />

        <Typography variant="body2" color="#9198A1">
          © {new Date().getFullYear()} GitHub, Inc.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link href="#" underline="hover" color="#9198A1" variant="body2">
            Terms
          </Link>
          <Link href="#" underline="hover" color="#9198A1" variant="body2">
            Privacy
          </Link>
          <Link href="#" underline="hover" color="#9198A1" variant="body2">
            Security
          </Link>
          <Link href="#" underline="hover" color="#9198A1" variant="body2">
            Status
          </Link>
          <Link href="#" underline="hover" color="#9198A1" variant="body2">
            Docs
          </Link>
          <Link href="#" underline="hover" color="#9198A1" variant="body2">
            Contact GitHub
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
