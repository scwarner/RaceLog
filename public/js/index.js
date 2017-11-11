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

function toggleVisibility () {
  $('#raceForm').toggleClass('hideme');
}

function submitFileForm() {
  //console.log("You clicked 'submit'. Congratulations.");
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
  })
  .fail(function(error) {
    console.log("Failures at posting, we are", error);
  });
}

function editRace(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    $('#updateName').val(file.raceName);
    $('#updateMonth').val(file.raceMonth);
    $('#updateYear').val(file.raceYear);
    $('#updateDistance').val(file.raceDistance);
    $('#updateTime').val(file.raceTime);
    $('#updateId').val(file._id);
    console.log("I will edit you!", id);
 } else {
   console.log("Aw shucks, I didn't find", id)
 }
}


function updateRace(id) {
  const file = window.fileList.find(file => file._id === id);
  const raceData = {
    raceName: $('#updateName').val(),
    raceMonth: $('#updateMonth').val(),
    raceYear: $('#updateYear').val(),
    raceDistance: $('#updateDistance').val(),
    raceTime: $('#updateTime').val(),
    raceId: $('#updateId').val(),
  };
  console.log("I will edit you!", id);
  
  /*
  $.ajax({
    type: 'PUT',
    url: 'api/file' + id,
    data: JSON.stringify(raceData),
    dataType: 'json',
    contentType : 'application/json',
  }).
  done(function(response) {
    refreshFileList();
    toggleVisibility();
  })
  .fail(function(error) {
    console.log('Not updated', error);
  })
  */
}


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
