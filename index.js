function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }
  
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
 }

var class_name; 
var subnames = [];
 function addsubName() {
     class_name = document.getElementById('newClass').value;
     var nameTxt = document.getElementById('subname_txt');
     var name = nameTxt.value;
     var txt ='';
     subnames.push(name);
     var outTable = document.getElementById('out_tbl');
 
     for(var i = 0; i < subnames.length; i++){
        // console.log(studentname);
        txt += '<li class="list-group-item  mar-b">'+ subnames[i] +'<span class="badge badge-danger fr" onclick="remsubject('+i+');">X</span></li>';
    }
    outTable.innerHTML = txt;
     var numDiv = document.getElementById('num_div');
     removeAllChildren(numDiv);
     var numTxt = document.createTextNode('You have ' + subnames.length + ' Subject');
     numDiv.appendChild(numTxt);
     nameTxt.value = "";
 }
function remsubject(e){
    var txt = '';
    var list = document.getElementById("out_tbl");
    list.removeChild(list.childNodes[e]);
    subnames.splice(e,1);
    list.innerHTML = '';
    for(var i = 0; i < subnames.length; i++){
        txt += '<li class="list-group-item  mar-b">'+ subnames[i] +'<span class="badge badge-danger fr" onclick="remsubject('+i+');">X</span></li>';
    }
    list.innerHTML = txt;
        document.getElementById('num_div').innerHTML = 'You have ' + subnames.length + ' Subject';
}
function removeAllChildren(e) {
    while (e.hasChildNodes()) {
        e.removeChild(e.firstChild);
    }
}

function hide(){
    document.getElementById('details_1').style.display = "none";
    document.getElementById('details_2').style.display = "block";
}

var studentname = [];
 function addstudent() {
     var rollnumber = document.getElementById('studentRollNum').value;
     var nameTxt = document.getElementById('studentName').value;
     var txt = '';
     var name = rollnumber + " " + nameTxt;
     studentname.push(name);
     var outTable = document.getElementById('out_std');
     for(var i = 0; i < studentname.length; i++){
         console.log(studentname);
         txt += '<li class="list-group-item mar-b">'+ studentname[i] +'<span class="badge badge-danger fr" onclick="remstd('+i+');">X</span></li>';
         console.log(txt);
     }  
     outTable.innerHTML = txt;
     document.getElementById('std_count').innerHTML = 'You have ' + studentname.length + ' Student entry';

     document.getElementById('studentRollNum').value = "";
     document.getElementById('studentName').value = "";
 }
 function remstd(e){
    var txt = '';
    var list = document.getElementById("out_std");
    list.removeChild(list.childNodes[e]);
    studentname.splice(e,1);
    list.innerHTML = '';
    for(var i = 0; i < studentname.length; i++){
        txt += '<li class="list-group-item  mar-b">'+ studentname[i] +'<span class="badge badge-danger fr" onclick="remstd('+i+');">X</span></li>';
    }
    list.innerHTML = txt;
    document.getElementById('std_count').innerHTML = 'You have ' + studentname.length + ' Student entry';
 }
 function create(){
    var classList = JSON.parse(localStorage.getItem('class_key'));
  if (classList == undefined){
      var classList = [];
  }
  else{
   var classList = JSON.parse(localStorage.getItem('class_key'));
  }
    console.log(classList);
    newClass = {
        class: class_name,
        subject: subnames,
        student: studentname
    }
    classList.push(newClass);
    console.log(classList);
    localStorage.setItem("class_key", JSON.stringify(classList));
    window.location.href = 'index.html';
    
    
}
function homeClass(){
    Class = JSON.parse(localStorage.getItem('class_key'));
    console.log(Class[0].class)
    document.getElementById('all_class').innerHTML = "";
    var txt = "";
    var index;
    for(index = 0; index < Class.length; index++){
       txt += "<a onclick='ref("+index+");'>"+ Class[index ].class +"</a>";
    }
    document.getElementById('all_class').innerHTML = txt;
} 

function selector(){

    var  holder = JSON.parse(localStorage.getItem('class_key'));
    var txt = "";
    var index;
    txt += "<select onchange='period();'' id='atn_class'>"
    for(index = 0; index < holder.length; index++){
      txt += "<option>"+ holder[index].class +"</option>";
   }
   txt += "</select>";
   document.getElementById("test").innerHTML = txt; 
   if(sessionStorage.getItem("byhref") != null){
       byref();
   }
  }
function ref(e){
    var  holder = JSON.parse(localStorage.getItem('class_key'));
    var x = holder[e].class;
    // Store
    sessionStorage.setItem("byhref", x);
    window.location.href = 'attendance_page.html';
}
function byref(){
    var x = sessionStorage.getItem("byhref");
    document.getElementById('atn_class').value = x;
}
function period(){
    var selClass = document.getElementById('atn_class').value;
    var  holder = JSON.parse(localStorage.getItem('class_key'));

    var txt = "";
    var index;
    var entry;
    txt += "<select id='session'>"
    for(index = 0; index < holder.length; index++){
        if(selClass == holder[index].class){
            for(entry = 0; entry < holder[index].subject.length; entry++ )
      txt += "<option>"+ holder[index].subject[entry] +"</option>";
       }
   }
   txt += "</select>";
   document.getElementById("period").innerHTML = txt; 
  
}
function atnProcess(){
    var info_class = document.getElementById('atn_class').value;
    var info_period = document.getElementById('session').value;
    var  holder = JSON.parse(localStorage.getItem('class_key'));  
    console.log(holder);
    var d = new Date();
    var dat = d.getFullYear()+ '/' +( d.getMonth() + 1)  + '/' +  d.getDate();
    document.getElementById('sec1').style.display = 'none';
    document.getElementById('sec2').style.display = 'block';

    var txt = "";
    var index;
    var entry;
    
    for(index = 0; index < holder.length; index++){
        if(info_class == holder[index].class){
            txt += "<ul class='list-group' id='ab_list'>";
            for(entry = 0; entry < holder[index].student.length; entry++ )
            
      txt += "<li class='list-group-item' id='"+ (holder[index].student[entry]).slice(0,2)+"' onclick='studentid(event);'>"+ holder[index].student[entry]+'</li><br><br>';

       } 
    }
    var store = [];
    
   document.getElementById("std_list").innerHTML = txt; 
}

function studentid(e){
    console.log(e.path[0].id);
    var std = e.path[0].id;
    var std_det = document.getElementById(e.path[0].id).innerText;
    if(document.getElementById(std).style.color == 'white'){

        removeAbesent(e);
    }else{

    document.getElementById(std).style.color = 'white';
    document.getElementById(std).style.backgroundColor = 'black';

   var std_arr = JSON.parse(localStorage.getItem('Attendance'));

   if (std_arr == undefined){
        var std_arr = [];
    }else {
        var std_arr = JSON.parse(localStorage.getItem('Attendance'));
    }
    std_arr.push(std_det);
    console.log(std_arr); 
    localStorage.setItem("Attendance", JSON.stringify(std_arr));
    }
}  

function removeAbesent(e){
    // var arr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 5, 9, 0];
    var std_arr = JSON.parse(localStorage.getItem('Attendance'));
    var std_det = document.getElementById(e.path[0].id).innerText;
    console.log(std_arr);
    for( var i = 0; i < std_arr.length; i++)
    { 
        if( std_arr[i] == std_det){
            std_arr.splice(i, 1); i--;
        }
    }
    document.getElementById(e.path[0].id).style.color = 'black';
    document.getElementById(e.path[0].id).style.backgroundColor = 'white';
    console.log(std_arr);
    localStorage.setItem("Attendance", JSON.stringify(std_arr));
}
function record(){
    var std_arr = JSON.parse(localStorage.getItem('Attendance'));
    console.log(std_arr);
    var info_class = document.getElementById('atn_class').value;
    var info_period = document.getElementById('session').value;
    var d = new Date();
    var info_time = d.getHours() + ':' + d.getMinutes();
    var dat =  d.getDate()+ '/' +( d.getMonth() + 1)  + '/' +  d.getFullYear() ;
    
    var record = JSON.parse(localStorage.getItem('records'));
    if(record == undefined){
        record = [];
    }else{
        var record = JSON.parse(localStorage.getItem('records'));
    }
    var pushrecord = {date: dat, session: info_period, time: info_time, class:  info_class, absenties: std_arr}
    record.push(pushrecord);
    console.log(record);
    localStorage.setItem("records", JSON.stringify(record));
    window.location.href = 'result.html'   

}
function load(){
    window.localStorage.removeItem('Attendance');
}
function classpopup(){
    var  holder = JSON.parse(localStorage.getItem('class_key'));
    console.log(holder);
    if(holder == null){
        document.getElementById('secmain').style.display = 'none';
        document.getElementById('popup').style.display = 'block';
        var txt = '';
        txt += "<h3>You don't have any class, Click the button to add class</h3><br><br>";
        txt +=  "<button class='btn btn-primary btn-block' onclick='window.location.href =" + '"add_class.html";'+"'>"+ '+ Add Class' +"</a>";
        document.getElementById('popup').innerHTML = txt
    }else{
 
    }
}