import React, {useState, useEffect}from 'react';
import{BrowserRouter as Router,Routes, Route} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import api from '../api/contacts';
//import EditContact from "./EditContact";



function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const[contacts,setContacts]= useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))??[]);

    //retrieve contacts
    //const retriveContacts = async() =>{
    //  const response = await api.get("/contacts");
    //  return response.data;
    //}

  const addContactHandler = /*async*/ (contact) =>{
    console.log(contact);
   // const request = {
   //   id: uuidv4(),
   //   ...contact
   //}

   //const response = await api.post("/contacts", request)
   //console.log(response);
    setContacts([...contacts,/*response.data*/{id: uuidv4(), ...contact}]);
  };

 // const updateContactHandler = () =>{}

  const removeContactHandler = /*async*/(id) =>{
    /*await*/api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) =>{
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  {/*useEffect(()=>{
   const retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
   if(retriveContacts) setContacts(JSON.parse(retriveContacts));
    //const getAllContacts = async() => {
    //  const allContacts = await retriveContacts();
    //  if(allContacts) setContacts(allContacts);
   // } ;
   // getAllContacts();
  }, []);*/}
  
  useEffect(()=>{
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
   <div className ="ui container">
    <Router>

    <Header/>
    <Routes>
    <Route path = "/" exact element={(<ContactList contacts ={contacts} getContactId={removeContactHandler}/>)}/>
    <Route path = "/add" element={(
       <AddContact addContactHandler ={addContactHandler}/>   //removed (props)=> arrow function from both routes
        )}
        />

{/*<Route path = "/edit" element={(
       <EditContact updateContactHandler ={updateContactHandler}/>   //removed (props)=> arrow function from both routes
        )}
          />*/}

<Route path="/contact/:id" element={<ContactDetails />} />
    </Routes>
   
   {/* <AddContact addContactHandler={addContactHandler}/> */}
    {/* <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
    
    </Router>
    
    </div>
   );
}

export default App;
