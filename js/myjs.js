$(".mascot" || '#bubble')
  .mouseenter(function() {
    setTimeout(function() {
      $('#bubble').fadeIn(300);

    }, 200);
    console.log('mouse enter !');

  })
  .mouseleave(function() {
    setTimeout(function() {
      $('#bubble').fadeOut(300);
    }, 200);
    console.log('mouse leave !');
  });

//modal =============================================================
$('body').on('hidden.bs.modal', '.modal', function () {
$('#video1').trigger('pause');
$('#video2').trigger('pause');
$('#video3').trigger('pause');
$('#video4').trigger('pause');
});
//footer ============================================================
var comptFoot = 0;

$('.footer').on('click', function() {
  if (comptFoot == 0) {
    $('.thanks').css('bottom', '2vh');
    $('.footer .fa').css('transform', 'rotate(180deg)');
    comptFoot = 1;
  } else {
    $('.thanks').css('bottom', '-60vh');
    $('.footer .fa').css('transform', 'rotate(0deg)');
    comptFoot = 0;
  }
})

$('.moins').on('click', function() {
  $('.thanks').css('bottom', '-60vh');
  $('.footer .fa').css('transform', 'rotate(0deg)');
  comptFoot = 0;
})


// SESSION============================================
// defilement====


moment.locale('fr');
var time = document.getElementsByClassName('sessionTime');
var sessions = document.getElementsByClassName('session');
var rooms = document.getElementsByClassName('room');
var languages = document.getElementsByClassName('language');
var nextSession = [];
var fxtime=[];

for (var i = 0; i < time.length; i++) {
  fxtime.push(time[i].dateTime)
}
console.log(fxtime);

function ObjSession(date, hour, room, lang, full) {
  this.date = date;
  this.hour = hour;
  this.room = room;
  this.lang = lang;
  this.full = full;
};

function Mimy(date, heure) {
  this.date = date;
  this.heure = heure;
};

function setime(xdate) {
  var dd = xdate.substr(0, 2);
  var mm = xdate.substr(3, 2);
  var yy = xdate.substr(6, 4);
  var hhstart = xdate.substr(11, 2);
  var minstart = xdate.substr(14, 2);
  var hhend = xdate.substr(17, 2);
  var minend = xdate.substr(20, 2);
  var datemimy = moment(dd, 'DD').format('D') + ' ' + moment(mm, 'MM').format('MMM');
  var heuremimy = minstart === '30' ? hhstart + 'h' + minstart + '-' + hhend + 'h' + minend : hhstart + 'h-' + hhend + 'h';
  var formatmimy = datemimy + ' ' + heuremimy;
  var fulldate = yy + '-' + mm + '-' + dd + 'T' + hhstart + ':' + minstart;
  return {
    formatmimy: formatmimy,
    datemimy: datemimy,
    heuremimy: heuremimy,
    fulldate: fulldate
  };

};


function fdate() {
  var jmy = document.getElementsByClassName('jmimy');
  var hmy = document.getElementsByClassName('hmimy');
  var fmimy = [];
  var dateSessions = [];
  for (var i = 0; i < time.length; i++) {
    fmimy[i] = new Mimy(setime(fxtime[i]).datemimy, setime(fxtime[i]).heuremimy);
    dateSessions.push(setime(fxtime[i]).formatmimy);
    jmy[i].innerHTML = fmimy[i].date;
    hmy[i].innerHTML = fmimy[i].heure;
  };
};

function tabsession() {
  nextSession = [];
  var sess = [];
  for (var i = 0; i < time.length; i++) {
    sess[i] = new ObjSession(setime(fxtime[i]).datemimy, setime(fxtime[i]).heuremimy, rooms[i].innerHTML, languages[i].innerHTML, setime(fxtime[i]).fulldate);
    if (moment().isSameOrBefore(moment(sess[i].full).format(), 'minute') && nextSession.length < 2) {
      nextSession.push(sess[i]);
    };
  };
  return nextSession
};


function next(nxt) {
  var nextdate = document.getElementsByClassName('nextdate');
  var nexthour = document.getElementsByClassName('nexthour');
  var nextroom = document.getElementsByClassName('nextroom');
  var nextlanguage = document.getElementsByClassName('nextlanguage');
  for (var i = 0; i < nxt.length; i++) {
    nextdate[i].innerHTML = nxt[i].date;
    nexthour[i].innerHTML = nxt[i].hour;
    nextroom[i].innerHTML = nxt[i].room;
    nextlanguage[i].innerHTML = nxt[i].lang;
  };
};

fdate();
document.getElementById('nxtsess').onmouseenter = function() {
  tabsession(),next(nextSession);
};
