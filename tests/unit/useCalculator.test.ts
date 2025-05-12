import { describe, it, expect } from 'vitest';
import { add, subtract, multiply,divide} from '~/composables/useCalculator';


describe('add', () => {
    it('should return the sum of two positive numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    it('should return the sum of a positive and a negative number', () => {
        expect(add(5, -3)).toBe(2);
    });

    it('should return the sum of two negative numbers', () => {
        expect(add(-2, -3)).toBe(-5);
    });

    it('should return 0 when adding 0 and 0', () => {
        expect(add(0, 0)).toBe(0);
    });
});

describe('subtract', () => {
    it('should return the difference of two positive numbers', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    it('should return the difference of a positive and a negative number', () => {
        expect(subtract(5, -3)).toBe(8);
    });

    it('should return the difference of two negative numbers', () => {
        expect(subtract(-5, -3)).toBe(-2);
    });

    it('should return 0 when subtracting a number from itself', () => {
        expect(subtract(5, 5)).toBe(0);
    });
}); 

describe('multiply', () => {
    it('should return the product of two positive numbers', () => {
        expect(multiply(2, 3)).toBe(6);
    });

    it('should return the product of a positive and a negative number', () => {
        expect(multiply(5, -3)).toBe(-15);
    });

    it('should return the product of two negative numbers', () => {
        expect(multiply(-2, -3)).toBe(6);
    });

    it('should return 0 when multiplying by 0', () => {
        expect(multiply(5, 0)).toBe(0);
    });
}); 

describe('divide', () => {
    it('should return the quotient of two positive numbers', () => {
        expect(divide(6, 3)).toBe(2);
    });

    it('should return the quotient of a positive and a negative number', () => {
        expect(divide(5, -5)).toBe(-1);
    });

    it('should return the quotient of two negative numbers', () => {
        expect(divide(-6, -3)).toBe(2);
    });

    it('should throw an error when dividing by 0', () => {
        expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
    });
});