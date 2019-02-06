import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'react-testing-library';
import NotFound from '../../src/components/NotFound';

const history = createMemoryHistory({ initialEntries: [''] });

describe('Test for 404 component', () => {
  const ui = (
    <Router history={history}>
      <NotFound />
    </Router>
  );
  const { container } = render(ui);
  it('Should contain 1 h1 element', () => {
    const header = container.querySelector('h1');
    expect(header).toBeInTheDocument();
  });
});
