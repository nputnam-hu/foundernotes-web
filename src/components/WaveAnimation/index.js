/* eslint-disable */
import React, { Component } from 'react'
import Alternate from './d3'
import * as d3 from 'd3'

class WaveAnimation extends Component {
  componentDidMount() {
    // this.createWave()
  }
  createWave = () => {
    const { node } = this

    var svg = d3.select(node),
      width = svg.attr('width'),
      height = svg.attr('height'),
      angles = d3.range(-Math.PI / 2, Math.PI / 2, Math.PI / 200)

    var path = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .attr('fill', 'none')
      .attr('stroke-width', 10)
      .attr('stroke-linejoin', 'round')
      .selectAll('path')
      .data(['cyan'])
      .enter()
      .append('path')
      .attr('stroke', function(d) {
        return d
      })
      .style('mix-blend-mode', 'darken')
      .datum(function(d, i) {
        return d3
          .radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function(a) {
            return a
          })
          .radius(function(a) {
            var t = d3.now() / 1000
            return (
              200 +
              Math.cos(a * 8 - (i * 2 * Math.PI) / 3 + t) *
                Math.pow((1 + Math.cos(a - t)) / 2, 3) *
                32
            )
          })
      })

    d3.timer(function() {
      path.attr('d', function(d) {
        return d(angles)
      })
    })
  }
  render() {
    return <svg ref={node => (this.node = node)} width={960} height={500} />
  }
}

export default WaveAnimation
