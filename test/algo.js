var should = require('chai').should();
var obj = require('../client/js/algo/index');
var findNeubor = obj.findNeubor;
var findEmptyNeubor = obj.findEmptyNeubor;
var calculate = obj.calculate;
var output = {
	'3:4': true,
	'4:4': true,
	'5:4': true,
	'3:5': true,
	'4:5': true,
	'5:5': true,
	'3:6': true,
	'5:6': true,
	'4:7': true,
	'4:8': true
};

var input = {
	'3:5': true,
	'4:5': true,
	'3:7': true,
	'4:4': true,
	'4:8': true,
	'5:5': true,
	'5:7': true
};

output2 = {
	'4:3': true,
	'3:4': true,
	'5:4': true,
	'2:5': true,
	'6:5': true,
	'3:6': true,
	'5:6': true,
	'3:7': true,
	'4:7': true,
	'5:7': true
};


describe('Algo', function () {
	describe('#_findNeubor', function () {
		it('right', function () {
			var res = findNeubor([3,4])
			.should.be.deep.eql(
			[ [ 2, 3 ],
		  [ 2, 4 ],
		  [ 2, 5 ],
		  [ 3, 3 ],
		  [ 3, 5 ],
		  [ 4, 3 ],
		  [ 4, 4 ],
		  [ 4, 5 ] ]);
		});
	});
	describe('_findEmptyNeubor', function () {
		it('right', function () {
			should.equal(findEmptyNeubor([3,4], input, {'3:4':true}), null);

			findEmptyNeubor([3,4], input, {})
			.should.be.deep.eql([3,4])

			findEmptyNeubor([5,4], input, {})
			.should.be.deep.eql([5,4])


			should.equal(findEmptyNeubor([2,4], input, {}), null);
		});
	});
	describe('#calculate', function () {
		it('right', function () {
			calculate(input)
				.should.be.eql(output);
			calculate(output)
				.should.be.eql(output2);
			// obj.calculate()
			// var res = obj.calculate();
			// console.log('res:', res);
		});
	});
});
