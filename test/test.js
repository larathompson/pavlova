function calculate_age(dob) { 
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

console.log(calculate_age(new Date(1982, 11, 4)));

console.log(calculate_age(new Date(1994, 01, 18)));


function filterByValue(array, string) {
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
}

const arrayOfObject = [{ name: 'Paul', gender: 'male', }, { name: 'Lea', gender: 'female', }, { name: 'John', country: 'male' }];

console.log(filterByValue(arrayOfObject, 'female')); // [{name: 'Lea', country: 'Italy'}]
console.log(filterByValue(arrayOfObject, 'male')); // [{name: 'Lea', country: 'Italy'}, {name: 'John', country: 'Italy'}]