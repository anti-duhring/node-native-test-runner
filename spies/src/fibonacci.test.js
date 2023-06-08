const Fibonacci = require('./fibonacci')
const assert = require('assert')

const sinon = require('sinon').createSandbox()

void async function() {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        for(const seq of fibonacci.execute(3)) {}
        const expectedCallCount = 4
        assert.strictEqual(spy.callCount, expectedCallCount)

        const { args } = spy.getCall(2)
        const expectedParams = [1, 1, 2]

        assert.deepStrictEqual(args, expectedParams, 'arrays are not equal')

    }

    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        const results = [...fibonacci.execute(5)]
        const expectedCallCount = 6
        assert.strictEqual(spy.callCount, expectedCallCount)

        const expectedResults = [ 0, 1, 1, 2, 3 ]
        assert.deepStrictEqual(results, expectedResults, 'arrays are not equal')
    }
    
}()