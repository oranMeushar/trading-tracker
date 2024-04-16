export const formatNumber = (number) => {
    const suffixes = ["", "K", "M"]
    const threshold = 10000;
    let suffixNum = 0;
    while (number >= threshold) {
        suffixNum++;
        number /= 1000;
    }
    return number.toFixed(1).toLocaleString() + suffixes[suffixNum];
}