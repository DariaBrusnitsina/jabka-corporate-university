import { Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";

export function StudentItem() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/student">
            Студенты
          </Link>
          <Typography color="text.primary">Иван Иванов</Typography>
      </Breadcrumbs>
      </Stack>
    </Container>

  )
}