

var mychart = $('#line-chart');
var myLineChart = new chart(mychart, {
    type :'line',
    data :{
        labels:[
            '1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'
        ],
        datasets:[
            {
                label:'2019',
                data:[10,8,6,5,12,7,6,10,12,10]
            }
        ]
    }
})