import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { statusForm },
  } = useForm();
  const [status, setStatus] = useState("");

  const onSubmit = (data, e) => {
    emailjs
      .send("service_yg5uhhe", "template_lrow7na", data, "ym8qGhvR0ZhTxZrB0")
      .then((response) => {
        setStatus("Сообщение отправлено успешно!");
        e.target.reset();
      })
      .catch((error) => {
        setStatus("Ошибка отправки сообщения. Попробуйте позже.");
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
              {...register("name", { required: "Это поле обязательно" })}
            />
          </div>
          <div>
            <label>Email:</label>
            <Form.Control
              placeholder="example@mail.com"
              {...register("email", {
                required: "Это поле обязательно",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Неверный формат email",
                },
              })}
            />
          </div>
          <div>
            <label>Сообщение:</label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              {...register("message", { required: "Это поле обязательно" })}
            />
          </div>
          <Button className="mt-1" variant="primary" type="submit">Отправить</Button>
        </form>
        {status && <p>{status}</p>}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
    <div className="popup">
        <div className="popup-content">
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                <Button variant="success">Feedback?</Button>
            </OverlayTrigger>
        </div>
    </div>
    </>
  );
};

export default FeedbackForm;
