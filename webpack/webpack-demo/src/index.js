Object.assign({}, {demo: 1});

const [a, b] = ['Hello', 'webpack'];

var element = document.createElement('div');
element.innerHTML = `${a} ${b}`;

document.body.appendChild(element);
