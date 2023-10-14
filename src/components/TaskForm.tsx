import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import validationSchema from '../utils/validator';
import categories from '../constants/categories';

interface ITaskFormProps {
	addTask: (task: FormFields) => void;
}

export interface FormFields {
	title: string;
	category: string;
	dueTime: string;
}

const TaskForm = ({ addTask }: ITaskFormProps) => {
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

	const initialValues: FormFields = {
		title: '',
		category: categories[0],
		dueTime: new Date(Date.now() - timezoneOffset)
			.toISOString()
			.slice(0, 16),
	};

	const formik = useFormik<FormFields>({
		initialValues,
		validationSchema,
		onSubmit: (values, { setSubmitting }) => {
			setTimeout(() => {
				addTask(values);
				setSubmitting(false);
				formik.resetForm();
			}, 200);
		},
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<input
					type="text"
					id="title"
					{...formik.getFieldProps('title')}
				/>

				<select id="category" {...formik.getFieldProps('category')}>
					{categories.map((category) => (
						<option value={category}>{category}</option>
					))}
				</select>

				<input
					type="datetime-local"
					id="dueTime"
					{...formik.getFieldProps('dueTime')}
				/>

				<Button type="submit" disabled={formik.isSubmitting}>
					Submit
				</Button>

				{formik.touched.title && formik.errors.title ? (
					<div>{formik.errors.title}</div>
				) : null}
				{formik.touched.category && formik.errors.category ? (
					<div>{formik.errors.category}</div>
				) : null}
				{formik.touched.dueTime && formik.errors.dueTime ? (
					<div>{String(formik.errors.dueTime)}</div>
				) : null}
			</form>
		</div>
	);
};

export default TaskForm;
