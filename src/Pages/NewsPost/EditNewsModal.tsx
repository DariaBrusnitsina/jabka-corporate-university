import { Box, Button, Chip, FormControl, FormHelperText, InputLabel, Modal, OutlinedInput, Typography, useMediaQuery } from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { INews } from "../../store/newsReducer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FormParams {
  header?: string;
  date?: string;
  text?: string;
  hashtags?: string[];
  imgs?: string[];
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

interface Props {
  open: boolean;
  post: INews;
  handleClose: () => void;
}

export default function EditNewsModal({open, post, handleClose}: Props) {
  const xs = useMediaQuery('(max-width:550px)');
	const sm = useMediaQuery('(max-width:750px)');
  const dispatch = useAppDispatch()

  const [formValues, setFormValues] = useState(post)
  const [formErrors, setFormErrors] = useState<FormParams>({})
  const [isSubmitting, setIsSubmitting] = useState(false)


  const submit = () => {
		// dispatch(login(formValues.login, formValues.password));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  const validate = (values: INews) => {
    const errors: FormParams = {};

    if (!values.header) {
      errors.header = "Это поле не может быть пустым!";
    }

    if (!values.header) {
      errors.header = "Это поле не может быть пустым!";
    }

    return errors
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  useEffect(() => {
    setFormValues(post)
  }, [open]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors, isSubmitting]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography variant="h4" textAlign='center' mb={3}>Редактирование поста</Typography>

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
          <FormHelperText id="password">{formErrors.header ? formErrors.header : ''}</FormHelperText>
        </FormControl>

        <Typography>Теги</Typography>
        {}

        <Chip label="Deletable" onDelete={handleDelete} />

        <Box>
        <textarea name="" id="">{post.text}</textarea>

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