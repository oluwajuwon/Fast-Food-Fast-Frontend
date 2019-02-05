/* eslint-disable import/no-extraneous-dependencies */
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
