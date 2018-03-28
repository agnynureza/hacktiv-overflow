const CronJob = require('cron').CronJob
const kue = require ('kue')
const queue = kue.createQueue()


console.log('starting Cron');
new CronJob('* * */1 * * *', function() {
  //execute kue emailing
  queue.process('email', 5, function(job, done) {
    job.data
    done()

  })
}, false, 'Asia/Jakarta')
