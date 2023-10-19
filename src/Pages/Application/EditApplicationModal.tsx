import { Box, Button, FormControl, FormHelperText, InputLabel, Modal, OutlinedInput, Typography, useMediaQuery } from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Textarea from '@mui/joy/Textarea';
import { IAuth } from "../../store/userReducer";

interface FormParams {
  leaderName?: string;
  subunitName?: string;
  currentPosition?: string;
  workExperience?: string;
  personalAchievements?: string;
  motivationMessage?: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};

interface IApplication {
  id? :number
  leaderName: string;
  requestStatus?: string;
  subunitName: string;
  currentPosition: string;
  workExperience: string;
  personalAchievements: string;
  motivationMessage: string;
  user: IAuth
}

interface Props {
  application?: IApplication;
  open: boolean;
  user?: IAuth;
  handleClose: () => void;
}


export default function EditApplicationModal({open, application, user, handleClose}: Props) {
  const xs = useMediaQuery('(max-width:550px)');
	const sm = useMediaQuery('(max-width:750px)');
  const dispatch = useAppDispatch()

  if (!user) {
    return <p>Loading</p>
  }

  const initialState: IApplication = {
    leaderName: "",
    subunitName: "",
    currentPosition: "",
    workExperience: "",
    personalAchievements: "",
    motivationMessage: "",
    user: user
  }

  const [formValues, setFormValues] = useState<IApplication>(initialState)

  useEffect(() => {
    if (application) {
      setFormValues(application)
    }
  }, [open]);


  const [formErrors, setFormErrors] = useState<FormParams>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = () => {
    console.log('formValues', formValues)
		// dispatch(createApplication(formValues));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => {return { ...prev, [name]: value }});
  };

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>, name: string) => {
    const { value } = e.target;
    setFormValues((prev) => {return { ...prev, [name]: value }});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: FormParams) => {
    const errors: FormParams = {};

    if (!values.leaderName) {
      errors.leaderName = "Это поле не может быть пустым!";
    }

    if (!values.subunitName) {
      errors.subunitName = "Это поле не может быть пустым!";
    }
    if (!values.currentPosition) {
      errors.currentPosition = "Это поле не может быть пустым!";
    }
    if (!values.workExperience) {
      errors.workExperience = "Это поле не может быть пустым!";
    }
    if (!values.personalAchievements) {
      errors.personalAchievements = "Это поле не может быть пустым!";
    }

    if (!values.motivationMessage) {
      errors.motivationMessage = "Это поле не может быть пустым!";
    }

    return errors
  };

  useEffect(() => {
    if (user) {
      setFormValues((prev) => {return { ...prev, user: user }})
    }
  }, [open]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors, isSubmitting]);

  function handleAppClose() {
    handleClose()
    setFormErrors({})
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleAppClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        width={sm ? (xs ? '11rem' : '25rem') : '32.5rem'}
      >

        {/* userData */}
        <FormControl
          sx={{ marginTop: '20px', width: '100%' }}
          variant="outlined"
        >
          <InputLabel htmlFor="leaderName">ФИО</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '8px' }}
            value={`${user?.name}${user?.patronymic ? ` ${user?.patronymic}` : ""} ${user?.surname}`}
            disabled
            id="userData"
            name='userData'
            label="ФИО" />
        </FormControl>

        {/* leaderName */}
        <FormControl
          sx={{ marginTop: '20px', width: '100%' }}
          variant="outlined"
          error={!!formErrors.leaderName}
        >
          <InputLabel htmlFor="leaderName">ФИО руководителя</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '8px' }}
            value={formValues.leaderName}
            onChange={handleChange}
            id="leaderName"
            name='leaderName'
            label="ФИО руководителя" />
          <FormHelperText id="leaderName">{formErrors.leaderName ? formErrors.leaderName : ''}</FormHelperText>
        </FormControl>

        {/* subunitName */}
        <FormControl
          sx={{ marginTop: '20px', width: '100%' }}
          variant="outlined"
          error={!!formErrors.subunitName}
        >
          <InputLabel htmlFor="subunitName">Название подразделения</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '8px' }}
            value={formValues.subunitName}
            onChange={handleChange}
            id="subunitName"
            name='subunitName'
            label="Название подразделения" />
          <FormHelperText id="subunitName">{formErrors.subunitName ? formErrors.subunitName : ''}</FormHelperText>
        </FormControl>

        {/* currentPosition */}
        <FormControl
          sx={{ marginTop: '20px', width: '100%' }}
          variant="outlined"
          error={!!formErrors.currentPosition}
        >
          <InputLabel htmlFor="currentPosition">Текущая должность</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '8px' }}
            value={formValues.currentPosition}
            onChange={handleChange}
            id="currentPosition"
            name='currentPosition'
            label="Текущая должность" />
          <FormHelperText id="currentPosition">{formErrors.currentPosition ? formErrors.currentPosition : ''}</FormHelperText>
        </FormControl>


        {/* workExperience */}
        <Box width={'100%'} my={2}>
          <Typography variant="h5">Стаж работы</Typography>

          <Textarea
            onChange={(e) => handleChangeTextarea(e, "workExperience")}
            minRows={2}
            aria-label="textarea"
            // ref={textareaRef}
            size="sm"
            defaultValue={formValues.workExperience}
            variant="soft"
            color={formErrors.workExperience ? 'danger' : 'primary'}
          ></Textarea>
        </Box>

        {/* personalAchievements */}
        <Box width={'100%'} my={2}>
          <Typography variant="h5">Личные достижения</Typography>

          <Textarea
            onChange={(e) => handleChangeTextarea(e, "personalAchievements")}
            minRows={2}
            size="sm"
            defaultValue={formValues.personalAchievements}
            variant="soft"
            color={formErrors.personalAchievements ? 'danger' : 'primary'}
          />
          </Box>

        {/* motivationMessage */}
        <Box width={'100%'} my={2}>
          <Typography variant="h5">Мотивационное письмо</Typography>

          <Textarea
            onChange={(e) => handleChangeTextarea(e, "motivationMessage")}
            minRows={2}
            size="sm"
            defaultValue={formValues.motivationMessage}
            variant="soft"
            color={formErrors.motivationMessage ? 'danger' : 'primary'}

          />

        </Box>

        {/* {isSubmitting && Object.keys(formErrors).length === 0 && <Typography sx={{ display: 'block', marginTop: '20px', textAlign: 'center' }} color='#FF3C02'>{authError ? authError : ""}</Typography>} */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disableRipple
          sx={{
            mt: 3,
            mb: 1.5,
            height: '3.5rem',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Сохранить
        </Button>

        <Button
          type="submit"
          color= 'error'
          fullWidth
          variant="text"
          disableRipple
          sx={{
            mt: 3,
            mb: 1.5,
            height: '3.5rem',
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Удалить
        </Button>
      </Box>


        </Box>
      </Modal>
    </div>
  );
}