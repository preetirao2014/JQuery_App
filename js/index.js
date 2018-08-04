var lastScroll = 0;
var curScroll =0 ;
var didScroll;
var name;
var formData;
var specialist;
var date;
var time;

$(document).on('ready',function(){
  // google.maps.event.addDomListener(window, 'load', initialize);
  $("#appointment,#appointment2").click(function(){
    $("#form").show();
    $("#page").hide();
  });
  $("#logo,#service,#dir,#about,#service2,#dir2,#about2").click(function(){
    $("#form").hide();
    resetForm($("#form"));
    $("#page").show();
  });
  $("#next").click(function(){
    var submit = true;
    for(var i =0;i<$("#myform").length;i++){
      if($("form")[i].checkValidity()==false){
        submit=false;
      }
    }
    if(submit){
      name = $("#fName").val()+" "+$("#lName").val();
      console.log(name);
      $("form").submit(function(){
        $("#myform").hide();
        $("#myform2").show();
      });
    }
  });

  $("#submit").click(function(){
    var submit = true;
    for(var i =$("#myform").length;i<$("form").length;i++){
      if($("form")[i].checkValidity()==false){
        submit=false;
      }
    }
    if(submit){
      $("#form").hide();
      resetForm($("#form"));
      $("#page").show();
      console.log(specialist);
      console.log(date);
      console.log(time);
      console.log(name);
      $.ajax({
        url: "js/specialist.json",
        method: "POST",
        dataType: 'json',
        data: "1",
        success: function(data) {
          console.log("yes");
          console.log(data);


        },
        error: function(error) {
          console.log(error);
        }
      });
    }
  });

  $(window).scroll(function(event){
    didScroll = true;
  });
  setInterval(function(){
    if(didScroll){
      scrollNavbar();
      didScroll = false;
    }
  },250);

  $("#myform2").on('change',function(){
    //a succes submit would fetch the data in our json.
    $.ajax({
      url: "js/specialist.json",
      method: "GET",
      dataType: 'json',
      success: function(data) {
        formData = data;
        specialist = $("#specialist").val();
        date = $("#date").val();
        time = $("#time").val();
        $.each(formData[specialist][date],function(slot,client){
          $("#time option[value='"+slot+ "']").prop('disabled',false);
          if(client!==""){
            $("#time option[value='"+slot+ "']").prop('disabled',true);
          }
        });
      },
      error: function(error) {
        console.log(error);
      }
    });

  });
});




function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
    $("#myform").show();
    $("#reservation").hide();
}

function scrollNavbar(){
  curScroll = $(this).scrollTop();
  if(curScroll > lastScroll && curScroll>50){
    $("#nav").fadeOut();
  }else if(curScroll<lastScroll){
    $("#nav").fadeIn();
    $("#nav").css("padding","0");
  }

  if (curScroll<50) {
    $("#nav").css("padding-top",'10px');
    $("#nav").css("padding-bottom",'20px');
  }

  lastScroll=curScroll;
}


/*old google map api*/
// function initialize() {
//   var myLatLng = {lat: 40.5153870, lng: -74.3785820};
//
//   var mapProp = new google.maps.Map(document.getElementById('googleMap'), {
//     center: myLatLng,
//     scrollwheel: true,
//     zoom: 18
//   });
//
//   var marker = new google.maps.Marker({
//     map: mapProp,
//     position: myLatLng,
//     title: 'Great Wall Massage'
//   });
// }
