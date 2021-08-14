import logo from './logo.svg';
import './App.css';
import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { useEffect, useState } from 'react';

function App() {

  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleAccordionChange = (number) => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded ? number : false);
  };

  useEffect(() => {

  }, []);

  const accordionObject = [
    { number:1, title:"Hello", detail:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.testing" }, 
    { number:2, title:"There", detail:"teLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget.ting" },
    { number:3, title:"You", detail:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,sit amet blandit leo lobortis eget." }
  ]
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
