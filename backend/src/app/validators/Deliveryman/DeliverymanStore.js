import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters.')
        .max(100, 'Name has a maximum limit of 100 characters.')
        .required('Name is required.'),
      email: Yup.string()
        .max(100, 'E-mail has a maximum limit of 100 characters')
        .required('E-mail is required.'),
      avatar_id: Yup.number().required('Avatar_id is required')
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
