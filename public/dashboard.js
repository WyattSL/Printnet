function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function get() {
    const url = '?'+window.location.href.split('?')[1];
    const guild = getParam('server');
    const token = getParam('token');
    if (!guild || !token) window.location = '/login';
    return {guild:guild,token:token};
};

async function fetchGuild() {
  var token = get().token
  let guilds = await fetch(`https://discordapp.com/api/users/@me/guilds`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }, 
  });
  guilds = await guilds.json();
  const guild = guilds.filter(g => g.id == get().guild)[0];
  if (!guild) window.location = '/login';
  return guild;
};

async function checkOwner() {
  const guild = await fetchGuild(); //returns [object promise]
  const {owner} = guild; //returns undefined
  const {name} = guild; //returns undefined
  if (!owner) {
    window.location = `/401/?name=${name}`;
    return false;
  };
  return true;
};
/*
async function Authorize(token, serverid) {
  let guilds = await fetch(`https://discordapp.com/api/guilds${serverid}`,
  {
    method: "GET",
    headers: {
      Authorization: `Bot ${BotToken}`,
    }
  });
  guilds = await guilds.json();
  var ownerid = guilds.owner_id
  var guildname = guilds.name
  let user = await fetch(`https://discordapp.com/api/users/@me`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  user = await user.json();
  let userid = user.id
  if (userid ==! ownerid) {
    window.location.href=`https://printnet.glitch.me/401`
  }
};
*/

function Save(serverid) {
  //Get Input Boxes
  var Prefix = document.getElementById('Prefix').Text
  var Nickname = document.getElementById('Nickname').Text
  var Autorole = document.getElementById('Autorole').Text
  var Emotes = document.getElementById('Emote').innerHTML
  
  //Change URL
  window.location(`/save/?server=${serverid}&Prefix=${Prefix}&Nickname=${Nickname}&Autorole=${Autorole}&Emotes=${Emotes}`)
}

function EmoteOn() {
  document.getElementById('Emote').innerHTML = "ON"
}

function EmoteOff() {
  document.getElementById('Emote').innerHTML = "OFF"
}


(async()=>{
checkOwner();
document.getElementById('guild').innerHTML = `Configure ${(await fetchGuild()).name}`;
})()