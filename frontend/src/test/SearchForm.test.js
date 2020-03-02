import React from 'react';
import renderer from 'react-test-renderer';
import SearchForm from '../components/SearchForm';

test('renders correctly', () => {
    const tree = renderer
    .create(<SearchForm></SearchForm>)
    .toJSON();
    expect(tree).toMatchSnapshot();
})