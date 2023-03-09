import React, { useEffect, useState, useRef } from "react";

export default function Report() {
   

  return (
    <div className="page-container">
      <div className="delta-card">        
      <tableau-viz id="tableauViz" src="https://datascape-qa.deltaglobalnetwork.com/#/site/DatascapeQA/views/DataSCAPE-without-nav/ReportsBilling?:embed=y"
            toolbar="no" hide-tabs>
        </tableau-viz>
        
      </div>
    </div>
  );
}
