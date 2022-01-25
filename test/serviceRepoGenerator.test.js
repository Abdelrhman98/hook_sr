const axios = require('axios')

it('get latest version', async()=>{
    const tt = await axios.get('http://localhost:3000/test/func')
    expect(tt.data).toEqual(true)
})

