import React, { useState, useEffect } from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";


const OnBoard = ({ values, errors, touched, status}) =>{
const [users, setUsers] = useState([]);

useEffect(() => {
    status && setUsers(users => [...users, status]);

}, [status])



return (
    <div>
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
            <Field type="email" name="email" placeholder="Email" />
            {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
            <label>
                Terms Of Service
                <Field type="checkbox" name="termsOfService" checked={values.termsOfService} 
                 />
                    {touched.termsOfService && errors.termsOfService && (
                        <p className="errors">{errors.termsOfService}</p>
                    )}
            </label>    
            
            <button type="submit">Submit!</button>
        </Form>

        {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                    <li>Checkbox: {user.termsOfService}</li>
                </ul>
            ))}
    </div>
);

};

const FormikOnBoarding = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        termsOfService: Yup.boolean().oneOf([true], "error message string")
        
    }),
    handleSubmit(values, {setStatus}) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            }) 
            .catch(err => console.log(err.response));
    }
})(OnBoard);
 
export default FormikOnBoarding;
// console.log("This is the HOC", FormikOnBoarding);