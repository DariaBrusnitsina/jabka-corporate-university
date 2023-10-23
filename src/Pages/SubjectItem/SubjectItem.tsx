import { Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";

export function SubjectItem() {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
      <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/subject">
            Предметы
          </Link>
          <Typography color="text.primary">Предмет</Typography>
      </Breadcrumbs>
      </Stack>
    </Container>

  )
}