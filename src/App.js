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
  const [firebaseData, setFirebaseData] = useState("")
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [docId, setDocId] = useState("")
  const [combinedData, setCombinedData] = useState("")
  const handleAccordionChange = (number) => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded ? number : false);
  };

  useEffect(() => {
    const parseData = async (db) => {
      const snapshot = db.collection('emails').get();
      return new Promise(resolve => {
         snapshot.then(
          (querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  const document = { ...doc.data(), id: doc.id };
                  setFirebaseData(document)
              });//--> resolve when data is ready
          },
      );
      })   
    };
    parseData(db)
    // db.collection("emails").get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //       setFirebaseData(JSON.stringify(doc.data()))
    //       setDocId(doc.id)
    //       console.log(JSON.stringify(doc.data()))
    //       console.log(JSON.stringify(doc.id))
    //       console.log(firebaseData)
    //       console.log(docId)
    //       setCombinedData({ firebaseData, docId: docId })
    //       setFirebaseData("")
    //       setDocId("")
    //   });
    // });
  }, []);
  
  const accordionObject = [firebaseData]
  console.log(accordionObject)
  const listAccordion =  accordionObject.map( data => 
    <Accordion expanded={expandedPanel === data.number} onChange={handleAccordionChange(data.number)}>
    <AccordionSummary expandIcon={<ExpandMore />}>{data.title}</AccordionSummary>
    <AccordionDetails>
      {data.detail}
    </AccordionDetails>
    </Accordion>)


  return (
    <div className="App">
      <header className="App-header">
      <div style={{width:"50%"}}>
      {listAccordion} 
      </div>
      </header>
    </div>
  );
}

export default App;
