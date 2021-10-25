const container = document.querySelector('.video-container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'I am the div';
content.style.cssText = 'color: blue; background-color: pink; border: 1px solid black';

const content1 = document.createElement('h1')
content1.textContent = 'I am in a div'

const content2 = document.createElement('p')
content2.textContent = 'Me too'

content.appendChild(content1)
content.appendChild(content2)

container.appendChild(content);

const btn = document.querySelector('#btn')
btn.addEventListener('click', function (e)  {
    e.target.style.background = 'blue';
})