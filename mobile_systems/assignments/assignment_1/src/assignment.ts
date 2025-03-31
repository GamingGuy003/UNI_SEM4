import { users, User, Name, Location } from './users'

// checks if a password is weak
function isWeak(passwd: string): boolean {
  return passwd === passwd.toLowerCase() && passwd.length < 8
}

// checks if a password is strong
function isStrong(passwd: string): boolean {
  if (passwd.length > 30) return true
  if (passwd.length > 15 && passwd !== passwd.toLowerCase()) return true
  if (passwd.length > 10 && /[A-Z]/.test(passwd) && /[a-z]/.test(passwd) && /[0-9]/.test(passwd)) return true
  return false
}

// returns users with weak passwords
function getWeak(): Name[] {
  return users
    .filter((user: User) => isWeak(user.login.password))
    .map((user: User) => user.name)
}

// returns users with strong passwords
function getStrong(): Name[] {
  return users
    .filter((user: User) => isStrong(user.login.password))
    .map((user: User) => user.name)
}

// returns an object containing the count of weak, medium and strong passwords
function analyzeUsers(): {"weak": number, "medium": number, "strong": number} {
  let weak = getWeak().length
  let strong = getStrong().length
  return {
    "weak": weak,
    "medium": users.length - (weak + strong),
    "strong": strong
  }
}

// returns an array of users where weak passwords have been modified to read 'changeme'
function resetWeak() {
  return users
    .map(user => {
      if (isWeak(user.login.password))
        // does not modify the actual array since no write access
        user.login.password = "changeme"
    })
}

// sorts users by ascending age
function sortByAge(): User[] {
  return users
    .sort((a: User, b: User) => a.birthdate.age - b.birthdate.age)
}

// coutns all nationalities present in the dataset
function countNationalities(): number {
  let nationalities: string[] = []
  for (const user of users) {
    if (!nationalities.some(elem => elem === user.nationality))
      nationalities.push(user.nationality)
  }
  return nationalities.length
}

// returns all users whose email is not registered at example.com
function notExampleDomain(): User[] {
  return users.filter(user => !user.email.endsWith('@example.com'))
}

// returns the most common mail domain besides example.com
function mostCommonEmail(): string {
  let domains: { 'domain': string, 'count': number }[] = []
  for (const user of notExampleDomain()) {
    // get only domain part of email
    let userDomain = user.email.split('@')[1]
    // either increment domain count or add new one if not found yet
    let domain = domains.find(domain => domain.domain === userDomain)
    if (domain) {
      domain.count++
    } else {
      domains.push({ 'domain': userDomain, 'count': 1 })
    }
  }
  return domains.sort((a, b) => b.count - a.count)[0].domain
}

// returns all locations of german users
function germanLocation(): Location[] {
  return users
    .filter(user => user.location.country === 'Germany')
    .map(user => user.location)
}

// returns all users whose postcode is not defined as a number
function postcodeNAN(): User[] {
  return users
    .filter(user => typeof(user.location.postcode) === 'string')
}

// returns all users whose email does not contain their first / last name
function arbitraryEmail(): User[] {
  return users
    .filter(user => !user.email.toLowerCase().includes(user.name.first.toLowerCase()))
    .filter(user => !user.email.toLowerCase().includes(user.name.last.toLowerCase()))
}

// returns all users whose id is invalid
function invalidID(): User[] {
  return users
    .filter(user => user.id.value === null || !user.id.name)
}
