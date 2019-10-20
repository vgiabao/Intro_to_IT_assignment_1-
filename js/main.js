modifyColor = function (item) {
    let current_color = item.style.color;
    if (current_color === 'blue') {
        item.setAttribute('style', 'color:black')
    } else if (current_color === 'black') {
        item.setAttribute('style', 'color:yellow');
    } else if (current_color === 'yellow') {
        item.setAttribute('style', 'color:white')
    } else if (current_color === 'white') {
        item.setAttribute('style', 'color:Green')
    } else {
        item.setAttribute('style', 'color:blue')
    }
}
;
modifyBeeTextColor = function (item, count) {
    if (count % 2 === 0) {
        item.setAttribute('style', 'background: -webkit-linear-gradient(black, yellow, black, yellow, black, yellow, black, yellow, black, yellow,  black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black);\n' +
            '    -webkit-background-clip: text; -webkit-text-fill-color: transparent;')
    }
    if (count % 2 === 1) {
        item.setAttribute('style', 'background: -webkit-linear-gradient(yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow, black, yellow);\n' +
            '    -webkit-background-clip: text; -webkit-text-fill-color: transparent;')
    }
};


document.addEventListener("DOMContentLoaded", function () {
    // change height of navigation bar when scrolling
    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            document.getElementById("navigation").style.height = "40px";
        } else {
            document.getElementById("navigation").style.height = "60px";
        }
    }

    // making smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // draw gifts
    let key = document.getElementById('drawGifts');
    let imageContainer = document.getElementsByClassName('giftContainer')[0];
    key.addEventListener('click', () => {
        if (imageContainer.style.display === 'none') {
            imageContainer.setAttribute('style', ' opacity: 1;display: block;');
        } else {
            imageContainer.style.display = 'none'
        }
    });
    //open box and show modal
    let boxes = imageContainer.getElementsByTagName('img');
    for (box in boxes) {
        let openBox = document.getElementById('gift' + box);
        let modalBox = document.getElementById('modal' + box);
        let modalContent = document.getElementById('modal-content' + box);
        let close = document.createElement('close');
        close.setAttribute('class', 'close');
        close.setAttribute('id', 'close' + box);
        close.innerHTML = 'OK';
        // close modal when click outside or the close area
        close.addEventListener('click', ()=>{
            modalBox.style.display = 'none'
        });
        window.addEventListener("click", function(event) {
            if (event.target === modalBox) {
                modalBox.style.display = "none";
            }});
        if (modalBox != null){
            modalContent.appendChild(close)
        }
        if (openBox != null) {
            openBox.addEventListener('click', () => {
                openBox.src = 'img/test2.png'
                modalBox.style.display = 'flex'
            })
        }

    }

    //make the bee move regularly


    let elem = document.getElementById('beeRight');
    let pos = 0;
    let angle = 0;
    let direction = null;
    let id = setInterval(frame, 10);

    function directMovement(currentDirection) {
        if (currentDirection === 'left to right') {
            angle += 0.05;
            pos += 0.125;
            elem.style.left = pos + '%';
            elem.style.top = 20 + 5 * Math.sin(angle) + '%'
        } else if (currentDirection === 'right to left') {
            angle -= 0.05;
            pos -= 0.125;
            elem.style.left = pos + '%';
            elem.style.top = 20 - 5 * Math.sin(angle) + '%'
        }

    }

    function frame() {
        if (pos >= 87) {
            // clearInterval(id);
            elem.src = 'img/beeLeft.png';
            direction = 'right to left'
        } else if (pos <= 0) {
            elem.src = 'img/beeRight.png';
            direction = 'left to right'
        }
        directMovement(direction)
    }

    //change color of contact side to get more attention!
    let contact = document.getElementById('contactId');
    let count = 1;
    let beeGuidance = document.getElementById('beeGuidance');
    console.log(beeGuidance);
    function timeout() {
        setTimeout(function () {
            modifyColor(contact);
            modifyBeeTextColor(beeGuidance, count);
            count += 1;
            timeout()
        }, 1000)
    }
    timeout();
});

