const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click',(event)=>{
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete(); 
    })
}

// //getting data
// db.collection('cafes').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         //console.log(doc.data());
//         renderCafe(doc);
//     });
    
// })

//saving data
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value,
    });
    form.name.value = '';
    form.city.value = '';
})

//real time listner
db.collection('cafes').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    // console.log(changes);
    changes.forEach(change => {
        // console.log(change.doc.data());
        if (change.type == 'added') {
            renderCafe(change.doc);
        } else if (change.type == 'removed') {
            let li = document.querySelector('[data-id='+change.doc.id+']');
            cafeList.removeChild(li);
        }
    });


    
})