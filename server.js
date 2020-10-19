const cron = require('node-cron');
const Child = require('./api/child/childModel.js');
const app = require('./api/app.js');

// This will reset the children mission progress every week,
// day of week can be changed as needed
cron.schedule('* * * * Saturday', async function () {
  const res = await Child.findCompleteMission();
  if (res.length) {
    res.map(async (progress) => {
        console.log(progress);
        const result = await Child.nextMission(progress.child_id, progress.mission_id);
        console.log(result);
      })
  } else {
      console.log('No one to update.');
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
app.timeout = 60 * 10 * 1000;
