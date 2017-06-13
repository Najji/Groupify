
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var canvasWidth = canvas.width
  var canvasHeight = canvas.height

  var tableWidth = 600
  var tableHeight = 250

  var xPointTL = canvasWidth/2-tableWidth/2
  var yPointTL = canvasHeight/2-tableHeight/2 

  var xPointBL = canvasWidth/2-tableWidth/2
  var yPointBL = canvasHeight/2+tableHeight/2

  var textOffset = 10

  var personRadius = 20


  //Draw table
  

  ctx.beginPath()
  ctx.rect(xPointTL,yPointTL,tableWidth,tableHeight)
  ctx.stroke()

  //Draw the people
  ctx.font = "18px Arial"

  ctx.beginPath()
  ctx.fillText("cd", xPointTL+personRadius - textOffset,yPointTL-personRadius*2-textOffset)
  ctx.arc(xPointTL+personRadius,yPointTL-personRadius,personRadius,0,2 * Math.PI, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillText("cd", xPointTL+personRadius*3 - textOffset,yPointTL-personRadius*2-textOffset)
  ctx.arc(xPointTL+personRadius*3,yPointTL-personRadius,personRadius,0,2 * Math.PI, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillText("cd", xPointTL+personRadius*5 - textOffset,yPointTL-personRadius*2-textOffset)
  ctx.arc(xPointTL+personRadius*5,yPointTL-personRadius,personRadius,0,2 * Math.PI, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillText("cd", xPointBL+personRadius - textOffset,yPointBL+personRadius*3)
  ctx.arc(xPointBL+personRadius,yPointBL+personRadius,personRadius,0,2 * Math.PI, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillText("cd", xPointBL+personRadius*3 - textOffset,yPointBL+personRadius*3)
  ctx.arc(xPointBL+personRadius*3,yPointBL+personRadius,personRadius,0,2 * Math.PI, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillText("cd", xPointBL+personRadius*5 - textOffset,yPointBL+personRadius*3)
  ctx.arc(xPointBL+personRadius*5,yPointBL+personRadius,personRadius,0,2 * Math.PI, false)
  ctx.stroke()