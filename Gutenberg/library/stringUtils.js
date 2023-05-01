function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}

function getFormattedDate(inputDate) {
  return inputDate.split(' ')[0];
}


export { titleCase, getFormattedDate};
