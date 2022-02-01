const axios = require('axios')

const host = 'http://localhost:3000'

it('generate new service repo', async()=>{
    const results = []
    const tt = await axios.get(`${host}/test`)
    expect(tt.data).toEqual(true)
})


it('test generating ', async()=>{
    const results = []
    const tt = await axios.get('http://localhost:3000/test/func')
    expect(tt.data).toEqual(true)
})

