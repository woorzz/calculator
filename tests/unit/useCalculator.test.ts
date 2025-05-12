import { describe, it, expect } from 'vitest';

function add(a: number, b: number): number {
    return a + b
}
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