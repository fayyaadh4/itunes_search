import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import SearchForm from '../components/SearchForm';

export default function Home() {
    return (
        <div>
            <Header></Header>
            <Menu></Menu>
            <SearchForm></SearchForm>
        </div>
    )
}
