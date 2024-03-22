let displayed_text = document.querySelector('.display-text p');
let input_text = document.querySelector('input');
let display_time_left = document.querySelector('.time-left');
let display_mistakes = document.querySelector('.mistakes');
let display_wpm = document.querySelector('.wpm');
let display_cpm = document.querySelector('.cpm');
let display_try_again_btn = document.querySelector('button');


let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;


document.addEventListener('keydown', () => {
    input_text.focus();
})

function loadpara() {
    let paragraph = [
        "Avoid daydreaming about the years to come.", "You are the most important person in your whole life.", "Always be true to who you are, and ignore what other people have to say about you.", "Always be true to who you are, and ignore what other people have to say about you.", "Only demonstrate your strength when it’s really required."
    ];
    let randomIndex = Math.floor(Math.random() * paragraph.length);
    displayed_text.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        displayed_text.innerHTML += `<span>${char}</span>`
    }

    displayed_text.querySelectorAll('.display-text p span')[0].classList.add('active');

}


// handle user input

function initTyping() {
    
    let char = displayed_text.querySelectorAll('span');
    let typedChar = input_text.value.charAt(charIndex);


    if (charIndex < char.length && timeLeft > 0) {
        if(!isTyping){
            timer=setInterval(initTimer,1000);
            isTyping=true;
        }
        char = char[charIndex].textContent;

        if (char === typedChar) {
            console.log("Correct");
            displayed_text.querySelectorAll('.display-text p span')[charIndex].classList.add('success');

        } else {
            displayed_text.querySelectorAll('.display-text p span')[charIndex].classList.add('wrong');
            console.log('wrong');
            mistakes++;
        }

        charIndex++;
        display_mistakes.innerHTML = mistakes;
        displayed_text.querySelectorAll('.display-text p span')[charIndex].classList.add('active');
        display_cpm.innerHTML=charIndex-mistakes;
    }else{
        clearInterval(timer);
        input_text.value='';
    }

}
function initTimer() {
    if(timeLeft>0){
        timeLeft--;
        display_time_left.innerHTML=timeLeft+'s';
        let wpm=Math.round((charIndex-mistakes)/(maxTime-timeLeft)*60);
        display_wpm.innerHTML=wpm;
        console.log(wpm);
    }else{
        clearInterval(timer);
    }
}

display_try_again_btn.addEventListener('click',()=>{
    loadpara();
     maxTime = 60;
     timeLeft = maxTime;
     charIndex = 0;
     mistakes = 0;
     isTyping = false;
     clearInterval(timer);
     display_time_left.innerHTML=timeLeft+'s';
     display_cpm.innerHTML=0;
     display_wpm.innerHTML=0;
     display_mistakes.innerHTML=0;
    
})


input_text.addEventListener('input', initTyping)
loadpara();


