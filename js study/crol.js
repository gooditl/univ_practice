import React, {useRef, useCallback} from "react";
import {Doughnut} from 'react-chartjs-2';
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";

const data = {
    labels: ["Red", "Green", "Yellow", "Gray", "Dark Gray"],
    datasets: [
        {
            label:"My Dataset",
            data: [300,50,100,40,120],
            backdropColor: ["#FF6384", "#36A2EB","#FFCE56","#ccc","#ccc"],
            hoverOffset :4,

        },
    ],
};

function soccer()
{
    return <div className="App">
        <button type="button" > Download </button>
        <div>
            <Doughnut data={data} />
        </div>
    </div>;
}
