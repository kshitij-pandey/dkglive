// CSS
// require('slick-carousel/slick/slick.css');
// require('./owl.carousel.min');
// require('slick-carousel/slick/slick-theme.css');
// require('lightbox2/dist/css/lightbox.min.css');
// require('../css/main.css');

// JS
// window.$ = require('jquery');
// window.slick = require('slick-carousel');
// window.lightbox = require('lightbox2');
// require('./main.js');


let menuBtn = document.getElementById('fa-bars')
let closeBtn = document.getElementById('fa-times')
let mobileUi = document.getElementById('mobile-ul')
let mobileUiList = mobileUi.querySelectorAll('li');
let mobileNavList = document.getElementsByClassName('mobile-nav-list')

//Admin home
let blogBtn = document.getElementById('blogBtn')
let videoBtn = document.getElementById('videoBtn');
let writeBlogBtn = document.getElementById('writeBlogBtn');
let addVideoBtn = document.getElementById('addVideoBtn');
let BlogContainer = document.getElementById('BlogContainer');
let videoContainer = document.getElementById('videoContainer');
let blogTitle = document.getElementById('blogTitle');
let videoTitle = document.getElementById('videoTitle');


$(document).ready(function () {

    $("#sync1").owlCarousel({

        autoPlay: false,

        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        responsive: {
            0: {
                items: 1,
                // nav: true
            },
            600: {
                items: 1,
                // nav: false
            },
            1000: {
                items: 3,
                // nav: true,
                // loop: false
            }
        }
    })
})

function readURL(input) {
    console.log('input: ', input.files);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview-img')
                .attr('src', e.target.result)
                .width(200)
                .height(150);

            $('#preview-img').attr('hidden', false); //unhide img

            $('#remove-preview-img-btn')
                .attr('hidden', false)
        };

        reader.readAsDataURL(input.files[0]);
    }


}

$("#remove-preview-img-btn").click(function (e) {
    e.preventDefault(); // prevent default action of link
    $('#preview-img').attr('src', ""); //clear image src
    $('#preview-img').attr('hidden', true); //hide img
    $("#picture").val(""); // clear image input value
    $('#remove-preview-img-btn')
        .attr('hidden', true) // hide remove link.
});

// console.log(mobileNavList);

menuBtn.addEventListener('click', function () {
    menuBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    mobileUi.style['max-height'] = '250px';
    mobileNavList[0].style.height = '250px';
    mobileUi.style.overflow = 'visible';
    mobileUiList.forEach(li => {
        li.style['max-height'] = '250px';
        li.style.overflow = 'visible';
    })
})
closeBtn.addEventListener('click', function () {
    menuBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    mobileUi.style['max-height'] = '0';
    mobileNavList[0].style['height'] = '0px';
    mobileUi.style.overflow = 'hidden';
    mobileUiList.forEach(li => {
        li.style['max-height'] = '0';
        li.style.overflow = 'hidden';
    })
})



blogBtn.addEventListener('click', function () {
    writeBlogBtn.style.display = 'block';
    addVideoBtn.style.display = 'none';
    BlogContainer.style.display = 'block';
    videoContainer.style.display = 'none';
    blogTitle.style.display = 'block';
    videoTitle.style.display = 'none';
    blogBtn.classList.add('active-admin-action-btn');
    videoBtn.classList.remove('active-admin-action-btn');
})
videoBtn.addEventListener('click', function () {
    writeBlogBtn.style.display = 'none';
    addVideoBtn.style.display = 'block';
    BlogContainer.style.display = 'none';
    videoContainer.style.display = 'block';
    blogTitle.style.display = 'none';
    videoTitle.style.display = 'block';
    videoBtn.classList.add('active-admin-action-btn');
    blogBtn.classList.remove('active-admin-action-btn');
})

//animation
document.addEventListener('scroll', function (e) {
    // console.log(document.querySelector('.partner-card-deck').offsetTop);
    var top = (window.pageYOffset - 100) + window.innerHeight,
        isVisible = top > document.querySelector('.partner-card-deck').offsetTop;
    // console.log(top);

    if (isVisible) {
        document.querySelector('.partner-card-deck').classList.add('anim_from_bottom');
    }

    // console.log(document.querySelector('.partner-card-deck'));
});




// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// // var btn = document.getElementById("myBtn");
// var btn = document.getElementById("deleteBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// var c_no = document.getElementsByClassName("c_no")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//     modal.style.display = "none";
// }

// c_no.onclick = function () {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }


//OWl cou
