import logo from './logo.svg';
import './App.css';
import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { firebaseConfig } from "./firebaseConfig"
import firebase from 'firebase/app';

// Required for side-effects

// import "firebase/autconst firebase = require("firebase");
// Required for side-effects
import "firebase/firestore";

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore()

function App() {
  const [firebaseData, setFirebaseData] = useState([""])
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const handleAccordionChange = (number) => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded ? number : false);
  };

  const parseData = (db) => {
    const dataArray = [];
    const snapshot = db.collection('emails').get();
       snapshot.then(
        (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const document = { ...doc.data(), id: doc.id };
                dataArray.push(document)
            });//--> resolve when data is ready
        },
      ).then(()=> {
      setFirebaseData(dataArray)
      setLoaded(true)
      })
  };

  useEffect(() => {
    parseData(db)
  }, []);
  
  const accordionObject = [firebaseData][0]
  console.log(accordionObject)
  const listAccordion =  accordionObject.map( data => 
    <Accordion expanded={expandedPanel === data.id} onChange={handleAccordionChange(data.id)}>
    <AccordionSummary expandIcon={<ExpandMore />}>{data.Subject}</AccordionSummary>
    <AccordionDetails style={{display:"flex", "word-break":"break-word"}}>
      {data.Body}
    </AccordionDetails>
    </Accordion>)


  return (
    <div className="App">
      <header className="App-header">
      <div style={{width:"50%"}}>
      {loaded ? listAccordion : null} 
      </div>
      </header>
    </div>
  );
}

export default App;
