module.exports = (string) => {
    const regex = /.*Hotend:\s*(\d+\.\d).*(\d+\.\d)/g
    const result = regex.exec(string);

    return result ? 
    {
        hotendTemp: {
            nowTemp: result[1],
            setTemp: result[2],
        }
    } : undefined
}
