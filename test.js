const cars3 = [{ mobil: 2, motor: 'N-MAX' }, { mobil: 2, motor: 'N-MAX' }]
    //Array Entries : return key and value array into 
let a = cars3.map(e => e.mobil)
console.log(a.reduce((i, v) => i + v))