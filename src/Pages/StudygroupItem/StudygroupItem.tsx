import { Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export function StudygroupItem() {
  const location = useLocation()
  const groupId = Number(location.pathname.split("/")[2])

  return (
    <Container>
    <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/studygroup">
          Учебные группы
        </Link>
        <Typography color="text.primary">{groupId}</Typography>
    </Breadcrumbs>
    </Stack>
    </Container>
  )
}