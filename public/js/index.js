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
  })
  .fail(function(error) {
    console.log("Failures at posting, we are", error);
  });

}

function updateRace(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    $('#raceName').val(file.raceName);
    $('#raceMonth').val(file.raceMonth);
    $('#raceYear').val(file.raceYear);
    $('#raceDistance').val(file.raceDistance);
    $('#raceTime').val(file.raceTime);
    $('#raceId').val(file._id);
    toggleVisibility();
  }
/*
  $.ajax(
    type: "PUT",
    url: 'api/file/:fileId',
    data: JSON.stringify(racingData),
    dataType: 'json',
    contentType: 'application/json',
    })
    .done(function(response) {

    })

}
*/
