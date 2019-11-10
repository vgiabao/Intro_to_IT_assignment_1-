modifyColor = function(item) {
  let current_color = item.style.color;
  if (current_color === "blue") {
    item.setAttribute("style", "color:black; font-size:2.5rem");
  } else if (current_color === "black") {
    item.setAttribute("style", "color:yellow; font-size:2rem");
  } else if (current_color === "yellow " ) {
    item.setAttribute("style", "color:skyblue;font-size:2.5rem");
  } else if (current_color === "skyblue") {
    item.setAttribute("style", "color:Green; font-size:2rem");
  } else {
    item.setAttribute("style", "color:blue");
  }
};
modifyBeeTextColor = function(item, count) {
  if (count % 2 === 0) {
    item.setAttribute(
      "style",
      "background: -webkit-linear-gradient(black, yellow, black, yellow, black, yellow, black, yellow, black, yellow,  black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black);\n" +
        "    -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
    );
  }
  if (count % 2 === 1) {
    item.setAttribute(
      "style",
      "background: -webkit-linear-gradient(yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow);\n" +
        "    -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
    );
  }
};

document.addEventListener("DOMContentLoaded", function() {
  // change height of navigation bar when scrolling
  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      document.getElementById("navigation").style.height = "40px";
    } else {
      document.getElementById("navigation").style.height = "60px";
    }
  }

  // making smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
  // add onclick events

  // draw gifts
  let key = document.getElementById("drawGifts");
  let imageContainer = document.getElementsByClassName("giftContainer")[0];
  key.addEventListener("click", () => {
    if (imageContainer.style.display === "none") {
      imageContainer.setAttribute("style", " opacity: 1;display: block;");
    } else {
      imageContainer.style.display = "none";
    }
  });
  //open box and show modal
  let boxes = imageContainer.getElementsByTagName("img");
  for (box in boxes) {
    let info = document.getElementById("info" + box);
    let openBox = document.getElementById("gift" + box);
    let modalBox = document.getElementById("modal" + box);
    let modalContent = document.getElementById("modal-content" + box);
    let close = document.createElement("close");
    close.setAttribute("class", "close");
    close.setAttribute("id", "close" + box);
    close.innerHTML = "OK";
    // close modal when click outside or the close area
    close.addEventListener("click", () => {
      modalBox.style.display = "none";
    });
    window.addEventListener("click", function(event) {
      if (event.target === modalBox) {
        modalBox.style.display = "none";
      }
    });
    if (modalBox != null) {
      modalContent.appendChild(close);
    }
    if (openBox != null) {
      openBox.addEventListener("click", () => {
        openBox.src = "img/test2.png";
        modalBox.style.display = "flex";
      });
    }
    if (info != null) {
      info.addEventListener("click", () => {
        modalBox.style.display = "flex";
      });
    }
  }

  //make the bee move regularly
  let elem = document.getElementById("beeRight");
  let pos = 0;
  let angle = 0;
  let direction = null;
  let id = setInterval(frame, 10);
  let guidanceBar = document.getElementById("guidanceCarousel");

  function directMovement(currentDirection) {
    if (currentDirection === "left to right") {
      angle += 0.05;
      pos += 0.125;
      elem.style.left = pos + "%";
      elem.style.top = 20 + 5 * Math.sin(angle) + "%";
    } else if (currentDirection === "right to left") {
      angle -= 0.05;
      pos -= 0.125;
      elem.style.left = pos + "%";
      elem.style.top = 20 - 5 * Math.sin(angle) + "%";
    }
  }

  function frame() {
    if (pos >= 87) {
      // clearInterval(id);
      elem.src = "img/beeLeft.png";
      direction = "right to left";
    } else if (pos <= 0) {
      elem.src = "img/beeRight.png";
      direction = "left to right";
    }
    directMovement(direction);
  }

  let beeGuidance = document.getElementById("beeGuidance");
  let clickTime = 0;
  beeGuidance.addEventListener("click", () => {
    clickTime += 1;
    if (clickTime % 2 === 1) {
      console.log(clickTime);
      guidanceBar.setAttribute(
        "style",
        "position:absolute; display:flex;top:" +
          (parseInt(elem.style.top) - 10 + "%;").toString() +
          "left:" +
          (parseInt(elem.style.left) - 5).toString() +
          "%;flex-direction: column; align-items:flex-end"
      );
      clearInterval(id);
    } else {
      guidanceBar.style.display = "none";
      id = setInterval(frame, 10);
    }
  });
  // switch bee guidance
  let index = 1;
  let nextButton = document.getElementById("nextButton");
  let backButton = document.getElementById("backButton");
  let movementBar = document.getElementById("movement-bar");
  nextButton.addEventListener("click", () => {
    let guidance = document.getElementById("guidance" + index);
    index += 1;
    if (index <= 3) {
      guidance.style.display = "none";
      let nextGuidance = document.getElementById("guidance" + index);
      nextGuidance.style.display = "inline-block";
    } else {
      nextButton.style.display = "none";
      let okay = document.createElement("button");
      okay.innerHTML = "OK";
      okay.setAttribute(
        "style",
        "background-color:skyblue; color:white; display:inline-block; border-radius:5px; border:0; margin-left:20px"
      );
      movementBar.appendChild(okay);
      okay.addEventListener("click", () => {
        index = 1;
        guidance.style.display = "none";
        document.getElementById("guidance1").style.display = "inline-block";
        guidanceBar.style.display = "none";
        okay.style.display = "none";
        nextButton.style.display = "block";
        clickTime += 1;
        id = setInterval(frame, 10);
      });
    }
  });
  backButton.addEventListener("click", () => {
    if (index > 1) {
      let currentGuidance = document.getElementById("guidance" + index);
      currentGuidance.style.display = "none";
      index -= 1;
      let previousGuidance = document.getElementById("guidance" + index);
      previousGuidance.style.display = "inline-block";
    }
  });
  //change color of contact side to get more attention!
  let contact = document.getElementById("contactId");
  let count = 1;
  let job = document.getElementById('myJob');
  console.log(job);
  function timeout() {
    setTimeout(function() {
      modifyColor(contact);
      modifyBeeTextColor(beeGuidance, count);
      modifyColor(job);
      count += 1;
      timeout();
    }, 1000);
  }

  timeout();
});
