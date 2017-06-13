@include("header")
      <form class="form-inline">
        <div class="input-group">
          <input type="text" class="form-control groupNum" size="50" placeholder="Number of People to Group" required>
          <input type="text" class="form-control tableShape" style="display:none;" size="50" placeholder="Shape of Table" required>
          <div class="input-group-btn">
          <button type="button" class="btn btn-danger continueButton">Continue..</button>
          <button type="button" class="btn btn-danger groupButton" style="display:none;">Group Us</button>
          </div>
        </div>
      </form>
      <div class="enterGroupSize" style="display:none;">Enter the size of groups you would like</div>
      <br/>
      <input type="text" class="groupSize" style="display:none; color:black;" size="50" required>
      <br/>
      <br/>
      <div class="enterNamesText" style="display:none;">Enter the initials/names of people:</div>
    <div id="tableBody">
    </div>
  </div>
  <canvas id="canvas" width="1000" height="570" style="display:none;">
    Time to upgrade your browser
  </canvas>
  <div class="wrapper">
    <button type="button" class="btn btn-danger randomSpeaker" style="display:none;">Random Speaker</button>
    <button type="button" class="btn btn-danger nextSpeaker" style="display:none;">Next Speaker</button>
    <button type="button" class="btn btn-danger doNothing" style="display:none;">All Done</button>
    <button type="button" class="btn btn-danger vOrientation" style="display:none;">Vertical Orientation</button>
    <button type="button" class="btn btn-danger getUsers" style="display:none;">Get Users</button>
  </div>
  <br>
  <div id="usersBody" align="center">
  </div>
   </body>
</html>

