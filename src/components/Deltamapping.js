import React, { useEffect, useState, useRef } from "react";

export default function Deltamapping() {
   

  return (
    <div className="page-container">
      <div className="delta-card">        
      <tableau-viz id="tableauViz" src="https://datascape-qa.deltaglobalnetwork.com/#/site/DatascapeQA/views/DataSCAPE-without-nav/DeltaMappingSM&%3Atabs-no&%3Aembed-yes"
            toolbar="no" hide-tabs>
        </tableau-viz>
        
      </div>
    </div>
  );
}
