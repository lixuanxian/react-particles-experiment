
import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

import Particles from './Particles';
import Footer from './Footer';
import Header from './Header';

class App extends Component {
    componentDidMount() {
        let svg = d3.select(this.refs.svg);

        svg.on('mousedown', () => {
            this.updateMousePos();
            this.props.startParticles();
        });
        svg.on('touchstart', () => {
            this.updateTouchPos();
            this.props.startParticles();
        });
        svg.on('mousemove', () => {
            this.updateMousePos();
        });
        svg.on('touchmove', () => {
            this.updateTouchPos();
        });
        svg.on('mouseup', () => {
            this.props.stopParticles();
        });
        svg.on('touchend', () => {
            this.props.stopParticles();
        });
        svg.on('mouseleave', () => {
            this.props.stopParticles();
        });

    }

    updateMousePos() {
        let [x, y] = d3.mouse(this.refs.svg);
        this.props.updateMousePos(x, y);
    }

    updateTouchPos() {
        let [x, y] = d3.touches(this.refs.svg)[0];
        this.props.updateMousePos(x, y);
    }

    render() {
        let timestamp = new Date().getTime(),
            lastTick = this.props.lastTick,
            fps = 600000/(timestamp-lastTick);

        return (
            <div onMouseDown={e => this.props.startTicker()} style={{overflow: 'hidden'}}>
                 <Header />
                 <svg width={this.props.svgWidth}
                      height={this.props.svgHeight}
                      ref="svg"
                      style={{background: 'rgba(124, 224, 249, .3)'}}>
                     <Particles particles={this.props.particles} />
                 </svg>
                 <Footer N={this.props.particles.length}
                         fps={fps} />
             </div>
        );
    }
}

App.propTypes = {
    svgWidth: PropTypes.number.isRequired,
    svgHeight: PropTypes.number.isRequired,
    startTicker: PropTypes.func.isRequired,
    startParticles: PropTypes.func.isRequired,
    stopParticles: PropTypes.func.isRequired,
    updateMousePos: PropTypes.func.isRequired
};

export default App;
