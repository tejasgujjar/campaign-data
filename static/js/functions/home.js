$(document).ready(function(){
  load_all_events();
});

var BASE_URL  = window.location.origin;
var MEMBERS_JSON = [];

function load_all_events(){
  load_all_members();

  $('#result-div').hide()

  $("#search_member").unbind();
  $("#search_member").keyup(function(event){
    var search_text = event.target.value;
    search_text = search_text.toLowerCase();
    refersh_suggestions(search_text);
  });
}

function _get_object_from_name(name){
  var found = false
  $.each(MEMBERS_JSON, function(idx, obj){
    if (obj.name.indexOf(name) >= 0){
      found = obj;
    }
  });
  return found;
}

function render_result(mem_name){
  var mem_obj = _get_object_from_name(mem_name);
  if(mem_obj){
    $('#selected_member_doorsknocked').html(mem_obj.doors_knocked);
    $('#selected_member_name').html(mem_name);
    $('#result-div').show()
  }else{
    console.error("Unable to get member object: "+ mem_name)
  }
}

function render_suggestion_list_html(members_name_list){
  var html_str = ""
  $('#suggestion_box').html(html_str);
  $.each(members_name_list, function(idx, mem_name){
    html_str += "<li><button class='btn btn-default btn-sm btn-li'>" + mem_name + "</button></li>"
  });
  $('#suggestion_box').html(html_str);

  $("li button").unbind();
  $("li button").click(function(e){
    render_result(e.currentTarget.innerHTML);
  });
}

function refersh_suggestions(search_text){
  var searched_list = [];
  $.each(MEMBERS_JSON, function(idx, obj) {
    obj_name = obj.name.toLowerCase();
    if(obj_name.indexOf(search_text) >= 0){
      searched_list.push(obj.name);
    }
  });
  render_suggestion_list_html(searched_list);
}

function load_all_members(){
  $.ajax({
    url: BASE_URL + '/members/',
    type: 'get', // This is the default though, you don't actually need to always mention it
    headers:{"X-CSRFToken":getCookie('csrftoken')},
    // data:post_data,
    success: function(data,xhr) {
      console.log("Success data members");
        var json_data = $.parseJSON(data);
        MEMBERS_JSON = json_data;
        console.log(json_data)
        // render_html_list(MEMBERS_JSON)
    },
    error: function(data, xhr) {
        console.log('Got an error in getting members');
    }
  });
}

function render_html_list(members){
  var list = []
  console.log("len: member: " + members.length)
  $.each(members, function(idx, obj){
      console.log("testn each");
      list.push("<li value=" +obj.name+ "><button class='btn btn-default btn-sm btn-li'>" + obj.name + "</button></li>")
  });
  $('#suggestion_box').html(list);
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}