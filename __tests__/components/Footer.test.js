import React from 'react';
import { render } from 'react-testing-library';
import Footer from '../../src/components/presentation/Footer';

describe('Test for footer component', () => {
  const { container } = render(<Footer />);
  it('Should contain a particular div block', () => {
    expect(container).toMatchSnapshot();
  });
});
