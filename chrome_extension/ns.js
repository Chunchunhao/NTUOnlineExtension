TD_INDEX_COURSE_INDEX = 0
TD_INDEX_COURSE_CLASS = 3
TD_INDEX_COURSE_ID = 6
TD_INDEX_COURSE_NAME = 4
TD_INDEX_TEACHER_NAME = 9

DEBUG = false
thisYear = 103 - 1
thisSe =  1
GPA = [ "F ", "C-", "C ", "C+", "B-", "B ", "B+", "A-", "A ", "A+"]

function isNum(data){
  return (data>='0' && data<='9') 
}

function sum_all(aryData)
{
  var total = 0
  for (idxa in aryData){
    if( aryData[idxa] == undefined){
      total += 0
    }
    else {
      total += parseInt(aryData[idxa])
    }
  }
  return total
}

function get_courses_information_table(body)
{ 
  //if the body does not has getElementsByTagName return false
  if (typeof body.getElementsByTagName !== 'function')
    return false

  tables = body.getElementsByTagName("table");
  for (var i = 0, len = tables.length; i < len; i++)
  {
    //alert(tables[i].getAttribute("bordercolordark") + "," + tables[i].getAttribute("cellpadding"))
    if (tables[i].getAttribute("bordercolordark") == "#CCCCCC" 
        && tables[i].getAttribute("cellpadding") == "1")
        return tables[i]
  }
  return false
}




function on_click_tr(event, tr)
{
  if (event.isPropagationStopped())
    return ;
    
  if ($(event.data[0]).attr('expanded') === "true")
  {
    $(event.data[0].new_row).remove(); 
    $(event.data[0]).attr('expanded', 'false');
    return ;
  }
  $(event.data[0]).attr('expanded', 'true')
  //score/102/1/103+51650/02
  new_row = $('<tr>').insertAfter(event.data[0]);
  event.data[0].new_row = new_row;
  new_column = $('<td>').appendTo(new_row).attr('colspan', '17');
                  
  url = 'http://ntuscoreapi.herokuapp.com/score/' + thisYear  + '/' + thisSe + '/' + event.data[1].replace(/\D/g, '+') + '/' + event.data[2];
  // console.log(url)

  $.get(url, 
        function(data)
        {
          list = $('<div>').addClass('courgle_article_link_wrapper').appendTo(new_column);
          var thisYearTitle
          for( i = 0; i < 3; i++)
          {
            var yearScore = []
            switch(i) {
              case 0:
                thisYearTitle = thisYear
                yearScore = data.s1
                break
              case 1:
                thisYearTitle = thisYear - 1
                yearScore = data.s2
                break
              case 2:
                thisYearTitle = thisYear - 2
                yearScore = data.s3
                break
              default:
                console.log("Error")
                continue
            }

            var students = sum_all(yearScore);

            year_bar = $('<div>')
              .addClass('year_title')
              .appendTo(list);
            /*
            item_wrapper = $('<div>')
              .addClass('')
              .appendTo(list);
            */
            year_title = $('<div>')
              .addClass('gpa_title_block')
              .text(thisYearTitle + " [" + students + "] ")
              .appendTo(year_bar)

            var largest = 0;
            for ( j = 9 ; j>=0; j -- ){
              if( yearScore[j] != undefined ){
                var wid = parseInt((yearScore[j] / students) * 36 ) + 5;
                gpa_block = $('<div>')
                  .addClass('gpa_block')    
                  .css("width", wid + '%')
                  .text(GPA[j] + ": " + yearScore[j] + "")
                  .appendTo(year_bar)
                if(yearScore[j] == 0)
                  gpa_block.addClass('no_People')
              }
              else{
                gpa_block = $('<div>')
                  .addClass('gpa_block no_People')    
                  .css("width", '5%')
                  .text(GPA[j] + ": 0")
                  .appendTo(year_bar)
              }
            }

          }
        });

  
  url2 = 'http://kiwilab.csie.org:9192/query?string=' + encodeURI(event.data[3] + '通識' + '評價');
  $.get(url2, 
        function(data)
        {
          ids = data.split('\n');
          list = $('<div>').addClass('courgle_article_link_wrapper').appendTo(new_column);
          for (i = 0; i < ids.length; i++)
          {
            if (ids[i].length == 0)
              continue;
            
            title_url = 'http://kiwilab.csie.org:9192/title?id=' + ids[i];
            content_url = 'http://kiwilab.csie.org:9192/?key=' + ids[i];
            item_wrapper = $('<div>')
              .addClass('courgle_article_link_item_wrapper')
              .attr('courgle-id', ids[i])
              .appendTo(list);
              
            title = $('<div>')
              .load(title_url)
              .addClass('courgle_article_title')
              .appendTo(item_wrapper);
            
            content = $('<div>')
              .load(content_url)
              .addClass('courgle_article_content')
              .hide()
              .appendTo(item_wrapper);
            
            title.bind('click', content,
                      function(event)
                      {
                        if (event.isPropagationStopped())
                          return ;
                        event.data.toggle();
                        event.stopPropagation();
                      }
                      );
                        
          }
          
        });

                
  event.stopPropagation();
}

function insert_comment_list(main_fram_body)
{
  if (DEBUG)
    console.log('insert_comment_list called');
  //--------------------------
  var all_element = document.getElementsByTagName("td");
  var all_str = "";
  var element_size = all_element.length;
  var reqstr = "";
  var table;
  var obj = [];

  for(var i=0;i<element_size;i++){
    var str = all_element[i].innerHTML;
    if(str=="流水號"){
      table = all_element[i];
    }
    if(!isNaN(str) && str.length==5 && isNum(str[0])){
      obj.push(all_element[i]);
      reqstr+=str+",";
    }
  }

  var url3 = "http://huli.yade.cc/classget/getpeople.php?number="+reqstr;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url3, true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
         eval(xhr.responseText);
    }
  }
  xhr.send();

  var callback = function(data){
    first = true;
    size = obj.length;
    for(var i=0;i<size;i++){
      obj[i].outerHTML += "<TD>" + data.result[i] + "</TD>";
    }
    table.outerHTML = '<td>流水號</td><td>選課人數</br>(選上/登記/上限)</td>';

  }

  // --------------------------------------


  courses_table = get_courses_information_table(main_frame_body);

  if (courses_table == false)
  {
    if(DEBUG)
      console.log('course table not found');
    return false;
  }

  courses_information = courses_table.getElementsByTagName('tr')
  // courses_information contains the header and normal column of course information
  
  
  if(DEBUG)
    console.log('begining enumerate courses' + '(' + (courses_information.length - 1) + ')')
  for (var i = 1, len = courses_information.length; i < len; i++)
  {
    course_information_tds = $('td', courses_information[i]);
    course_name_td = course_information_tds[TD_INDEX_COURSE_NAME];
    course_index_td = course_information_tds[TD_INDEX_COURSE_INDEX];
    teacher_name_td = course_information_tds[TD_INDEX_TEACHER_NAME];
    course_class_td = course_information_tds[TD_INDEX_COURSE_CLASS];
    course_id_td = course_information_tds[TD_INDEX_COURSE_ID];
    
    if (course_name_td.getElementsByTagName('a').length == 0)
      course_name = $(course_name_td).text().trim()
    else
      course_name = $('a', course_name_td).text()
      
    if (teacher_name_td.getElementsByTagName('a').length == 0)
      teacher_name = $(teacher_name_td).text().trim()
    else
      teacher_name = $('a', teacher_name_td).text()
    
    if (course_id_td.getElementsByTagName('a').length == 0)
      course_idd = $(course_id_td).text().trim()
    else
      course_idd = $('a', course_id_td).text()
      
    if (course_class_td.getElementsByTagName('a').length == 0)
      course_class = $(course_class_td).text().trim()
    else
      course_class = $('a', course_class_td).text()
    
    $(courses_information[i]).bind('click', [courses_information[i], course_idd, course_class, course_name  + ' ' + teacher_name] , on_click_tr);
    
    course_id = $(course_index_td).text() 
    if (DEBUG)
      console.log(course_id + ' ' + course_idd + ' ' + course_class);
  }
}

function reset_flag()
{
  update_flag = false
}

function check()
{
  
  if (typeof update_flag == 'undefined' || !update_flag)
  {
    main_frame_body = document.body;
    if (typeof main_frame_body == 'undefined')
    {
      if (DEBUG)
        console.log('No body found');
      return ;
    }
    main_frame_body.onunload = reset_flag
    insert_comment_list(main_frame_body)
    update_flag = true;
  }
}

//alert(window.name);
if (window.name == "main")
  setInterval(check, 100);
 
