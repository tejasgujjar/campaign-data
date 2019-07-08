$(document).ready(function(){

  console.log("loaded home page");
  load_all_events();
});


function load_all_events(){
  $("img")
       .mouseover(function() {
          var src2 = $(this).attr("src");
          console.log(src2);
           var src = $(this).attr("src").replace("default", "mouseover");
           $(this).attr("src", src);
       })
       .mouseout(function() {
           var src = $(this).attr("src").replace("mouseover", "default");
           $(this).attr("src", src);
       });

  // $('.home-icon-component').mouseover(function(event){
  //   console.log("mouseover on home");
  //   mouseover_on_home_icon()
  // });
}


function mouseover_on_home_icon(){

}
