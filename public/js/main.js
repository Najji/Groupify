$(document).ready(function() {

  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN" : $('meta[name="csrf-token"]').data('value')
    }
  }); 

  $(".groupNum").select().focus()

// HANDLING EVENT USER CLICKS CONTINUE BUTTON

  $(".groupNum").keypress(function (e) {
    if (e.which === 13) {
      $(".continueButton").click();
      return false;
    }
  });

  $(".tableShape").keypress(function (e) {
    if (e.which === 13) {
      $(".groupButton").click();
      return false;
    }
  });


  $(".continueButton").click(function(event){
    if (!$(".groupNum").val() == '') {
      var groupNum = $(".groupNum").val();
      if (!isNaN(groupNum) && Number(groupNum) > 0) {
        $(".groupNum").hide();
        $(".tableShape").show();
        $(".continueButton").hide();
        $(".groupButton").show();
        $(".tableShape").select().focus()
        $(".groupButton").click(function(event){
          if (!$(".tableShape").val() == '') {
            var tableShape = $(".tableShape").val();
            if (tableShape.toLowerCase() != "rectangle") {
              $(".tableShape").val("");
              apprise("Tables currently supported: rectangle");
            } else {
              $.ajax({
                url: '/home/postNumShape',
                type: 'POST',    
                dataType: 'text',
                data: { 
                  "groupNum"   : groupNum,
                  "tableShape" : tableShape
                },
                success: function (data) {
                  takeInitials(groupNum, tableShape);
                },
                error: function () {
                  alert('error');
                }
              });              
            }

          }
        });
      } else {
        apprise("Number of people must be a number and greater than 0");
        $(".groupNum").val('')
      }
    }
  });




})

function takeInitials(groupNum, tableShape) {

  $(".form-inline").hide();
  var groupNum = groupNum
  $(".enterNamesText").show();
  var htmlString = '';
  htmlString +=  "<table align='center'>"
  for (i = 0; i < groupNum; i){
    htmlString +=  "<tr>"
    for (j = 0; j < 5; j++) {
      if (i < groupNum){
        htmlString +=  
        "<td> <div class='clearfix'> <input type='text' style='color:black;' class='allNames' maxlength='3'</div> </td>";    
        i++;      }
    }
    htmlString +=  "</tr>"
  }
  htmlString +=  "</table>"
  htmlString += "<br/>"
  htmlString += "<button type='button' class='btn btn-danger submitNamesButton'>Submit Names</button>"
  document.getElementById("tableBody").innerHTML = htmlString
  $(".enterGroupSize").show()
  $(".groupSize").show()
  $(".groupSize").select().focus()
  $(".allNames").keypress(function (e) {
    if (e.which === 13) {
      $(".submitNamesButton").click();
      return false;
      }
  });
  $('.submitNamesButton').off('click').on('click', function(event) {
    if (isNaN($(".groupSize").val())|| $("groupSize").val() <= 0 ) {
      $(".groupSize").val('')
      apprise("Group size must be a number and greater than 0")
    } 
    var flag = 1;
    $(".allNames").each(function(){
      if ($(this).val() == ''){
        flag = 0;        
      }
    });

    if (flag == 1){
      $("#canvas").show()
      var canvas = $("#canvas")[0]
      canvas.width = canvas.width
      namesArray = new Array();
      $(".allNames").each(function() {
        namesArray.push({name: $(this).val().toLowerCase(), group: null});
      })
      namesArray = _.shuffle(namesArray)
      groupSize = $(".groupSize").val();
      mod = groupNum % groupSize
      div = groupNum / groupSize
      div = parseInt(div)
      for (i = 0; i < div; i++) {
        for (j = 1; j <= groupSize; j++){
          namesArray[i*groupSize+j-1].group = i;
        }
      }
      for (i = 0;  i < mod; i++){
        namesArray[namesArray.length-i-1].group = i
      }

      namesArray = _.sortBy(namesArray, 'group')

      
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
      ctx.clearRect(xPointTL,yPointTL,tableWidth,tableHeight)
      ctx.beginPath()
      ctx.rect(xPointTL,yPointTL,tableWidth,tableHeight)
      ctx.stroke()

      // ctx.fillText("Front of table", canvasWidth-150, canvasHeight/2);
      // ctx.fillText("Left side of table", canvasWidth/2, canvasHeight/2-250);

      ctx.font = "18px Arial"

      var upperYOffset = 1
      var lowerYOffset = 1

      var prevGroup = namesArray[0].group
      var currGroup = namesArray[0].group
      var groupFlag = 0
      for (i = 0; i < namesArray.length; i++) {
        
        var name = namesArray[i].name
        currGroup = namesArray[i].group
        
          if (currGroup != prevGroup) {
            if (groupFlag == 0) {
              upperYOffset += 4
              groupFlag = 1
            } else {
              groupFlag = 0
              lowerYOffset += 4
            }
          }
          prevGroup = currGroup
        
        if (groupFlag == 0) {
          ctx.beginPath()
          ctx.fillText(name, xPointTL+personRadius*upperYOffset - textOffset,yPointTL-personRadius*2-textOffset)
          ctx.arc(xPointTL+personRadius*upperYOffset,yPointTL-personRadius,personRadius,0,2 * Math.PI, false)
          ctx.stroke()
          upperYOffset += 2
        } else {
          ctx.beginPath()
          ctx.fillText(name, xPointBL+personRadius*lowerYOffset - textOffset,yPointBL+personRadius*3)
          ctx.arc(xPointBL+personRadius*lowerYOffset,yPointBL+personRadius,personRadius,0,2 * Math.PI, false)
          ctx.stroke()
          lowerYOffset += 2
        }
      }
      $(".nextSpeaker").hide();
      $(".doNothing").hide();
      $(".randomSpeaker").show();
      $(".vOrientation").show();

      $(".vOrientation").unbind('click').click(function(event){
       apprise("Rotate table 90 degrees anti-clockwise for a vertical orientation");
      });


      $(".randomSpeaker").unbind('click').click(function(event){
        $(".randomSpeaker").hide();
        $(".nextSpeaker").show();
        randomSpeakerArray = _.shuffle(namesArray)
        randomSpeaker = randomSpeakerArray.pop();
        // NEED TO CHANGE LATER
        if (randomSpeakerArray.length > 0) {
          if (randomSpeaker.name == "nm") {
            randomSpeakerArray.push(randomSpeaker);
            randomSpeakerArray = _.shuffle(randomSpeakerArray);
            $(".randomSpeaker").click();
            return;
          }
        }
        ctx.clearRect(xPointTL,yPointTL,tableWidth,tableHeight)
        ctx.beginPath();
        ctx.fillText("Current speaker: " + randomSpeaker.name, canvasWidth/2 - 75, canvasHeight/2);
        ctx.stroke();
      });

      $(".nextSpeaker").unbind('click').click(function(event){
        randomSpeaker = randomSpeakerArray.pop();
        // NEED TO CHANGE
        if (randomSpeakerArray.length > 0) {
          if (randomSpeaker.name.toLowerCase() == "nm") {
            randomSpeakerArray.push(randomSpeaker);
            randomSpeakerArray = _.shuffle(randomSpeakerArray);
            $(".nextSpeaker").click();
            return;
          }
        }
        ctx.clearRect(xPointTL,yPointTL,tableWidth,tableHeight)
        ctx.beginPath();
        if (randomSpeaker.name == "nm") {
        ctx.fillText("Current speaker: Najji", canvasWidth/2 - 75, canvasHeight/2);
        ctx.stroke();
      } else {
        ctx.fillText("Current speaker: " + randomSpeaker.name, canvasWidth/2 - 75, canvasHeight/2);
        ctx.stroke(); 
      }
        if (randomSpeakerArray.length == 0) {
          $(".nextSpeaker").hide();
          $(".doNothing").show();
        } 
      });
    }
  });
}



