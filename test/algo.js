var should = require('chai').should();
var obj = require('../client/js/algo/index');
var findNeubor = obj.findNeubor;
var findEmptyNeubor = obj.findEmptyNeubor;
var calculate = obj.calculate;
var output = {
	live: {
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
	},
	empty: {
		"3:7": true,
		"5:7": true
	}
};

var input = {
	live: {
		'3:5': true,
		'4:5': true,
		'3:7': true,
		'4:4': true,
		'4:8': true,
		'5:5': true,
		'5:7': true
	},
	empty: {

	}
};

output2 = {
	live: {
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
	},
	empty: {
		"3:5": true,
		"4:4": true,
		"4:5": true,
		"4:8": true,
		"5:5": true
	}
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
			var res = findEmptyNeubor([3,4], input, {live: {'3:4':true}});
			should.equal(findEmptyNeubor([3,4], input, {live: {'3:4':true}}), null);


			findEmptyNeubor([3,4], input, {live: {}})
			.should.be.deep.eql([3,4])

			findEmptyNeubor([5,4], input, {live: {}})
			.should.be.deep.eql([5,4])


			should.equal(findEmptyNeubor([2,4], input, {live: {}}), null);
			
		});
	});
	
	describe('#calculate', function () {
		it('right', function () {
			calculate(input)
			.should.be.eql(output);
			calculate(output)
			.should.be.eql(output2);
		});
	});

});
