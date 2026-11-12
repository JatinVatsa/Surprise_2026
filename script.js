var birthdaySong = document.getElementById("birthday-song");

if (birthdaySong) {
  function startBirthdaySong() {
    birthdaySong.play().then(function(){
      document.removeEventListener("pointerdown", startBirthdaySong);
      document.removeEventListener("keydown", startBirthdaySong);
    }).catch(function(error){
      if (error.name === "NotAllowedError") {
        return;
      }
      console.error("Could not play the birthday song:", error);
    });
  }

  document.addEventListener("pointerdown", startBirthdaySong);
  document.addEventListener("keydown", startBirthdaySong);
  startBirthdaySong();
}

if (window.jQuery) {
  $(document).ready(function(){
    $("#present").addClass("animated bounceInDown");
    $("#btn__letter").on("click", function(){
      window.location.href = "./second_page/index.html";
    });
    window.addEventListener("resize", function(){
      if($("#letter-action").hasClass("is-visible")){
        positionLetterAction();
      }
    });
    $("#present").hover(function(){
        $("#present #top").addClass("animated bounce");
    }, function(){
        $("#present #top").removeClass("animated bounce");
    });
    $("#present").on("click", function(){
      $("#wrapper").addClass("letter-open");
      $("#welcome").fadeOut(500);
      $("#present #top").removeClass("animated bounce");
      $("#present #top").addClass("animated bounceOutUp");
      setTimeout(function(){
        positionLetterAction();
        $("#letter-action").addClass("is-visible");
      }, 900);
      $(this).unbind("click");
      $(this).unbind("mouseleave");
      setTimeout(function(){
        var photoLift = Math.min(190, $("#present").height() - 20);
        var photoTop = -photoLift;
        $("#present #cat").css("top", photoTop + "px");
      }, 1000);
      setTimeout(revealBirthdayDetails, 2200);
      $("#wish .wish-letter").each(function(index){
        setTimeout(bounceIn.bind(null, $(this)), 2500+index*100)
      });
    });
    function positionLetterAction(){
      var present = document.querySelector("#present").getBoundingClientRect();
      var wrapper = document.querySelector("#wrapper").getBoundingClientRect();
      var action = document.querySelector("#letter-action");
      var left;
      var top;
      if(window.innerWidth <= 800){
        left = present.left + (present.width - action.offsetWidth) / 2;
        top = present.bottom + 12;
      }else{
        left = present.right + 24;
        top = present.top + (present.height - action.offsetHeight) / 2 + 20;
      }
      action.style.left = (left - wrapper.left) + "px";
      action.style.top = (top - wrapper.top) + "px";
    }
    function revealBirthdayDetails(){
      var details = document.querySelector(".birthday-details");
      var dateOutput = document.querySelector(".date__of__birth .date-text");
      var dateText = "18 November";
      var index = 0;
      details.classList.add("is-visible");
      function typeNextCharacter(){
        if(index >= dateText.length){
          return;
        }
        dateOutput.textContent += dateText.charAt(index);
        index += 1;
        setTimeout(typeNextCharacter, 90);
      }
      typeNextCharacter();
    }
    function bounceIn(el){
      el.addClass("animated bounceInDown swing");
      setTimeout(function(){
        el.removeClass("bounceInDown").addClass("swing")
      }, 1000);
    }
  });
}
