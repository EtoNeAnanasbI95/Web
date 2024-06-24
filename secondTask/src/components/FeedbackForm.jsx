import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import { AppContexet } from "../App";
import { CiPhone } from "react-icons/ci";
import { Alert } from "react-bootstrap";

const FeedbackForm = () => {
    const context = React.useContext(AppContexet);
    const {
        register,
        handleSubmit,
        formState: { statusForm },
    } = useForm();
    const [status, setStatus] = useState("");

    const onSubmit = (data, e) => {
        emailjs
        .send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, data, import.meta.env.VITE_USER_ID)
        .then((response) => {
            setStatus("Message sent successfully!");
            e.target.reset();
        })
        .catch((error) => {
            setStatus("Sending error. Try sometimes leater.");
        });
    };

    const popover = (
        <Popover id="popover-basic">
        <Popover.Header as="h3">Feedback form</Popover.Header>
        <Popover.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Имя:</label>
                <Form.Control
                placeholder="Name"
                {...register("name", { required: "This field is required" })}
                />
            </div>
            <div>
                <label>Email:</label>
                <Form.Control
                placeholder="example@mail.com"
                {...register("email", {
                    required: "This field is required",
                    pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Incorrect email format",
                    },
                })}
                />
            </div>
            <div>
                <label>Сообщение:</label>
                <Form.Control
                as="textarea"
                aria-label="With textarea"
                {...register("message", { required: "This field is required" })}
                />
            </div>
            <Button className="mt-1" variant="primary" type="submit">
                Spend
            </Button>
            </form>
            {
                status && status === "Message sent successfully!" ? <Alert className="mt-1" variant="success">{status}</Alert> :( status && <Alert className="mt-1" variant="danger">{status}</Alert> )
            }
        </Popover.Body>
        </Popover>
    );

    return (
        <>
        <div className="popup">
        <div className="popup-content">
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                <motion.button 
                className="round-button"
                initial='rest'
                whileTap='popupPressed'
                whileHover='popupHover'
                variants={context.animations}
                >
                    <CiPhone size={50} />
                </motion.button>
            </OverlayTrigger>
        </div>
        </div>
        </>
    );
};

export default FeedbackForm;
