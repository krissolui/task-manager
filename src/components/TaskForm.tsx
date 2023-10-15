import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import validationSchema from '../utils/validator';
import categories from '../constants/categories';
import Form from 'react-bootstrap/Form';

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
		category: '',
		dueTime: new Date(Date.now() - timezoneOffset)
			.toISOString()
			.slice(0, 16),
	};

	const formik = useFormik<FormFields>({
		initialValues,
		validationSchema,
		onSubmit: ({ title, category, dueTime }, { setSubmitting }) => {
			setTimeout(() => {
				addTask({
					title,
					category,
					dueTime,
				});
				setSubmitting(false);
				formik.resetForm();
			}, 200);
		},
	});

	const titleError = formik.touched.title && formik.errors.title;
	const categoryError = formik.touched.category && formik.errors.category;
	const dueTimeError = formik.touched.dueTime && formik.errors.dueTime;

	return (
		<div>
			<Form
				className="d-flex flex-column gap-2  mb-2"
				onSubmit={formik.handleSubmit}
			>
				<div className="d-flex flex-column flex-sm-row gap-2">
					<Form.Group className="w-100 w-sm-50">
						<Form.Control
							className={`${titleError && 'border-danger'}`}
							type="text"
							id="title"
							placeholder="Title"
							{...formik.getFieldProps('title')}
						/>
					</Form.Group>

					<Form.Group className="w-100 w-sm-50">
						<Form.Select
							className={`${categoryError && 'border-danger'}`}
							id="category"
							{...formik.getFieldProps('category')}
						>
							<option>Choose Category</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				</div>

				<div className="d-flex flex-column flex-sm-row gap-2">
					<Form.Group className="d-flex d-sm-inline-flex gap-2 w-100">
						<Form.Label className="m-0 w-25 text-center align-self-center">
							Due Time:
						</Form.Label>
						<Form.Control
							className={`w-75 ${
								dueTimeError && 'border-danger'
							}`}
							type="datetime-local"
							id="dueTime"
							{...formik.getFieldProps('dueTime')}
						/>
					</Form.Group>

					<Button
						className="w-sm-25"
						type="submit"
						disabled={formik.isSubmitting}
					>
						Add Task
					</Button>
				</div>
			</Form>
			{titleError && (
				<div className="text-danger">! {formik.errors.title}</div>
			)}
			{categoryError && (
				<div className="text-danger">! {formik.errors.category}</div>
			)}
			{dueTimeError && (
				<div className="text-danger">
					! {String(formik.errors.dueTime)}
				</div>
			)}
		</div>
	);
};

export default TaskForm;
