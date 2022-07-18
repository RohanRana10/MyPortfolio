var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
var targetSectionID;
// console.log(navMenuAnchorTags);

for(var i = 0; i<navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click',function(event){
        event.preventDefault();
        targetSectionID = this.textContent.trim().toLowerCase();

        if(targetSectionID == 'home'){
            return;
        }

        var targetSection = document.getElementById(targetSectionID);
        // console.log(targetSection);
        
        var interval = setInterval(function(){
            var targetSectionCoortinates = targetSection.getBoundingClientRect();
            // console.log(targetSectionCoortinates);

            if(targetSectionID == 'contact'){
                console.log(targetSectionCoortinates);
                if(targetSectionCoortinates.top <= 320){
                    clearInterval(interval);
                    return;
                }
                window.scrollBy(0,50);
            }

            if(targetSectionCoortinates.top <= 0){
                clearInterval(interval);
                return;
            }
            window.scrollBy(0,50);

        },20);
    });
}

//skills auto fill

var progressBars = document.querySelectorAll('.skill-progress > div');
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll',checkScroll);
var animationDone = false;

function initialiseBars(){
    //initialise all bars to zero at first
    for(let bar of progressBars){
        bar.style.width = 0 + '%';
    }
}

initialiseBars();

function fillBars(){

    for(let bar of progressBars){
        let targetWidth = bar.getAttribute('data-bar-width');
        let currentWidth = 0;
        let interval  = setInterval(function(){
            if(currentWidth > targetWidth){
                clearInterval(interval);
                return;
            }
            currentWidth++;
            bar.style.width = currentWidth + '%';

        },15);
    }
}

function checkScroll(){
    //check if skill section is visible
    var coordinates = skillsContainer.getBoundingClientRect();
    if(coordinates.top < window.innerHeight && !animationDone){
        animationDone = true;
        // fill the bars
        fillBars();
    }

    // for resetting the bars when they move out of window
    else if(coordinates.top > window.innerHeight){
        animationDone = false;
        initialiseBars();
    }
}