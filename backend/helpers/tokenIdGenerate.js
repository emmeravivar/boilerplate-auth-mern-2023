const tokenIdGenerate = () => {

    const random = Math.random().toString(32).substring(2)
    const date = Date.now().toString()

    return  random + date

}

export default tokenIdGenerate