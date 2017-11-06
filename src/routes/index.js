const router = require('express').Router();
const mongoose = require('mongoose');

const FILES = [
  {id: 'a', raceName: 'Flying Pig', raceDate: 'May 2015', raceDistance: 'Half Marathon', raceTime: '2:20:15'},
  {id: 'b', raceName: 'Indianapolis Mini', raceDate: 'May 2009', raceDistance: 'Half Marathon', raceTime: '2:24:15'},
  {id: 'c', raceName: 'Fort 4 Fitness', raceDate: 'September 2016', raceDistance: 'Half Marathon', raceTime: '2:17:15'},
  {id: 'd', raceName: 'Great Pumpkin', raceDate: 'September 2017', raceDistance: '10K', raceTime: '1:03:15'}
]

router.get('/file', function(req, res, next) {
  mongoose.model('File').find({}, function(err, files) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(files);
  });
});

router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});

router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.raceName = req.body.raceName;
  file.raceDate = req.body.raceDate;
  file.raceDistance = req.body.raceDistance;
  file.raceTime = req.body.raceTime;
  res.json(file);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
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
