const prompt = require("prompt-sync")({ sigint: true });

name = prompt("What is your name?: ");
console.log("Como te vas " + name);
asserts = prompt("How many questions do you have right?: ");
console.log("Ok, you did right " + asserts);
if (asserts > 60) {
  console.log("Ok, you'll go to advanced")
} else if (asserts > 40) {
  console.log("Ok, you'll go to upper intermediate")
} else if (asserts > 20) {
  console.log("Ok, you'll go to intermediate")
} else {
  console.log("you're begginner ")
}
