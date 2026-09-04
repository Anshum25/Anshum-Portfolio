import { lerp } from "./utils.js";
import { createProjects, createBlogposts } from "./projects.js";

const main = document.getElementById('luxy');
const video = document.querySelector('.main__video');
const videoSection = document.querySelector('#video');
const videoSticky = document.querySelector('.video__sticky');

createProjects();
createBlogposts();

// Video
const headerLeft = document.querySelector('.text__header__left');
const headerRight = document.querySelector('.text__header__right');

function animateVideo(){
    if(!videoSection) return;
    let bounds = videoSection.getBoundingClientRect();
    let bottom = bounds.bottom;
    let scale = 1 - ((bottom - window.innerHeight) * .0005);
    scale = scale < .2 ? .2 : scale > 1 ? 1 : scale;
    if (video) video.style.transform = `scale(${scale})`;

    // Text transformation
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;
    if (headerLeft) headerLeft.style.transform = `translateX(${-textTrans}px)`;
    if (headerRight) headerRight.style.transform = `translateX(${textTrans}px)`;
} 

// Projects
const projectsSection = document.querySelector('#projects-fp');
const projectsSticky = document.querySelector('.projects__sticky');
const projectSlider = document.querySelector('.projects__slider');

let projectTargetX = 0;
let projectCurrentX = 0;

let percentages = {
    small: 700,
    medium: 300,
    large: 100
}

let limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large

function setLimit(){
    limit = window.innerWidth <= 600 ? percentages.small :
            window.innerWidth <= 1100 ? percentages.medium :
            percentages.large
}

window.addEventListener('resize', setLimit);

function animateProjects(){
    if (!projectsSticky || !projectSlider || !projectsSection) return;
    
    let bounds = projectsSection.getBoundingClientRect();
    let distancePastTop = -bounds.top;
    
    let percentage = (distancePastTop / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage;
    projectTargetX = percentage;
    projectCurrentX = lerp(projectCurrentX, projectTargetX, .1);
    projectSlider.style.transform = `translate3d(${-(projectCurrentX)}vw, 0 , 0)`;
}

// Post animation
const blogSection = document.getElementById('blog-fp');
const blogHero = document.querySelector('.blog__hero');
const blogPosts = [...document.querySelectorAll('.post')];

function scrollBlogPosts(){
    if(!blogSection) return;
    let blogSectionTop = blogSection.getBoundingClientRect().top;
    for(let i = 0; i < blogPosts.length; i++){
        if(blogPosts[i].parentElement.getBoundingClientRect().top <= 1){
            let offset = (blogSectionTop + (window.innerHeight * (i + 1))) * .0005;
            offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
            blogPosts[i].style.transform = `scale(${1 + offset})`
        }
    }
}

// Circle animation
const circleSection = document.getElementById('circle__section');
const circleSticky = document.querySelector('.circle__sticky');
const circle = document.querySelector('.circle');

function scrollCircle(){
    if(!circleSection || !circle) return;
    let {top} = circleSection.getBoundingClientRect();
    let scaleTop = Math.abs(top);
    let scale = (scaleTop / window.innerHeight)
    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
    if(top <= 0){
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }else{
        circle.style.transform = `translate(-50%, -50%) scale(${0})`;
    }
}

// Dicover text animation
const dContainer = document.querySelector('.discover__container')
const leftText = document.querySelector('.text__left');
const rightText = document.querySelector('.text__right');

function scrollDiscover(){
    if(!dContainer || !leftText || !rightText) return;
    let {bottom} = dContainer.getBoundingClientRect();
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans
    leftText.style.transform = `translateX(${-textTrans}px)`
    rightText.style.transform = `translateX(${textTrans}px)`
}


// Text reveal
const textReveals = [...document.querySelectorAll('#final-portfolio-wrapper .text__reveal')];

let callback = (entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            [...entry.target.querySelectorAll('span')].forEach((span, idx) => {
                setTimeout(() => {
                    span.style.transform = `translateY(0)`;
                }, (idx+1) * 50)
            })
        }
    })
})

let options = {
    rootMargin: '0px',
    threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);

textReveals.forEach(text => {
    let string = text.innerText;
    let html = '';
    for(let i = 0; i < string.length; i++){
        html += `<span>${string[i]}</span>`;
    }
    text.innerHTML = html
    observer.observe(text);
})


// SIMULATE STICKY FOR LUXY
function simulateSticky(sectionEl, stickyEl) {
    if(!sectionEl || !stickyEl) return;
    let bounds = sectionEl.getBoundingClientRect();
    let maxTranslate = bounds.height - stickyEl.getBoundingClientRect().height;
    
    let translateY = 0;
    if (bounds.top < 0) {
        translateY = -bounds.top;
        if (translateY > maxTranslate) {
            translateY = maxTranslate;
        }
    }
    
    // Instead of completely overwriting transform, we should be careful.
    // However, none of these sticky elements have other transforms except circle?
    // Wait, circle has transform: translate(-50%, -50%) scale(...) on .circle, not .circle__sticky.
    stickyEl.style.transform = `translate3d(0, ${translateY}px, 0)`;
}


function animate(){
    animateVideo();
    animateProjects();
    scrollBlogPosts();
    scrollCircle();
    scrollDiscover();
    
    // Run sticky simulations
    simulateSticky(videoSection, videoSticky);
    simulateSticky(projectsSection, projectsSticky);
    simulateSticky(blogSection, blogHero);
    
    // Blog posts themselves act as sticky in the original CSS!
    const blogPostContainers = document.querySelectorAll('.blog__post');
    blogPostContainers.forEach(container => {
        simulateSticky(blogSection, container); // Wait, each blog post should stick within blogSection?
        // Actually original CSS says `.blog__hero, .blog__post { position: sticky; top: 0; height: 100vh; }`
        // If they are all in #blog-fp, they stack natively!
        // To simulate stacking sticky: each one sticks to top=0.
    });

    simulateSticky(circleSection, circleSticky);

    requestAnimationFrame(animate)
}

// Blog post sticky simulation needs custom logic because multiple items stick sequentially
function simulateBlogSticky() {
    if(!blogSection) return;
    let blogBounds = blogSection.getBoundingClientRect();
    let blogTop = blogBounds.top;
    
    // blog__hero is first
    let translateY = blogTop < 0 ? -blogTop : 0;
    
    const elements = [blogHero, ...document.querySelectorAll('.blog__post')];
    
    elements.forEach((el, index) => {
        if(!el) return;
        // Each element occupies 100vh of space logically in the container?
        // In the original, they are inside `#blog` which is 400% height.
        // There are 1 hero + 3 posts = 4 elements.
        // Each takes 100vh, total 400vh.
        
        let elStartScroll = index * window.innerHeight; // When this element should hit the top
        let elMaxScroll = blogBounds.height - window.innerHeight; // Max scroll for the section
        
        let elTranslateY = 0;
        let distanceIntoSection = -blogTop;
        
        if (distanceIntoSection > elStartScroll) {
            elTranslateY = distanceIntoSection - elStartScroll;
            // Cap at the bottom of the section
            let maxElTranslate = elMaxScroll - elStartScroll;
            if (elTranslateY > maxElTranslate) elTranslateY = maxElTranslate;
        }
        
        el.style.transform = `translate3d(0, ${elTranslateY}px, 0)`;
    });
}


function animateLoop(){
    animateVideo();
    animateProjects();
    scrollBlogPosts();
    scrollCircle();
    scrollDiscover();
    
    simulateSticky(videoSection, videoSticky);
    simulateSticky(projectsSection, projectsSticky);
    simulateSticky(circleSection, circleSticky);
    simulateBlogSticky();

    requestAnimationFrame(animateLoop)
}

animateLoop()

const footerSpans = document.querySelectorAll('#footer-fp .footer__div span');
footerSpans.forEach(span => {
  const speed = parseFloat(span.getAttribute('data-speed')) || 0;
  gsap.fromTo(span, { y: 0 }, {
    y: (1 - speed) * -100, 
    ease: 'none',
    scrollTrigger: {
      trigger: '#footer-fp',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 1.9
    }
  });
});
