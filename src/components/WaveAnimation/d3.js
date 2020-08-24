/* eslint-disable */
import React, { Component } from 'react'
import * as d3 from 'd3'

class WaveAnimation extends Component {
  componentDidMount() {
    this.createWave()
  }
  createWave = () => {
    console.log('HERE')
    const { node } = this

    const w = 960
    const h = 500
    const start = Date.now()
    const rings = []
    const lines = []
    const n = 25
    const m = 70

    // eslint-disable-next-line guard-for-in
    Array.from(Array(n)).forEach((_, i) => {
      const speed = 0.001 * i * 4
      const data = d3.range(m)
      lines.push({
        width: 5,
        height: 15,
        speed,
        index: i,
        data,
      })
    })
    const xscale = d3
      .scaleLinear()
      .domain([0, m])
      .range([0, w])
    const omega = -0.22

    function line_maker(data, speed) {
      const freq = Math.PI * 0.4 + 3 * omega * data.index // * 3000
      const svgline = d3
        .line()
        .x(d => xscale(d))
        .y(d => {
          const theta = ((freq * d) / m) * Math.PI * 4
          const y =
            data.height *
            Math.sin(theta + (n - data.index) * 0.1 * speed * 0.18)
          return y
        })
      // .interpolate('basis')
      return svgline(data.data)
    }
    const spacing = 26
    var sm = 0.39

    function update_spacing() {
      var th = spacing * n
      var hscale = d3
        .scaleLinear()
        .domain([0, n])
        .range([0, h])
      d3.selectAll('g.line path').attr('transform', function(d, i) {
        return 'translate(' + [0, h / 2 + th / 2 - spacing * d.index] + ')'
      })
    }
    function lineEnter(d, i) {
      d3.select(this)
        .selectAll('path.path')
        .data([d])
        .enter()
        .append('svg:path')
        .attr('class', 'path')
        .attr('d', d => line_maker(d, 0))
        .attr('stroke-width', e => e.width)
        .attr('stroke', '#fff')
        .attr('fill', 'none')
      update_spacing()
    }
    var svg = d3
      .select('svg')
      .attr('width', w)
      .attr('height', h)
      .append('svg:g')

    var line = svg
      .selectAll('g.line')
      .data(lines)
      .enter()
      .append('svg:g')
      .attr('class', 'line')
      .each(lineEnter)

    var color = d3
      .scaleLinear()
      .domain([-1, 1])
      .interpolate(d3.interpolateRgb)
      .range(['#fff', '#000'])
    var opacity = d3
      .scaleLinear()
      .domain([0, n])
      .range([1, 0.4])
    d3.timer(function() {
      var elapsed = Date.now() - start
      var damp = 0.3
      var rotate = function(d, i) {
        var speed = sm * d.speed * elapsed * 0.1
        return 'rotate(' + speed + ')'
      }
      line = d3
        .select(node)
        .selectAll('g.line path')
        .attr('d', function(d, i) {
          //var speed = a * d.speed * elapsed + .01 * d.index
          var speed = sm * 0.08 * elapsed + d.index * 4
          return line_maker(d, speed)
        })
        .attr('stroke-opacity', function(d, i) {
          return opacity(d.index)
        })
    })
    console.log('HERE')
  }
  render() {
    return (
      <svg
        ref={node => {
          this.node = node
        }}
        width={960}
        height={500}
      />
    )
  }
}

export default () => <WaveAnimation data={[5, 10, 1, 3]} size={[500, 500]} />
