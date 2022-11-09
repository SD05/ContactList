import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/spinner";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  return (
    <>
    <section className="heading">
      <h1>Welcome {user && user.name}</h1>
      <p>Contacts Dashboard</p>
    </section>

    {/* <ContactForm /> */}
    <section className="content">
      {/* {contacts.length > 0 ? (
        <div className="goals">
          {contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
        </div>
      ) : */(
        <h3>You have not created any contacts</h3>
      )}
    </section>
  </>
  )
}

export default Dashboard