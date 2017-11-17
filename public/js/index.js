/*************************
Function to retrieve races
*************************/
function getFiles() {
  return $.ajax('/api/file')
    .then(res => {
      console.log("Results from getFiles()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getFiles()", err);
      throw err;
    });
}

/********************************
Function to refresh the table when
races are added, deleted or updated
*********************************/
function refreshFileList() {
  const template = $('#race-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#race-data').html(html);
    })
}

/***************************
Function clears form data
when Submit button is clicked
***************************/
function clearForm () {
  $('#raceName').val('').attr('placeholder', '').removeClass('emptyInput');//.css('border-color', 'rgba(0,0,0,.15)');
  $('#raceMonth').val('January');
  $('#raceYear').val('2017');
  $('#raceDistance').val('Marathon');
  $('#raceTime').val('').attr('placeholder', 'Example format: 1:23:45').removeClass('emptyInput');//.css('border-color', 'rgba(0,0,0,.15)');
}

/**********************************
Function to reveal or hide entry form
**********************************/
function toggleVisibility () {
  $('#raceForm').toggleClass('hideme');
}

/**********************************
Function posts race data when form
submit button is clicked
**********************************/
function submitFileForm() {
    const raceName = $('#raceName').val();
    const raceMonth = $('#raceMonth').val();
    const raceYear = $('#raceYear').val();
    const raceDistance = $('#raceDistance').val();
    const raceTime = $('#raceTime').val();
    const racingData = {
      raceName: raceName,
      raceMonth: raceMonth,
      raceYear: raceYear,
      raceDistance: raceDistance,
      raceTime: raceTime
    };
    if (raceName === '' && raceTime === '') {
      $('#raceName').attr('placeholder', "Please enter name!").addClass('emptyInput');//.css('border-color', 'rgb(255,0,0)');
      $('#raceTime').attr('placeholder', "Please enter time!").addClass('emptyInput');//.css('border-color', 'rgb(255,0,0)');
    } else if (raceName === '') {
      $('#raceName').attr('placeholder', "Please enter name!").addClass('emptyInput');//.css('border-color', 'rgb(255,0,0)');
    } else if (raceTime === '') {
      $('#raceTime').attr('placeholder', "Please enter time!").addClass('emptyInput');//.css('border-color', 'rgb(255,0,0)');
      $('#raceName').attr('placeholder', "Please enter name!").removeClass('emptyInput');//.css('border-color', 'rgb(255,0,0)');
    } else {
    $.ajax({
    type: "POST",
    url: '/api/file',
    data: JSON.stringify(racingData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      refreshFileList();
      toggleVisibility();
      clearForm();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    });
  }
}

/**********************************
Populates update modal input fields
with rate data when clicked
**********************************/
function editRace(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    $('#updateName').val(file.raceName);
    $('#updateMonth').val(file.raceMonth);
    $('#updateYear').val(file.raceYear);
    $('#updateDistance').val(file.raceDistance);
    $('#updateTime').val(file.raceTime);
    $('#updateId').val(file._id);
//    console.log("I will edit you!", id);
 } else {
   console.log("Sorry, I didn't find", id)
 }
}

/**********************************
Function updates race data when form
"save changes" button is clicked
**********************************/
function updateRace() {
  const file = window.fileList.find(file => file._id);
  const raceData = {
    raceName: $('#updateName').val(),
    raceMonth: $('#updateMonth').val(),
    raceYear: $('#updateYear').val(),
    raceDistance: $('#updateDistance').val(),
    raceTime: $('#updateTime').val(),
    _id: $('#updateId').val()
  };

  $.ajax({
    type: 'PUT',
    url: 'api/file/' + raceData._id,
    data: JSON.stringify(raceData),
    dataType: 'json',
    contentType : 'application/json',
  })
  .done(function(response) {
    refreshFileList();
  })
  .fail(function(error) {
    console.log('Not updated', error);
  })
}

/**********************************
Function deletes race data when
delete button is clicked
**********************************/
function deleteRace(id) {
  if (confirm("Are you sure?")) {
    $.ajax({
      type: 'DELETE',
      url: 'api/file/' + id,
      dataType: 'json',
      contentType: 'application/json',
    })
    .done(function(response) {
      refreshFileList();
    })
    .fail(function(error) {
      console.log("File not deleted", error);
    })
  }
}
