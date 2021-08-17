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
import { Route, Switch, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';
import User from './User'
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
    const snapshot = db.collection('emails').orderBy('Timestamp', 'desc').get();
       snapshot.then(
        (querySnapshot) => {
          var jobId = 1000
            querySnapshot.forEach((doc) => {
                jobId =  jobId - 1 //Fix bug here
                const document = { ...doc.data(), id: doc.id, jobId:jobId };
                console.log(doc.data())
                dataArray.push(document)

            });//--> resolve when data is ready
        },
      ).then(()=> {
      const newArray = dataArray.map(item => {
        const stringRequest1 = /(You received this message because you are subscribed to the Google Groups "LocumSg" group.).*/g
        const stringRequest2 = /(To unsubscribe from this group and stop receiving emails from it, send an email to locumsg\+unsubscribe@googlegroups.com.).*/g
        const stringRequest3 = /(To view this discussion on the web visit).*/g
        const stringRequest4 = /\r?\n\r/g
        const stringBody = String(item.Body)
        const sanitize = stringBody.replaceAll(stringRequest1, '')
        const sanitize2 = sanitize.replaceAll(stringRequest2, '')
        const sanitize3 = sanitize2.replaceAll(stringRequest3, '')
        const sanitize4 = sanitize3.replaceAll(stringRequest4, '')
        return { Body: sanitize4, id:item.id, jobId: item.jobId, Email: item.Email, Date: item.Date, Subject: item.Subject}
      })
      setFirebaseData(newArray)
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
    <Accordion style={{backgroundColor:"#dedede"}} expanded={expandedPanel === data.id} onChange={handleAccordionChange(data.id)}>
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography style={{fontWeight:"bold"}}>
      Job ID:{data.jobId}
    </Typography>
    &nbsp;
    <Typography> {data.Subject}</Typography>
    </AccordionSummary>

    <AccordionDetails style={{display:"flex", "word-break":"break-word", "flex-direction":"column"}}>
      <Typography style={{whiteSpace: 'pre-line'}}>{data.Body}</Typography>
      <br/>
      <Typography>Email sent on : {data.Date}</Typography>
    </AccordionDetails>
    </Accordion>)
  })

  function Home() {
    return (
      <div style={{width:"80%", margin:"20px", flexDirection:"column", display:"flex"}}>
      <div style={{alignItems:"center"}}>
      {loaded ? listAccordian : null} 
      <Pagination style={{backgroundColor:"white", marginTop:"10px"}} shape="rounded" color="secondary" variant="outline" page={page} count={Math.ceil(firebaseData.length / postsPerPage)} onChange={handleChange}/>
      </div>
      </div>
    )
  }
  return (
    <Router>
    <div className="App" style={{backgroundColor:"grey", height:"100%"}}>
      <AppBarComponent/>
      <Switch>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/">
        <Home/>
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;