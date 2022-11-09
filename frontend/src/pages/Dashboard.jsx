import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../components/ContactForm";
import ContactItem from "../components/ContactItem";
import Spinner from "../components/spinner";
import { getContacts, reset } from "../features/contacts/contactSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { contacts, isLoading, isError, message } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getContacts());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  debugger;
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Contacts Dashboard</p>
      </section>

      <ContactForm />
      <section className="content">
        {contacts.length > 0 ? (
          <div className="goals">
            {contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))}
          </div>
        ) : (
          <h3>You have not created any contacts</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
