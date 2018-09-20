#! /usr/bin/env osascript -l JavaScript

function run() {
  let app = Application.currentApplication();
  app.includeStandardAdditions = true;
  
  let safari = Application('Safari');
  let windows = safari.windows
  for(let i = 0; i < windows.length; ++i) {
    let w = windows[i];
    let tabs = w.tabs;
    console.log(`\n# ${i+1} – ${tabs.length} tabs`);
    for(let j = 0; j < tabs.length; ++j) {
      let t = tabs[j];
      if(t.url() == null) {
        console.log(`1. ${t.name()}`)
      } else {
        console.log(`1. [${t.name()}](${t.url()})`);
      }
    }
  }
}
