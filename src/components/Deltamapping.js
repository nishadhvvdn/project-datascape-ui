import React, { useEffect, useState, useRef } from "react";

export default function Deltamapping() {
   

  return (
    <div className="page-container">
      <div className="delta-card">        
      <tableau-viz 
        id="tableauViz" 
        src="https://datascape-qa.deltaglobalnetwork.com/trusted/vSv22LrkSy2AOYIyIIqJ7Q==:SYZLJIRzJnXggRsrqyMSJdws/t/DatascapeDev/views/Datascape/DeltaMappingSM?:embed=yes"
        toolbar="no" hide-tabs>
      </tableau-viz>
        
      </div>
    </div>
  );
}
