/**
 * Composes a random digit string with length = `digits`.
 * @function makeRandom
 * @param {number} digits The length of the string to return
 * @return {string} A randomly generated numeric string
 */
function makeRandom(digits) {
	s = ''
	for (let i=0; i < digits; i++) {
		s += ~~(Math.random() * 10)
	}
	return s
}