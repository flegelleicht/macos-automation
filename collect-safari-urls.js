#! /usr/bin/env osascript -l JavaScript

let app = Application.currentApplication();
app.includeStandardAdditions = true;

function prependToStandardHistoryFile(str) {
  let standardHistoryFile = '~/.safari-sessions';
  
  try {
    let previousContent = '';
    
    if($.NSFileManager.defaultManager.fileExistsAtPath(standardHistoryFile)) {
      let previousContent = $.NSString.stringWithContentsOfFileEncodingError(standardHistoryFile, $.NSUTF8StringEncoding, null);
    }
    
    let newContent =  `${str}${previousContent}`;
    
    content = $.NSString.alloc.initWithUTF8String(newContent);
    content.writeToFileAtomicallyEncodingError(standardHistoryFile, true, $.NSUTF8StringEncoding, null);
        
    return true;
    
  } catch (error) {
    console.log(`Couldn't write file due to ${error}`);
    
    try { app.closeAccess(standardHistoryFile); } 
    catch (error) { console.log(`Couldn't close file due to ${error}'`); }
    return false;
  }
}

function run() {
  let safari = Application('Safari');
  let windows = safari.windows;
  let result = '';
  
  if( windows && windows.length > 0) {
    result += `Session ${(new Date()).toLocaleString('de-DE', { timeZone: 'UTC'})}:\n`;
    
    for(let i = 0; i < windows.length; ++i) {
      let w = windows[i];
      let tabs = w.tabs;
    
      result += `\t${i+1} – ${tabs.length} tabs:\n`;

      for(let j = 0; j < tabs.length; ++j) {
        let t = tabs[j];
        if(t.url() == null) {
          result += `\t\t- ${t.name()}\n`
        } else {
          result += `\t\t- ${t.name()}\n\t\t\t${t.url()}\n`;
        }
      }
    }
  }
  
  if(result !== '') {
    prependToStandardHistoryFile(result);
  }
}
