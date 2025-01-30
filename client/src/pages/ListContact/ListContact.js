import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../JS/Actions/contact";
import CircularProgress from "@mui/material/CircularProgress";
import ContactCard from "../../components/ContactCard/ContactCard";

const ListContact = () => {
  const dispatch = useDispatch();
  const listContacts = useSelector((state) => state.contactReducer.listContacts);
  const load = useSelector((state) => state.contactReducer.load);
  const user = useSelector((state) => state.userReducer.user); // On récupère l'utilisateur connecté

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>ListContacts</h1>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap"}}>
        {load ? (
          <CircularProgress
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              m: "auto",
              mb: "45%",
            }}
            size="3.5rem"
          />
        ) : (
          listContacts.map((el) => (
            <ContactCard 
              contact={el} 
              key={el._id} 
              isAdmin={user?.role === "admin"} // On passe l'info du rôle à ContactCard
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListContact;
