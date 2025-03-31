import { users, Name, User } from "./users"

function isWeak(passwd: string): boolean {
  return passwd === passwd.toLowerCase() && passwd.length < 8
}

function isStrong(passwd: string): boolean {
  if (passwd.length > 30) return true
  if (passwd.length > 15 && passwd !== passwd.toLowerCase()) return true
  if (passwd.length > 10 && /[A-Z]/.test(passwd) && /[a-z]/.test(passwd) && /[0-9]/.test(passwd)) return true
  return false
}

function getWeak(): Name[] {
  return users
    .filter((user: User) => isWeak(user.login.password))
    .map((user: User) => user.name)
}

function getStrong(): Name[] {
  return users
    .filter((user: User) => isStrong(user.login.password))
    .map((user: User) => user.name)
}

function analyzeUsers(): {"weak": number, "medium": number, "strong": number} {
  let weak = getWeak().length
  let strong = getStrong().length
  return {
    "weak": weak,
    "medium": users.length - (weak + strong),
    "strong": strong
  }
}

function resetWeak() {
  let weak: Name[] = getWeak();
  for (const user of users) {
    if (weak.some((weak: Name) => weak === user.name))
      // does not modify the actual array since no write access
      user.login.password = "changeme"
  }
}

function sortByAge(): User[] {
  return users
    .sort((a: User, b: User) => a.birthdate.age - b.birthdate.age)
}

function countNationalities(): number {
  let nationalities: string[] = []
  for (const user of users) {
    if (!nationalities.some(elem => elem === user.nationality))
      nationalities.push(user.nationality)
  }
  return nationalities.length
}

function notExampleDomain(): User[] {
  return users.filter(user => !/@example\.com$/.test(user.email))
}

function mostCommanEmail(): {'domain': string, 'count': number } {
  let domains: { 'domain': string, 'count': number }[] = []
  for (const user of notExampleDomain()) {
    // get only domain part of email
    let userDomain = user.email.split('@')[1]
    // either increment domain count or add new one if not found yet
    if (domains.some(domain => domain.domain === userDomain)) {
      let domain = domains.find(domain => domain.domain === userDomain)
      if (domain)
        domain.count++
    } else {
      domains.push({ 'domain': userDomain, 'count': 1 })
    }
  }
  return domains.sort((a, b) => a.count - b.count)[0]
}

console.log(mostCommanEmail());
