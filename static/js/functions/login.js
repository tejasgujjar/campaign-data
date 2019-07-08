$( document ).ready(function() {
    // alert("Login js");
    console.log("loading home functions js");
    $('#signup_btn').click(function(){
        load_home_page();
    });
});


function load_home_page(){
  location.href=location.href + "home"
//   $.ajax({
//   url: URL + '/main',
//   type: 'post', // This is the default though, you don't actually need to always mention it
//   headers:{"X-CSRFToken":getCookie('csrftoken')},
//   data:post_data,
//   success: function(data,xhr) {
//     console.log("Success data changed Row");
//       //refresh_page_with_current_data('first_page');
//       refresh_testbed_page_index(reform_url(TESTBED_URL, 1));
//   },
//   error: function(data, xhr) {
//       console.log('Got an error in changing row');
//   }
// });
}
