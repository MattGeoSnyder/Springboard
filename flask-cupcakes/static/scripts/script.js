let form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    let data = {
        flavor: form.flavor.value,
        rating: form.rating.value,
        size: form.size.value,
        image: form.image.value
    };
    let res = await axios.post('/api/cupcakes', data=data);
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    let link = document.createElement('a');
    link.innerText = `${data.size} ${data.flavor} ${data.rating}`;
    li.appendChild(link);
    ul.appendChild(li);
    
    let inputs = document.querySelectorAll('input');
    for (let input of inputs ) {
        input.value = '';
    }
});


let list = document.querySelector('ul');
window.addEventListener('DOMContentLoaded', async function(e) {
    let res = await axios.get('/api/cupcakes');
    console.log(res);
    for ( let cupcake of res.data.cupcakes ) {
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.innerText = `${cupcake['size']} ${cupcake['flavor']} ${cupcake['rating']}`;
        li.appendChild(link);
        list.appendChild(li);
    }

});

