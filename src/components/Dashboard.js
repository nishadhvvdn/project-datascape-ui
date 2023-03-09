import React, { useEffect, useState, useRef } from "react";

export default function Dashboard() {
   

  return (
    <div className="page-container">
      <div className="delta-card">

        <tableau-viz id="tableauViz" 
        src="https://datascape-qa.deltaglobalnetwork.com/#/site/DatascapeQA/views/DataSCAPE-without-nav/Home?:embed=yes"
            toolbar="no" hide-tabs>
        </tableau-viz> 

      </div>
    </div>
  );
}
