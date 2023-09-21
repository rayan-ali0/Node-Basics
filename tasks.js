const fs = require('fs');

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

// fs.readFile('./database.json','utf-8',(error,data)=>{
// if(error){
//   console.log(error);
//   return;
// }
// else{
//    try {
//     const data=JSON.parse(data);
//     console.log(data[0]);
//    }
//    catch(error){
//     console.log("Error parsing JSON ",error)
//    }
// }
// })




/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if (text.slice(0, 5) === 'hello') {
    hello(text.slice(5));
  }
  else if (text === 'help\n') {
    help();
  }
  else if (text.slice(0, 3) === "add") {
    add(text.slice(3))
  }
  else if (text === 'list\n') {
    list();
  }
  else if (text.slice(0, 6) === 'remove') {
    remove(text.slice(6));
  }
  else if (text.slice(0, 4) === 'edit') {
    edit(text.slice(4));
  }
  else if (text.slice(0, 5) === 'check') {
    check(text.slice(5));
  }
  else if (text.slice(0, 7) === 'uncheck') {
    uncheck(text.slice(7));
  }
  else {
    unknownCommand(text);
  }

}
var tasksList = [{
  taskN: "Get cheese", done: false
}
  ,
{ taskN: "Get Milk", done: true }
  ,
{ taskN: "Get sweets", done: false }
];


fs.writeFile('./database.json', JSON.stringify(tasksList), (error) => {
  if (error) {
    console.log(error);
  }
  else {
    console.log('File successfully written')
  }
})

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name) {

  console.log(`${name ? 'hello' + name.replace("\n", '') : 'hello'}!`);
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * a help command to list all the possible commands 
 *
 * @returns {void}
 */
function help() {
  console.log('available command :\nhello\nquit\nhello text\nadd\nremove\nedit\ncheck\nuncheck')
}



function list() {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].done === false) {
      console.log("[ ]" + tasksList[i].taskN)
    }
    else { console.log(`[\u2713]` + tasksList[i].taskN) };
  }
}

/**
 *  
 * add a new task in the list
 * @returns {void}
 */
function add(task) {
  task = task.trim();
  if (task === "") console.log("No task to be added");
  else {
    let added = { taskN: task, done: false };
    tasksList.push(added)
  }

}

/**
 *  
 * remove a task in the list
 * @returns {void}
 */
function remove(taskNb) {
  taskNb = taskNb.trim();
  if (taskNb === "") {
    tasksList.pop();
    ;
  }
  else if (parseInt(taskNb) <= 0 || parseInt(taskNb) > tasksList.length) {
    console.log("Out of index")
  }
  else tasksList.splice(parseInt(taskNb) - 1, 1);
}

/**
 *  
 * edit tasks in the list
 * @returns {void}
 */
function edit(task) {
  var keys = Object.keys(tasksList);
  task = task.trim();
  if (task === "") console.log("nothing to be edited");
  const [index, ...text] = task.split(' ');

  if (!isNaN(index)) {
    if (parseInt(index) <= 0 || parseInt(index) > tasksList.length) {
      console.log("Out of index")
    }

    else {
      tasksList[parseInt(index) - 1].taskN = text.join(' ');
    }
  }
  else {
    tasksList[tasksList.length - 1].taskN = task;

  }

}

/**
 *  
 * remove a task in the list
 * @returns {void}
 */
function check(task) {
  task = task.trim();
  if (parseInt(task) <= 0 || parseInt(task) > tasksList.length) {
    console.log("Out of index")
  }
  else if (task === "") {
    console.log("Enter a valid task")
      ;
  }
  else if (tasksList[Number(task) - 1].done == true) {

    console.log("Already checked");
  }
  else {
    tasksList[Number(task) - 1].done = true;
  }
}

/**
 *  
 * remove a task in the list
 * @returns {void}
 */
function uncheck(task) {
  task = task.trim();
  if (parseInt(task) <= 0 || parseInt(task) > tasksList.length) {
    console.log("Out of index")
  }
  else if (task === "") {
    console.log("Enter a valid task")
      ;
  }
  else if (tasksList[Number(task) - 1].done == false) {

    console.log("Already unChecked");
  }
  else {
    tasksList[Number(task) - 1].done = false;
  }
}

// The following line starts the application
startApp("Rayan")
