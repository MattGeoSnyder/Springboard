const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });
  test('midnight', () => {
    expect(timeWord('00:00')).toBe('midnight');
  });
  test('twelve twelve', () => {
    expect(timeWord('00:12')).toBe('twelve twelve am');
  });
  test('one o clock', () => {
    expect(timeWord('01:00')).toBe("one o'clock am");
  });
  test('six o one', () => {
    expect(timeWord('06:01')).toBe('six oh one am');
  })
  test('six ten', () => {
    expect(timeWord('06:10')).toBe('six ten am');
  });
  test('six thirty', () => {
    expect(timeWord('06:30')).toBe('six thirty am');
  });
  test('ten thirty four', () => {
    expect(timeWord('10:34')).toBe('ten thirty four am');
  });
  test('noon', () => {
    expect(timeWord('12:00')).toBe('noon');
  });
  test('twelve nine', () => {
    expect(timeWord('12:09')).toBe('twelve oh nine pm');
  });
  test('eleven twenty three', () => {
    expect(timeWord('23:23')).toBe('eleven twenty three pm');
  })
});