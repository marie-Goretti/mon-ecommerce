describe('Validation produit', () => {
  it('rejette un prix négatif', () => {
    const isValidPrice = (p) => p >= 0;
    expect(isValidPrice(-5)).toBe(false);
    expect(isValidPrice(10)).toBe(true);
  });

  it('rejette un nom vide', () => {
    const isValidName = (n) => n && n.trim().length > 0;
    expect(isValidName('')).toBeFalsy();
    expect(isValidName('T-shirt')).toBeTruthy();
  });
});