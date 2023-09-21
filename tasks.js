
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


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
  
  if (text === 'quit\n' || text==='exit\n') {
    quit();
  }
  else if(text.slice(0,5)==='hello'){
    hello(text.slice(5));
  }
  else if(text ==='help\n'){
    help();
  }
  else if(text.slice(0,3)=== "add"){
     add(text.slice(3))
  }
  else if(text==='list\n'){
    list();
  }
  else {
    unknownCommand(text);
  }

}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name){
  console.log(`${name?'hello'+name.replace("\n",''):'hello'}!`);
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/**
 * a help command to list all the possible commands 
 *
 * @returns {void}
 */
function help(){
  console.log('available command :\nhello\nquit\nhello text') 
}


var tasksList=["node","JS","React"];

function list(){
  for(let i=0;i<tasksList.length;i++){

    console.log(i+1+" "+tasksList[i].trim())
  }
}
/**
 *  
 * add a new task in the list
 * @returns {void}
 */
function add(task){
  task=task.trim();
  if(task==="") console.log("No task to be added");
  else tasksList.push(task);
}




// The following line starts the application
startApp("Rayan")
