module.exports = (string) => {
    console.log('Matching ', string);
    string.replace(/[^a-zA-Z0-9\.]/g, "")
    regex = /Hotend:\s*(\d+\.\d).*(\d+\.\d)/g
    result = regex.exec(string);

    if (result) {
        return {
            nowTemp: result[1],
            setTemp: result[2],
        }
    }

    return undefined;
}