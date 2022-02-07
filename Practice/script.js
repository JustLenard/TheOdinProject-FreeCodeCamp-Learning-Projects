// classes
class voice {
	constructor(animal, voice) {
		this.animal = animal;
		this.voice = voice;
	}

	dosomething() {
		console.log(`${this.animal} says ${this.voice}`);
	}
}

const cat = new voice('cat', 'meow');

cat.dosomething();

// Function declaration
function s() {
	//do somthing
}

// Fucntion expression
const b = () => {
	//do something
};

// function without return by default return undefined
function l() {
	console.log('hi');
}

const c = l();
console.log(c);
