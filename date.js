function dates(params) {
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var thisDay = date.getDay(),
        thisDay = myDays[thisDay];
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;
    return `${thisDay}, ${day} ${months[month]} ${year}`
}
dates();

function time() {
    date = new Date();
    detik = date.getSeconds();
    menit = date.getMinutes();
    jam = date.getHours();
    return `${jam}:${menit}:${detik}`
}
time()

function codes() {
    const char = "123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let code = '';
    for (let i = 0; i < 7; i++) {
        let hasil = Math.floor(Math.random() * char.length);
        code += char.substring(hasil, hasil + 1);
    }
    return code
}
codes()
console.log(codes())
module.exports = { dates };