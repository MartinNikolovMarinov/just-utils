// Pipe library :
const filterPipe = (...fns) => {
  return (value) => fns.reduce((currentValue, currentFunction) => {
    if (!currentValue) return null;
    return currentFunction(currentValue);
  }, value)
}

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

// User Data
const user = {
  name: 'Paco',
  services: [{ price: 100 }],
  languages: ['English', 'French'],
}

// Filters :
const userNameFilter = (name) => {
  return (user) => {
    if (user.name.toLowerCase().indexOf(name) >= 0) return user
    return null;
  }
}

const priceFilter = (min, max) => {
  return (user) => {
    const resultServices = user.services.filter(s => min <= s.price && s.price <= max);
    if (!resultServices || resultServices.length === 0) return null;
    user.services = resultServices;
    return user;
  }
}

const languageFilter = (languages) => {
  return (user) => {
    const langs = user.languages.filter(l => languages.indexOf(l) >= 0);
    if (!langs || langs.length === 0) return null;
    return user;
  }
}

// Input From FE Code :
const formInput = {
  name: 'p',
  price: { min: 1, max: 105 },
  languages: ['English', 'Spanish'],
}

// Handling input and applying filters :
const userDto = deepCopy(user);
const endRes = filterPipe(
  userNameFilter(formInput.name),
  priceFilter(formInput.price.min, formInput.price.max),
  languageFilter(formInput.languages)
)(userDto);

console.log(endRes);
debugger;
