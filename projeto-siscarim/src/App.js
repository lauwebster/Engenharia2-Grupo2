import './App.css';
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{}}>
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field></Field>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
