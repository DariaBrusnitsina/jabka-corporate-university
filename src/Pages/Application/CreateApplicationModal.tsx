import { Box, Button, Chip, FormControl, FormHelperText, InputLabel, Modal, OutlinedInput, TextField, Typography, styled, useMediaQuery } from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react";
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
  p: 4,
};

interface IPartialNews {
  leaderName?: string;
  subunitName?: string;
  currentPosition?: string;
  workExperience?: string;
  personalAchievements?: string;
  motivationMessage?: string;
  user?: IAuth
}



export default function CreateApplicationModal() {
  const xs = useMediaQuery('(max-width:550px)');
	const sm = useMediaQuery('(max-width:750px)');
  const dispatch = useAppDispatch()
  const [formValues, setFormValues] = useState<IPartialNews>(post ? post : initialState)

  // const initialState: IPartialNews = {
  //   leaderName: string;
  //   subunitName: string;
  //   currentPosition: string;
  //   workExperience: string;
  //   personalAchievements: string;
  //   motivationMessage: string;
  //   user: IAuth
  // }

  const [formErrors, setFormErrors] = useState<FormParams>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = () => {
		// dispatch(login(formValues.login, formValues.password));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => {return { ...prev, [name]: value }});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
    console.log(formValues.hashtags)
  };

  const validate = (values: IPartialNews) => {
    const errors: FormParams = {};

    if (!values.header) {
      errors.header = "Это поле не может быть пустым!";
    }

    if (!values.header) {
      errors.header = "Это поле не может быть пустым!";
    }

    return errors
  };

  useEffect(() => {
    if (post) {
      setFormValues(post)
    }
  }, [open]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors, isSubmitting]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>){
      if(e.key !== 'Enter') return
      let tags = formValues.hashtags
      const value = (e.target as HTMLInputElement).value;

      if(!value.trim()) return
    (e.target as HTMLInputElement).value = '';
      setFormValues((prev) => {
        return { ...prev, hashtags: [...tags, value] };
      });
  }

  function removeTag(index: number){
    const filteredTags = formValues.hashtags.filter((el, i) => i !== index)
    setFormValues((prev) => {
      return { ...prev, hashtags: filteredTags };
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography variant="h4" textAlign='center' mb={3}>{isEdit ? 'Редактирование поста' : 'Создание поста'}</Typography>

        <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        width={sm ? (xs ? '11rem' : '25rem') : '32.5rem'}
      >

        <FormControl
          sx={{ marginTop: '20px', width: '100%' }}
          variant="outlined"
          error={!!formErrors.header}
        >
          <InputLabel htmlFor="header">Заголовок</InputLabel>
          <OutlinedInput
            sx={{ borderRadius: '8px' }}
            value={formValues.header}
            onChange={handleChange}
            id="header"
            name='header'
            label="Заголовок" />
          <FormHelperText id="header">{formErrors.header ? formErrors.header : ''}</FormHelperText>
        </FormControl>

        <Box my={3}>
          <Typography variant="h5">Теги</Typography>
            {formValues.hashtags.map((tag, index) => (
              <Chip
              sx={{margin: '0 10px 10px 0'}}
              key={index}
              label={tag}
              onDelete={() => removeTag(index)}
              />
            )) }

            <Box>
            <TextField onKeyDown={handleKeyDown} id="standard-basic" label="Добавить тег" variant="standard" />
            </Box>
        </Box>

        <Box width={'100%'}>
          <Typography variant="h5">Текст новости</Typography>

          <Textarea
            minRows={2}
            size="sm"
            defaultValue={formValues.text}
            variant="soft"
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
      </Box>



        </Box>
      </Modal>
    </div>
  );
}