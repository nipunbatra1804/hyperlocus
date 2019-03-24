module.exports = {
  createUser (input) {
    console.log(`Add user ${input.username} with password ${input.password}`)
    return Promise.resolve()
  }
}