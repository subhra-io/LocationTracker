const fs = require("fs");
const moment = require("moment");
const simpleGit = require("simple-git");
const path = "./data.json";

const git = simpleGit();

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const weeksAgo = Math.floor(Math.random() * 52);
    const dayOfWeek = Math.floor(Math.random() * 7);
    const date = moment()
      .subtract(weeksAgo, "weeks")
      .startOf("week")
      .add(dayOfWeek, "days")
      .set({ hour: 12 }) // midday to avoid timezone issues
      .format("YYYY-MM-DDTHH:mm:ss");

    fs.writeFileSync(path, `Commit number ${i} on ${date}`);
    console.log(`Committing on: ${date}`);

    await git.add([path]);
    await git.commit(`Commit on ${date}`, path, { "--date": date });
  }

  await git.push("origin", "main"); // or 'master'
};

makeCommits(50);
