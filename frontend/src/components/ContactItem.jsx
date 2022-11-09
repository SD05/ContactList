import { useDispatch } from "react-redux";
import { deleteContact } from "../features/contacts/contactSlice";

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  return (
    <div className="contact">
      <div>{new Date(contact.createdAt).toLocaleString("en-US")}</div>
      <h2>{contact.name}</h2>
      <p>{contact.number}</p>
      <button
        onClick={() => dispatch(deleteContact(contact._id))}
        className="close"
      >
        Delete
      </button>
    </div>
  );
}

export default ContactItem;
