import React from 'react'

import Section from './Section/Section'
import Menu from './Menu'

import './Container.css'

const Container = () => {
    return (
        <div className="container">
            <Menu />
            <Section />
        </div>
    )
}

export default Container
