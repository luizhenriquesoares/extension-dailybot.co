
/******************* CONST TYPES ******************* */
const Types = {
    htmlBase: "#content-dailybot-app .layout-content #content-app .content-report-topic .content-topic",
    htmlUsers: ".user-item-report .wrapper-content .member .wrapper-avatar_mini > div",
    htmlDescription: ".user-item-report .wrapper-content .report-content > p"
}

const regexMatchDescription = (node) => {
    let count = 0;

    node.each((index, body) => { if (count === 0) { item = body; count++; } });

    let description = item.querySelector(Types.htmlDescription).outerHTML;
    description = description.substring(3, description.length -4);
    
    return new Promise((ok, fail) => { ok(description) });
}

const regexMatchUser = (node) => {

    let count = 0;
    let item = null;

    node.each((index, body) => { if (count === 0) { item = body; count++; } });

      let outerHTML = item.querySelector(Types.htmlUsers).outerHTML;

      let pattern = new RegExp(/(?<=\btitle=")[^"]*/);
      let username = pattern.exec(outerHTML)[0];
      
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
   
    let html = await getNode(); 

    let username = await regexMatchUser(html);
    let description = await regexMatchDescription(html);
    
   return new Promise((ok, fail) => {
       ok({ username, description });
   })
  
};


setTimeout(() => {
    bootstrap().then((reportBot) => {
        console.log(reportBot);
    });
}, 3000);
