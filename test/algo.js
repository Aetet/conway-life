var should = require('chai').should();
var obj = require('../client/js/algo');
var findNeighbor = obj.findNeighbor;
var findEmptyNeighbor = obj.findEmptyNeighbor;
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

var testBig = {
	live: {
		'1.8446744e+19:1.844674e+19': true,
		'1.8446742e+19:1.844674e+19': true,
		'1.8446741e+19:1.844674e+19': true,
		'1.8446748e+19:1.844674e+19': true,
		'1844674399999999998:1844674000000000001': true,
		'1844674399999999998:1844674000000000001': true,
		'1844674399999999998:1844674000000000001': true,
		'1844674399999999997:1844674000000000001': true,
		'1844674399999999996:1844674000000000000': true
	},
	empty: {

	}
}


describe('Algo', function () {
	describe('#findNeighbor', function () {
		it('right', function () {
			var res = findNeighbor([3,4])
			.should.be.deep.eql(
				[ [ "2", "3" ],
				[ "2", "4" ],
				[ "2", "5" ],
				[ "3", "3" ],
				[ "3", "5" ],
				[ "4", "3" ],
				[ "4", "4" ],
				[ "4", "5" ] ]);
		});
		it('testBig', function () {
			var res = findNeighbor(['1.8446744e+19', '1.844674e+19'])
			.should.be.deep.eql([ [ '1844674399999999999', '1844673999999999999' ],
				[ '1844674399999999999', '1844674000000000000' ],
				[ '1844674399999999999', '1844674000000000001' ],
				[ '1844674400000000000', '1844673999999999999' ],
				[ '1844674400000000000', '1844674000000000001' ],
				[ '1844674400000000001', '1844673999999999999' ],
				[ '1844674400000000001', '1844674000000000000' ],
				[ '1844674400000000001', '1844674000000000001' ] ])
		});
	});
	describe('_findEmptyNeubor', function () {
		it('right', function () {
			var res = findEmptyNeighbor([3,4], input, {live: {'3:4':true}});
			should.equal(findEmptyNeighbor([3,4], input, {live: {'3:4':true}}), null);


			findEmptyNeighbor([3,4], input, {live: {}})
			.should.be.deep.eql([3,4])

			findEmptyNeighbor([5,4], input, {live: {}})
			.should.be.deep.eql([5,4])


			should.equal(findEmptyNeighbor([2,4], input, {live: {}}), null);
			
		});
	});
	
	describe('#calculate', function () {
		it('right', function () {
			calculate(input)
			.should.be.eql(output);
			calculate(output)
			.should.be.eql(output2);
		});
		it('testBig', function () {
			var res = calculate(testBig)
			.should.be.deep.eql({ live: {
				'1844674399999999997:1844674000000000000': true,
				'1844674399999999997:1844674000000000001': true
			},
			empty: {
				'1.8446744e+19:1.844674e+19': true,
				'1.8446742e+19:1.844674e+19': true,
				'1.8446741e+19:1.844674e+19': true,
				'1.8446748e+19:1.844674e+19': true,
				'1844674399999999998:1844674000000000001': true,
				'1844674399999999996:1844674000000000000': true
			}
		});
		});
	});

});
