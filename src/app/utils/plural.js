export function plural(single, plural, plural2, count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return single;
    } else if (
        count % 10 >= 2 &&
        count % 10 <= 4 &&
        (count % 100 < 10 || count % 100 >= 20)
    ) {
        return plural;
    } else {
        return plural2;
    }
}
