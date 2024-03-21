import Copyright from "../components/CopyRight";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import DashBoard from "../components/DashBoard";
import Query from "../components/Query";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          ECE 656 Capstone Project
        </Typography> */}
        {/* <DashBoard /> */}
        <Query />
      </Box>
      <Box
        // make sure the footer is at the bottom of the page
        // make all content in the footer center aligned
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
