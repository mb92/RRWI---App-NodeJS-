module.exports = (string) => {
    const regex = /^.*Bed:\s*(\d+\.\d).*(\d+\.\d).*$/gm
    const result = regex.exec(string);

    return result ? 
    {
        bedTemp: {
            nowTemp: result[1],
            setTemp: result[2],
        }
    } : undefined
}
