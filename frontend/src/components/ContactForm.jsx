import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createContact, reset } from "../features/contacts/contactSlice";
import Spinner from "./spinner";

function ContactForm() {
  const [contactData, setContactData] = useState({
    name: "",
    number: "",
    number2: "",
  });
  const { name, number, number2 } = contactData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { contacts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setContactData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    debugger;
    if (number === number2) {
      toast.error("Both Numbers should not be same");
    } else {
      const userData = {
        name,
        number,
        number2,
      };
      debugger;
      dispatch(createContact(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter the Name"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="number"
            id="number"
            value={number}
            placeholder="Enter the Number"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="number2"
            id="number2"
            value={number2}
            placeholder="Enter the Alternate Number"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Contact
          </button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
