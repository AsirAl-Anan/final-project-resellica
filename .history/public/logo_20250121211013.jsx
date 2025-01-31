export default function Logo() {
  return (
    <div className="inline-block w-[100px]">
      <svg
        width="120"
        height="33"
        viewBox="0 0 180 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform hover:scale-105 transition-transform duration-200"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* r */}
        <text
          x="5"
          y="42"
          style={{
            fill: "#e53238",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          r
        </text>
        {/* e */}
        <text
          x="22"
          y="42"
          style={{
            fill: "#0064d2",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          e
        </text>
        {/* s */}
        <text
          x="42"
          y="42"
          style={{
            fill: "#f5af02",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          s
        </text>
        {/* e */}
        <text
          x="60"
          y="42"
          style={{
            fill: "#86b817",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          e
        </text>
        {/* ll */}
        <text
          x="80"
          y="42"
          style={{
            fill: "#e53238",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          ll
        </text>
        {/* i */}
        <text
          x="102"
          y="42"
          style={{
            fill: "#0064d2",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          i
        </text>
        {/* c */}
        <text
          x="115"
          y="42"
          style={{
            fill: "#f5af02",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          c
        </text>
        {/* a */}
        <text
          x="135"
          y="42"
          style={{
            fill: "#86b817",
            fontSize: "36px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          a
        </text>
      </svg>
    </div>
  )
}