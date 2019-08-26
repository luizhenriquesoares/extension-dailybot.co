
/******************* CONST TYPES ******************* */
const Types = {
    htmlBase: "#content-dailybot-app .layout-content #content-app .content-report-topic .content-topic",
    htmlUsers: ".user-item-report .wrapper-content .member .wrapper-avatar_mini > div",
    htmlDescription: ".user-item-report .wrapper-content .report-content > p"
}
/*****************************************************/

const puppeteer = require('puppeteer');

/**
 * 
 * Filter report 
 * 
 * @param {*} username 
 * @param {*} reportArr 
 */
const filterReport = async (username, reportArr) => {
    return new Promise((resolve, reject) => { 
        resolve(reportArr.filter(item => item.username === username)[0]); 
    });
}

/**
 * 
 * Return all descriptions 
 * 
 * @param {Promise<Array>} node 
 */
const regexMatchDescription = (node) => {

    let description = [];

    node.splice(2, 0);

    const childNodes = node[0].childNodes;

    for (const key in childNodes) {
        if (typeof childNodes[key] === 'object' && childNodes[key].length === undefined) {
            description.push(childNodes[key].querySelector(Types.htmlDescription).outerHTML);
        }
    }
    return new Promise((ok, fail) => { ok(description) });
}

/**
 * 
 * Return all usernames 
 * 
 * @param {Promise<Array>} node 
 */
const regexMatchUser = (node) => {

    let item = [];
    let username = [];

    node.splice(2, 0);

    const childNodes = node[0].childNodes;

    for (const key in childNodes) {
        if (typeof childNodes[key] === 'object' && childNodes[key].length === undefined) {
            item.push(childNodes[key].querySelector(Types.htmlUsers).outerHTML);
        }
    }

    for (const names of item) {
        let pattern = new RegExp(/(?<=\btitle=")[^"]*/);
        username.push(pattern.exec(names)[0]);
    }
      
    return new Promise((ok, fail) => { ok(username) });
};


/**
 * get element html all content
 */
const getNode = async () => {

    let node = $(Types.htmlBase);

    return new Promise((ok, fail) => {
        if (node.length <= 0) { fail('Sem html'); } 
        return ok(node);
    });
}


// Init Applications
const bootstrap = async () => {

    const obj = [];
   
    let html = await getNode(); 

    let username = await regexMatchUser(html);
    let description = await regexMatchDescription(html);

    for (let index = 0; index < username.length; index++) {
        const name  = username[index];
        const title = description[index];

        obj.push({username: name, description: title});
    }

   return new Promise((ok, fail) => {
       ok(obj);
   })
  
};


setTimeout(() => {
    let username = 'Leandro Sander Augusto Manzieri';
    bootstrap().then(async (reportBot) => {
        const obj = await filterReport(username, reportBot);
        console.log(obj);

        
    });
}, 3000);
