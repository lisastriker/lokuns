import logo from './logo.svg';
import './App.css';
import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Accordion>

<AccordionSummary  expandIcon={<ExpandMore />}>
Accordion 1
</AccordionSummary>

<AccordionDetails>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
sit amet blandit leo lobortis eget.
</AccordionDetails>

</Accordion>

<Accordion>

<AccordionSummary  expandIcon={<ExpandMore />}>
Accordion 2
</AccordionSummary>

<AccordionDetails>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
sit amet blandit leo lobortis eget.
</AccordionDetails>

</Accordion>

<Accordion>

<AccordionSummary  expandIcon={<ExpandMore />}>
  Accordion 3
</AccordionSummary>

<AccordionDetails>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
sit amet blandit leo lobortis eget.
</AccordionDetails>

</Accordion>
      </header>
    </div>
  );
}

export default App;
