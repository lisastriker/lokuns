import logo from './logo.svg';
import './App.css';
import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails, AppBar, IconButton, Button, Toolbar, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { firebaseConfig } from "./firebaseConfig"
import firebase from 'firebase/app';
import "firebase/firestore";
import { Pagination } from '@material-ui/lab'
import AppBarComponent from './Appbar'
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
var db = firebase.firestore()

function App() {
  const [loaded, setLoaded] = useState(false)
  const [firebaseData, setFirebaseData] = useState([""])
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [postsPerPage] = useState(10);
  const [page, setPage] = useState(1)
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

  const handleChange = (event, value) => {
    setPage(value);
  };
  
  const indexOfLastPost = page * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const accordionObject = [firebaseData][0]
  console.log(accordionObject)
  const slice = accordionObject.slice(indexOfFirstPost, indexOfLastPost)
  const listAccordian = slice.map(data => {
    return(        
    <Accordion expanded={expandedPanel === data.id} onChange={handleAccordionChange(data.id)}>
    <AccordionSummary expandIcon={<ExpandMore />}>{data.Subject}</AccordionSummary>
    <AccordionDetails style={{display:"flex", "word-break":"break-word"}}>
      {data.Body}
    </AccordionDetails>
    </Accordion>)
  })

  return (
    <div className="App" style={{backgroundColor:"grey", height:"100vh"}}>
      <AppBarComponent/>
      <div style={{width:"80%", margin:"20px", flexDirection:"column", display:"flex"}}>
      <div style={{alignItems:"center"}}>
      {loaded ? listAccordian : null} 
      <Pagination style={{backgroundColor:"white"}} shape="rounded" color="secondary" variant="outline" page={page} count={Math.ceil(firebaseData.length / postsPerPage)} onChange={handleChange}/>
      </div>
      </div>
    </div>
  );
}

export default App;
