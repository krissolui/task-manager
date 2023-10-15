import * as yup from 'yup';
import categories from '../constants/categories';

const validationSchema = yup.object({
	title: yup
		.string()
		.min(1, 'Title must not be empty')
		.required('Title is required'),
	category: yup
		.string()
		.oneOf(categories, `Category must be one of ${categories.join(', ')}`)
		.required('Category is required'),
	dueTime: yup.lazy(() =>
		yup
			.date()
			.min(new Date(), 'Due time must not be in the past')
			.required('Due time is required')
	),
});

export default validationSchema;
