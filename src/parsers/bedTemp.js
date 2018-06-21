module.exports = (string) => {
    console.log('Matching ', string);
    regex = /Bed:\s*(\d+\.\d)..(\d+\.\d)/g
    return regex.exec(string) || undefined;
}