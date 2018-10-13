let percent = function(portion, total){
  return Math.round(portion / total * 100);
}

let percentOfPlayerWins = function(wins, losses){
  let total = wins + losses;
  let winPercent = percent(wins, total); // returns number, NaN or Infinity/-Infinity
  return total > 0 && !!winPercent && isFinite(winPercent) ? winPercent + '%' : '-'; // Ensures we have a sensible result
}

const daysSince = (timestamp) => Math.floor((Date.now() - timestamp) / 1000 / 60 / 60 / 24);

const getInitials = name => {
  if (name && name.length > 0) {
    let names = name.split(' ');
    if (names.length > 4) {
      names = names.slice(0, 4);  
    }

    return names.reduce((initials, name) => `${initials}${name.charAt(0)}`, '');
  }
}

module.exports = {
  percentOfPlayerWins,
  daysSince,
  getInitials,
};
