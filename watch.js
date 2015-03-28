// ==UserScript==
// @name        vichan board watch
// @namespace   vichan-bwatch
// @match       *://lainchan.org/*
// @match       *://8ch.net/*
// @version     1
// @grant       none
// ==/UserScript==

threads = {};

$.getJSON("/test/catalog.json", function(data){
  threads['test'] = [];
  data.forEach(function(page){
    page.threads.forEach(function(thread){
      threads['test'].push(thread.no);
    });
  });
  update_compare();
});

function compare_boards(updated, old){
  diff = [];
  updated.forEach(function(thread){
    if(old.indexOf(thread) == -1){
      diff.push(thread);
    }
  });
  return diff;
}

function update_compare(){
    $.getJSON("/test/catalog.json", function(data){
    var threads_new = {};
    threads_new['test'] = [];
    data.forEach(function(page){
      page.threads.forEach(function(thread){
        threads_new['test'].push(thread.no);
      });
    });
    console.log(threads_new);
    diff = compare_boards(threads_new['test'], threads['test']);
    diff.forEach(function(thread){
      console.log(thread);
    });
  });
}

setInterval(update_compare, 30000);
