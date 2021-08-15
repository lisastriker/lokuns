import logo from './logo.svg';
import './App.css';
import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { firebaseConfig } from "./firebaseConfig"
import firebase from 'firebase/app';
import "firebase/firestore";
import { Pagination } from '@material-ui/lab'

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore()

function App() {
  const [loaded, setLoaded] = useState(false)
  const [firebaseData, setFirebaseData] = useState([""])
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [pageNumber] = useState()
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
  
  // const paginate = (page) => {
  //   setLoaded(true) 
  //   setCurrentPage(page);
  // }
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
  }
  )

  return (
    <div className="App">
      <header className="App-header">
      <div style={{width:"50%"}}>
      {loaded ? listAccordian : null} 
      <Pagination color='primary' page={page} count={Math.ceil(firebaseData.length / postsPerPage)} onChange={handleChange}/>
      </div>
      
      </header>
    </div>
  );
}

export default App;
// <Pagination postsPerPage={postsPerPage}
// totalPosts={firebaseData.length}
// paginate={paginate}/>