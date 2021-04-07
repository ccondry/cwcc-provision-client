const Client = require('../src')
const config = require('./config')
const client = new Client(config)

let listCache = null
let newLayoutId = null
let getCache = null

describe('client.desktopLayout.list()', function () {
  it('should list desktop layouts', function (done) {
    client.desktopLayout.list()
    .then(response => {
      const data = response.auxiliaryDataList.map(v => {
        return {
          id: v.id,
          name: v.attributes.name__s,
          teamIds: v.attributes.teamIds__sa,
          jsonFileName: v.attributes.jsonFileName__s
        }
      })
      // console.log(data)
      // store list in listCache
      listCache = response.auxiliaryDataList
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.desktopLayout.create()', function () {
  it('should create desktop layout', function (done) {
    // modify one from listCache
    const layout = listCache.find(v => v.attributes.name__s === 'Provision_Template')
    // delete layout.id
    // delete layout.auxiliaryDataType
    // delete layout.attributes._lmts__l
    // delete layout.attributes.cstts
    // delete layout.attributes.modifiedTime__l
    // delete layout.attributes.defaultJsonModifiedTime__l
    // delete layout.attributes.tid
    // delete layout.attributes.sid
    // delete layout.attributes.validatedTime__l
    // delete layout.attributes.teamIds__sa
    // delete layout.attributes.editedBy__s

    // layout.attributes.jsonFileName__s = 'mocha_test.json'
    // layout.attributes.name__s = 'mocha_test'
    // // console.log('creating layout', layout)
    // client.desktopLayout.create([layout])

    delete layout.id
    delete layout.attributes._lmts__l
    delete layout.attributes.cstts
    delete layout.attributes.modifiedTime__l
    delete layout.attributes.defaultJsonModifiedTime__l
    delete layout.attributes.tid
    delete layout.attributes.sid
    delete layout.attributes.validatedTime__l
    delete layout.attributes.editedBy__s
    
    layout.attributes.teamIds__sa = []
    layout.attributes.name__s = 'mocha_test'
    layout.attributes.jsonFileName__s = 'mocha_test.json'
    layout.attributes.description__s = 'mocha test'
    
    // set layout JSON
    // layout.attributes.jsonFileContent__s = JSON.stringify(layoutJson)

    // console.log('creating layout', layout)
    // create
    client.desktopLayout.create([layout])
    .then(response => {
      newLayoutId = response[0].links[0].href.split('/').pop()
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.desktopLayout.get()', function () {
  it('should get new desktop layout', function (done) {
    client.desktopLayout.get(newLayoutId)
    .then(response => {
      // console.log(response)
      getCache = response
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.desktopLayout.modify()', function () {
  it('should modify new desktop layout', function (done) {
    // remove invalid parameters
    delete getCache.attributes.cstts
    delete getCache.attributes.tid
    // update name
    getCache.attributes.name__s = 'mocha rename test'
    // update on server
    // console.log('getCache', getCache)
    client.desktopLayout.modify(getCache.id, [getCache])
    .then(response => {
      // console.log(response)
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

describe('client.desktopLayout.delete()', function () {
  it('should delete new desktop layout', function (done) {
    client.desktopLayout.delete(newLayoutId)
    .then(response => {
      // console.log(response)
      done()
    })
    .catch(e => {
      done(e)
    })
  })
})

