#! /usr/bin/env osascript -l JavaScript

let app = Application.currentApplication();
app.includeStandardAdditions = true;

function asTaskPaper(tree) {
  let s = `${tree.title}:\n`;
  for(let i = 0; i < tree.windows.length; ++i) {
    let w = tree.windows[i];
    s += `\t${i+1} - ${w.tabs.length} tabs:\n`;
    for(let j = 0; j < w.tabs.length; ++j) {
      let t = w.tabs[j];
      s += `\t\t${t.name}\n\t\t\t${t.url}\n`;
    }
  }
  return s;  
}

function asMarkDown(tree) {
  let s = `# ${tree.title}\n`;
  for(let i = 0; i < tree.windows.length; ++i) {
    let w = tree.windows[i];
    s += `## ${i+1} - ${w.tabs.length} tabs\n\n`;
    for(let j = 0; j < w.tabs.length; ++j) {
      let t = w.tabs[j];
      s += `1. [${t.name}](${t.url})\n`;
    }
    s += "\n";
  }
  return s;
}

function prependToStandardHistoryFile(str) {
  let standardHistoryFile = '/Users/flegelleicht/.safari-sessions.markdown';
  
  try {
    let sessionContent = $.NSString.alloc.initWithUTF8String(str);
    let previousContent = '';
    
    if($.NSFileManager.defaultManager.fileExistsAtPath(standardHistoryFile)) {
      previousContent = $.NSString.stringWithContentsOfFileEncodingError(standardHistoryFile, $.NSUTF8StringEncoding, null);
    }
    
    
    let content = sessionContent.stringByAppendingString(previousContent);
    content.writeToFileAtomicallyEncodingError(standardHistoryFile, true, $.NSUTF8StringEncoding, null);
        
    return true;
    
  } catch (error) {
    console.log(`Couldn't write file due to ${error}`);    
    return false;
  }
}

function run() {
  let safari = Application('Safari');
  let windows = safari.windows;  
  let session = { title: '', windows: [] };
  
  if( windows && windows.length > 0) {
    session.title = `${(new Date()).toLocaleString('de-DE', { timeZone: 'UTC'})}`;
    
    for(let i = 0; i < windows.length; ++i) {
      let w = windows[i];
      let tabs = w.tabs;    
      let session_w = { tabs: [] }
      session.windows.push(session_w);

      for(let j = 0; j < tabs.length; ++j) {
        let t = tabs[j];
        let session_t = { name: null, url: null};
        session_t.name = t.name();
        session_t.url = t.url();
        session_w.tabs.push(session_t);        
      }
    }
  }
  
  if(session.windows.length > 0) {
    // console.log(asMarkDown(session));
    prependToStandardHistoryFile(asMarkDown(session));
  }  
}
