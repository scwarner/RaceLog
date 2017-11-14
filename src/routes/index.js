const router = require('express').Router();
const mongoose = require('mongoose');

const FILES = [
  {id: 'a', raceName: 'Flying Pig', raceMonth: 'May', raceYear: '2015', raceDistance: 'Half Marathon', raceTime: '2:20:15'},
  {id: 'b', raceName: 'Indianapolis Mini', raceMonth: 'May', raceYear: '2009', raceDistance: 'Half Marathon', raceTime: '2:24:15'},
  {id: 'c', raceName: 'Fort 4 Fitness', raceMonth: 'September', raceYear: '2016', raceDistance: 'Half Marathon', raceTime: '2:17:15'},
  {id: 'd', raceName: 'Great Pumpkin', raceMonth: 'September', raceYear: '2017', raceDistance: '10K', raceTime: '1:03:15'}
]

/**********************************
GET route
**********************************/
router.get('/file', function(req, res, next) {
  mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(files);
  });
});

/**********************************
POST route
**********************************/
router.post('/file', function(req, res, next) {
  const File = mongoose.model('File');
  const racingData = {
    raceName: req.body.raceName,
    raceMonth: req.body.raceMonth,
    raceYear: req.body.raceYear,
    raceDistance: req.body.raceDistance,
    raceTime: req.body.raceTime
  };

  File.create(racingData, function(err, newFile) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(newFile);
  });
});

/**********************************
PUT route
**********************************/
router.put('/file/:fileId', function(req, res, next) {
const File = mongoose.model('File');
const fileId = req.params.fileId;

File.findById(fileId, function(err, file) {
  if (err) {
    console.error(err);
    return res.status(500).json(err);
  }
  if (!file) {
    return res.status(404).json({message: "File not found"});
  }

  file.raceName = req.body.raceName;
  file.raceMonth = req.body.raceMonth;
  file.raceYear = req.body.raceYear;
  file.raceDistance = req.body.raceDistance;
  file.raceTime = req.body.raceTime;

  file.save(function(err, savedFile) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(savedFile);
  })

})
});

/**********************************
DELETE route
**********************************/
router.delete('/file/:fileId', function(req, res, next) {
  const File = mongoose.model('File');
  const fileId = req.params.fileId;

  File.findById(fileId, function(err, file) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (!file) {
      return res.status(404).json({message: "File not found"});
    }

    file.deleted = true;

    file.save(function(err, doomedFile) {
      res.json(doomedFile);
    })

  })
});

router.get('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});

module.exports = router;
