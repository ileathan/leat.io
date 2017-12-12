/************************************************
* Start                                         *
*   _____                 _     _               *
*  / ____|               | |   (_)              *
* | |  __ _ __ __ _ _ __ | |__  _ _ __   __ _   *
* | | |_ | '__/ _` | '_ \| '_ \| | '_ \ / _` |  *
* | |__| | | | (_| | |_) | | | | | | | | (_| |  *
*  \_____|_|  \__,_| .__/|_| |_|_|_| |_|\__, |  *
*                 | |                   __/ /   *
* Section         |_|                  |___/    *
*************************************************
*
*
* Create the CPU graph root obj.
*/ 
lC.graph = { 
  time: 0,
  palette: new Rickshaw.Color.Palette({scheme: 'spectrum2000'}),
}
;
lC.loadGraph = function() {

  /* Here we store our CPU info in a 2 dimensional
   * array, the first dimension represents the thread number
   * the second is the threads hashing speeds versus time. 
   * x = time, y = hashes per second
   */
  this.seriesData = []
  ;
  /* Loop through the available CPU threads */
  let i = 0, l = lC.miner._targetNumThreads
  ;
  do {
    this.seriesData[i] = [];
    // First spot is a dud so that rickshaw core doesnt QQ about null'd chart.
    this.seriesData[i].push({x: 0, y: 0}) 
  } while(++i < l)
  ;
  /* series is a 1 dimensional array of objects, 
   * which represent a CPU thread, the object in turn 
   * references series data which holds the CPU info 
   */
  this.series = []
  ;
  /* This should match the CPU threads we set seriesData with */
  for(let i = 0, l = this.seriesData.length; i < l; ++i) {
    this.series.push({
      name: 'Thread ' + i, 
      color: this.palette.color(),
      data: this.seriesData[i]
    })
  }
  /*  
  * Here we finally create the graph,
  * which we store right in lC.graph.
  * so the final graph is lC.graph.graph
  */
  this.graph = new Rickshaw.Graph({
    element: document.getElementById("chart"),
    width: 400,   
    height: 150,
    stroke: true,
    renderer: 'stack',
    series: this.series
  })
  ;
  this.annotator = new Rickshaw.Graph.Annotate({
    graph: this.graph,
    element: document.getElementById('timeline')
  })
  ;
  this.graph.render()
  ;
  lC.refreshGraph()
  ;
  /*
  * hack to ensure timeline is under the svg element
  * without editing the rickshaw core.
  */
  $('#chart').append(
    $('#timeline').remove();
  )
  ;
}.bind(lC.graph)
;
/*
* Add live data to our CPU graph.
*/
lC.refreshGraph = function(wait) {

  lC.socket.disconnected && lC.socket.connect()
  ;
  if(this.seriesData && this.seriesData[0].length > 250)
    lC.resetGraph()
  ;
  this.time += 5
  ;
  wait = wait || 5000
  ;
  for(let i = 0, l = this.seriesData.length; i < l; ++i) {
    this.seriesData[i] = this.seriesData[i] || [];
    this.seriesData[i].push({
      x: this.time,
      y: lC.miner._threads[i] ? lC.miner._threads[i].hashesPerSecond : 0
    })
  }
  this.graph.update()
  ;
  /* Freindly green text for user */
  $('#hps').text(lC.miner.getHashesPerSecond().toFixed(2))
  ;
  $('#hashes').text(lC.miner.getTotalHashes())
  ;
  setTimeout(lC.refreshGraph.bind(null, wait), wait) 
  ;
}.bind(lC.graph)
;
/*
* Reset the CPU Graph.
*
* I could not find anything in the documentation on how to 
* accomplish this task, so it may seem like a bit of a hack
* to the author, but I have already posted to their github report
* this solution, and it seems people are using it.
*/
lC.resetGraph = function() {
 
  /* preserve this 'needed' function */
  var p = this.graph.series.active
  ;
  /* 
  * preserve the colors and set the first item
  * of the new data to the last item of the old data.
  */
  var _seriesData = []
    , colors = []
  ;
  for(let i = 0, l = this.seriesData.length; i < l; ++i) {
    colors.push(this.series[i].color)
    ;
    // all the last spots are now in _seriesData.
    _seriesData[i] = [this.seriesData[i][ this.seriesData[i].length-1 ]]
    ;
  }
  this.seriesData = _seriesData
  ;
  /* reset the data to an empty array. */
  this.series = []
  ;
  /* populate series with new data, name field is not needed but i left it */
  for(let i = 0, l = this.seriesData.length; i < l; i++)
    this.series.push(
      { name: i, 
        color: colors[i], 
        data: this.seriesData[i]
      }
    )
  ;
  /* unpreserve */
  this.series.active = p
  ;
  /* set graph data to new data. */
  this.graph.series = this.series
  ;
  /* Remove all annotations */
  $('.annotation_line,.annotation').remove()
  ;
  this.graph.update()
  ;
}.bind(lC.graph)
;
/*
* Anotate our CPU chart with.
*
* The leatMmine object will report here on events.
*
*/
lC.annotateChart = function(text, color) {

  if(!this || !this.annotator)
    return
  ;
  this.annotator.add(
    this.seriesData[0][this.seriesData[0].length-1].x,
    new Date().toLocaleTimeString() + " " + text
  )
  ;
  this.annotator.update()
  // Flag found share red because user is not logged int
  $('.annotation_line').last().css('border-left', '1px solid ' + color)
  $('.annotation').last().css('background-color', color)
  $('.annotation_line').last().addClass('active')
  ; 
}.bind(lC.graph)
;
