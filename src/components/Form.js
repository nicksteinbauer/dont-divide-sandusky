import React from 'react';
import * as emailjs from "emailjs-com";
import { Button, FormGroup, Label } from "reactstrap";
import { Formik, Field, Form } from 'formik';
import { ReactstrapInput } from "reactstrap-formik";

import 'bootstrap/dist/css/bootstrap.min.css';



import Swal from "sweetalert2";

//import { isEmail } from "validator";


//import Recaptcha from 'react-recaptcha';


import * as Yup from 'yup';





const SignupSchema = Yup.object().shape({

    name: Yup.string().required('Name Required'),
    phone: Yup.string().required('Phone Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
});

const EndorsementForm = () => (

    <div>
        <Formik
            initialValues={{
                votingyes: '',
                name: '',
                organization: '',
                streetAddress: '',
                phone: '',
                email: '',
                whynosense: '',
                defeat: []


            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {

                //await new Promise((r) => setTimeout(r, 500));
                //alert(JSON.stringify(values, null, 2));
                console.log(values);
                emailjs.sendForm('barnes', 'dontdivide', '#formikform', 'user_vOc0ylPHeC2nCdyLQJAiW');
                resetForm({ values: '' });
                Swal.fire({
                    title: "Your form has been submitted, Thanks for helping defeat Issue 2!",
                    icon: "success",
                });
            }}

        >

            {({ errors, touched }) => (
                <Form id="formikform">






                    <FormGroup className="padding">
                        <div id="checkbox-group" className="label-like">Yes! I/we are voting NO on Issue 2!</div>
                        <div role="group" aria-labelledby="voting" className="flex-sm checkbox-group">
                            <Label className="flex1">
                                <Field type="radio" name="votingyes" value="Yes" />
                                &nbsp; Yes
                            </Label>
                        </div>
                    </FormGroup>


                    <FormGroup className="padding">
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
                            component={ReactstrapInput}
                        />

                    </FormGroup>
                    <FormGroup className="padding">
                        <Field
                            type="text"
                            id="organization"
                            name="organization"
                            label="Organization"
                            component={ReactstrapInput}
                        />
                    </FormGroup>
                    <FormGroup className="padding">
                        <Field
                            type="text"
                            id="streetAddress"
                            label="Street Address"
                            name="streetAddress"
                            component={ReactstrapInput}
                        />
                    </FormGroup>
                    <FormGroup className="padding">
                        <Field
                            type="tel"
                            id="phone"
                            label="Phone"
                            name="phone"
                            component={ReactstrapInput}
                        />
                    </FormGroup>
                    <FormGroup className="padding">
                        <Field
                            id="email"
                            label="Email"
                            name="email"
                            component={ReactstrapInput}
                        />
                    </FormGroup>
                    <FormGroup className="padding">
                        <Field
                            type="textarea"
                            id="whynosense"
                            label="Why Issue 2 doesn't make sense: (optional)"
                            name="whynosense"
                            component={ReactstrapInput}
                        />
                    </FormGroup>

                    <FormGroup className="padding">
                        <div id="checkbox-group" className="label-like">I also want to help defeat Issue 2 by:</div>
                        <div role="group" aria-labelledby="defeat-group" className="checkbox-group">
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Making Phone Calls" />
                                &nbsp;Making Phone Calls
                            </Label>
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Having a Yard Sign" />
                                &nbsp;Having a Yard Sign
                            </Label>
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Canvasing door-to-door" />
                                &nbsp;Canvasing door-to-door
                            </Label>
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Writing a Letter to the Editor" />
                                &nbsp;Writing a Letter to the Editor
                            </Label>
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Sharing information on social media" />
                                &nbsp;Sharing information on social media
                            </Label>
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Making a donation" />
                                &nbsp;Making a donation (mail check to 316 East Water Stree, Sandusky, Ohio 44870)
                            </Label>
                            <Label className="padding">
                                <Field type="checkbox" name="defeat" value="Anything you need" />
                                &nbsp;Anything you need
                            </Label>
                        </div>
                    </FormGroup>






                    <div className="padding">
                        <FormGroup className="padding">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </FormGroup>
                    </div>
                    <div className="padding">
                        <div className="padding erroring">
                            {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                            {errors.phone && touched.phone ? (<div>{errors.phone}</div>) : null}
                            {errors.email && touched.zip ? (<div>{errors.email}</div>) : null}
                        </div>
                    </div>




                </Form>
            )}

        </Formik>
    </div>

);



export default EndorsementForm;