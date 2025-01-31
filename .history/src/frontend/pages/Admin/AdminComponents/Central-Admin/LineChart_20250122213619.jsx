import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styles from "./LineChart.module.css"

interface DataPoint {
  month: string
  marketing: number
  online: number
}

interface LineChartProps {
  data: DataPoint[]
}

export function LineChart({ data }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Set dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 }
    const width = svgRef.current.clientWidth - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const svg = d3.select(svgRef.current).append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    // Scales
    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, width])

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.marketing, d.online)) || 0])
      .range([height, 0])

    // Line generators
    const marketingLine = d3
      .line<DataPoint>()
      .x((d) => x(d.month) || 0)
      .y((d) => y(d.marketing))

    const onlineLine = d3
      .line<DataPoint>()
      .x((d) => x(d.month) || 0)
      .y((d) => y(d.online))

    // Add lines
    svg.append("path").datum(data).attr("class", styles.marketingLine).attr("d", marketingLine)

    svg.append("path").datum(data).attr("class", styles.onlineLine).attr("d", onlineLine)

    // Add axes
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x))

    svg.append("g").call(d3.axisLeft(y))

    // Add dots
    svg
      .selectAll(".marketingDot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", styles.marketingDot)
      .attr("cx", (d) => x(d.month) || 0)
      .attr("cy", (d) => y(d.marketing))
      .attr("r", 4)

    svg
      .selectAll(".onlineDot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", styles.onlineDot)
      .attr("cx", (d) => x(d.month) || 0)
      .attr("cy", (d) => y(d.online))
      .attr("r", 4)
  }, [data])

  return <svg ref={svgRef} className={styles.chart}></svg>
}

